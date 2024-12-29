import { Expo } from 'expo-server-sdk'
import { unmarshall } from "@aws-sdk/util-dynamodb"


const { EXPO_ACCESS_TOKEN } = process.env

let expo = new Expo({
  accessToken: EXPO_ACCESS_TOKEN,
  useFcmV1: true,
})

const sendNotification = async (params) => {
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
}

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  for (const record of event.Records) {
    // console.log(record.eventID);
    // console.log(record.eventName);
    // console.log('DynamoDB Record: %j', record.dynamodb);

    switch (record.eventName) {
      case 'INSERT':
        try {
          const item = unmarshall(record.dynamodb.NewImage)
          const { id, title } = item

          console.log(title)

          await sendNotification({
            title,
            pushTokens: ['ExponentPushToken[S-l4l4JSMMrEOxHwIJKqf8]']
          })

        } catch (error) {
          console.error('Error', error)
        }
        break
    }
  }
}
