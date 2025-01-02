/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    API_MISHIGAMIAPP_GRAPHQLAPIIDOUTPUT
    API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT
    API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch'
import { Expo } from 'expo-server-sdk'
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

const region = 'us-east-1'
const {
  EXPO_ACCESS_TOKEN,
  API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT: GRAPHQL_ENDPOINT,
  API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT: GRAPHQL_API_KEY,
  QUEUE_MISHIGAMIAPP_PUSHNOTIFICATIONREVIEPTSOUTPUT: queue
} = process.env

const sqsClient = new SQSClient({ region })

const expo = new Expo({
  accessToken: EXPO_ACCESS_TOKEN,
  useFcmV1: true,
})

const sendMessageToSQS = async (queueUrl, messageBody, data) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
    MessageAttributes: data,
    MessageGroupId: 'push_reciepts',
    MessageDeduplicationId: 'unique-message-id-123',
  }
  console.log(params)

  try {
    const command = new SendMessageCommand(params)
    const data = await sqsClient.send(command)
    console.log('Message sent successfully:', data)
    return data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

const fetchTokens = async () => {
  const query = /* GraphQL */ `
  query LIST_TOKENS {
    listPushTokens {
      items {
        token
      }
    }
  }
`

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }

  const request = new Request(GRAPHQL_ENDPOINT, options)

  let statusCode = 200
  let body
  let response

  try {
    response = await fetch(request)
    body = await response.json()
    // console.log(body)
    if (body.errors) statusCode = 400
  } catch (error) {
    statusCode = 400
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    }
  }
  return body
}

const removeToken = async (params) => {
  console.log(params)
  const query = /* GraphQL */ `
    mutation DELETE_TOKEN($token: String!) {
      deletePushTokens(input: {token: $token}) {
        id
      }
    }
  `

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables: params })
  }

  const request = new Request(GRAPHQL_ENDPOINT, options)

  let statusCode = 200
  let body
  let response

  try {
    response = await fetch(request)
    body = await response.json()
    if (body.errors) statusCode = 400
  } catch (error) {
    statusCode = 400
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    }
  }
  return body
}

const sendNotification = async (params) => {
  console.log(params)
  let messages = []
  for (let pushToken of params.pushTokens) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: 'default',
      body: params.title,
    })
  }

  let chunks = expo.chunkPushNotifications(messages)
  let tickets = []

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
      console.log(ticketChunk)
      tickets.push(...ticketChunk)
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error)
    }
  }

  let receiptIds = []
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.status === 'ok') {
      receiptIds.push(ticket.id)
    } else if (ticket.status === 'error') {
      const removalStatus = await removeToken({
        token: ticket.details.expoPushToken
      })
      console.log(removalStatus)
    }
  }
  return receiptIds
}

export const handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  console.log(`CONTEXT: ${JSON.stringify(context)}`)

  const { invokedFunctionArn } = context
  const accountId = invokedFunctionArn.split(":")[4]

  const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queue}`  // Replace with your SQS URL

  const pushTokenData = await fetchTokens()
  // console.log(pushTokenData)
  // const pushTokens = pushTokenData.data.listPushTokens.items.map((item) => item.token)
  // console.log(pushTokens)

  for (const record of event.Records) {
    // console.log(record.eventID);
    // console.log(record.eventName);
    // console.log('DynamoDB Record: %j', record.dynamodb);

    switch (record.eventName) {
      case 'INSERT':
        try {
          const item = unmarshall(record.dynamodb.NewImage)
          const { id, title } = item

          // console.log(title)

          const receiptIds = await sendNotification({
            pushTokens: pushTokenData.data.listPushTokens.items.map((item) => item.token),
            title,
          })
          // console.log({ receiptIds })
          // await sendMessageToSQS(queueUrl, 'test', { receiptIds: { DataType: 'String', StringValue: JSON.stringify(receiptIds) } })
          //   .then(result => console.log('Message sent result:', result))
          //   .catch(err => console.error('Error:', err))
        } catch (error) {
          console.error('Error', error)
        }
        break
    }
  }
}
