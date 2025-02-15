/* Amplify Params - DO NOT EDIT
  API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT
  API_MISHIGAMIAPP_GRAPHQLAPIIDOUTPUT
  API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
import { default as fetch, Request } from 'node-fetch'
import { startOfYear, endOfYear, differenceInDays, add } from 'date-fns'

const {
  CAL_ID_LODGE,
  CAL_ID_WEST,
  CAL_ID_NORTH,
  CAL_ID_CENTRAL,
  CAL_ID_EAST,
  CAL_ID_SOUTH,
  GOOGLE_API_KEY,
  API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT: GRAPHQL_ENDPOINT,
  API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT: GRAPHQL_API_KEY
} = process.env

const fetchEvents = async () => {
  const query = /* GraphQL */ `
  query LIST_EVENTS {
    listEvents {
      items {
        id
        gId
        name
        updatedAt
        startDate
        signUpURL
        location
        endDate
        description
        createdAt
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

const addEvent = async (params) => {
  console.log(params)
  const query = /* GraphQL */ `
    mutation CREATE_EVENT($name: String!, $gId: String, $description: String, $location: String, $startDate: AWSDateTime, $endDate: AWSDateTime, $category: String) {
      createEvent(input: {name: $name, gId: $gId, description: $description, location: $location, startDate: $startDate, endDate: $endDate, category: $category}) {
        id
        gId
        name
        updatedAt
        startDate
        signUpURL
        location
        endDate
        description
        createdAt
        category
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
}

const updateEvent = async (params) => {
  console.log(params)
  const query = /* GraphQL */ `
    mutation UPDATE_EVENT($id: ID!, $name: String!, $description: String, $location: String, $startDate: AWSDateTime, $endDate: AWSDateTime, $category: String) {
      updateEvent(input: {id: $id, name: $name, description: $description, location: $location, startDate: $startDate, endDate: $endDate, category: $category}) {
        id
        gId
        name
        updatedAt
        startDate
        signUpURL
        location
        endDate
        description
        createdAt
        category
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
}

export const handler = async (event) => {
  console.log({ event })

  const beginDate = new Date()
  const endDate = add(new Date(endOfYear(beginDate)), { days: 60 })

  const existingEvents = await fetchEvents()
  // console.log(existingEvents.data.listEvents.items)

  // FETCH EVENTS FROM GOOGLE

  for (const cal of [CAL_ID_LODGE, CAL_ID_WEST, CAL_ID_NORTH, CAL_ID_CENTRAL, CAL_ID_EAST, CAL_ID_SOUTH]) {
    let pageToken = ''
    do {
      let url = `https://www.googleapis.com/calendar/v3/calendars/${cal}/events?key=${GOOGLE_API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${pageToken}&timeMax=${endDate.toISOString()}`
      console.log(url)
      await fetch(url)
        .then((response) => {
          // console.log(response)
          // console.log(response.headers)
          return response.json()
        })
        .then(async (responseJson) => {
          console.log(responseJson)
          const { summary: calSummary, items } = responseJson
          if (responseJson.hasOwnProperty("nextPageToken")) {
            pageToken = responseJson.nextPageToken
          } else {
            pageToken = ''
          }
          console.log(pageToken)
          console.log(calSummary)

          // LOOP OVER ALL EVENTS
          for (const item of items) {
            // console.log(item)
            const { id, summary, start, end, creator, location, description } = item

            // console.log(`Checking for Event id ${id}`)

            // CHECK IF EVENT EXISTS
            const hasEvent = existingEvents.data.listEvents.items.some(i => i.gId === id)
            // console.log(hasEvent)
            if (hasEvent) {
              const existingEvent = existingEvents.data.listEvents.items.filter(i => i.gId === id).shift()
              // console.log(existingEvent)
              // console.log(`Event ${id} exists, do nothing`)
              await updateEvent({
                id: existingEvent.id,
                name: summary,
                description: description ?? '',
                startDate: start.hasOwnProperty('date') ? new Date(start.date).toISOString() : start.dateTime,
                endDate: end.hasOwnProperty('date') ? new Date(end.date).toISOString() : end.dateTime,
                location: location ?? '',
                category: calSummary
              })
            } else {
              await addEvent({
                name: summary,
                gId: id,
                description: description ?? '',
                startDate: start.hasOwnProperty('date') ? new Date(start.date).toISOString() : start.dateTime,
                endDate: end.hasOwnProperty('date') ? new Date(end.date).toISOString() : end.dateTime,
                location: location ?? '',
                category: calSummary
              })
            }
          }
        })
        .catch(error => {
          // this.setState({ error, loading: false, refreshing: false });
        })
    } while (pageToken != '')
  }
}
