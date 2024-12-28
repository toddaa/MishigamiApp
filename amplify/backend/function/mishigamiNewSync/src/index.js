/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    API_MISHIGAMIAPP_GRAPHQLAPIIDOUTPUT
    API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT
    API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT
Amplify Params - DO NOT EDIT */
import { default as fetch, Request } from 'node-fetch'
import { startOfYear, endOfYear, differenceInDays, add } from 'date-fns'

const GRAPHQL_ENDPOINT = process.env.API_MISHIGAMIAPP_GRAPHQLAPIENDPOINTOUTPUT
const GRAPHQL_API_KEY = process.env.API_MISHIGAMIAPP_GRAPHQLAPIKEYOUTPUT

const fetchArticles = async () => {
  const query = /* GraphQL */ `
  query LIST_ARTICLES {
    listArticles {
      items {
        id
        author
        title
        description
        createdAt
        updatedAt
        link
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

const addArticle = async (params) => {
  console.log(params)
  const query = /* GraphQL */ `
    mutation CREATE_ARTICLE($id: ID!, $title: String!, $description: String, $author: String, $link: AWSURL, $createdAt: AWSDateTime, $updatedAt: AWSDateTime) {
      createArticle(input: {id: $id, title: $title, description: $description, author: $author, link: $link, createdAt: $createdAt, updatedAt: $updatedAt}) {
        id
        title
        description
        author
        link
        updatedAt
        createdAt
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

  const existingArticles = await fetchArticles()

  // FETCH NEWS FROM MISHIGAMI.ORG
  let itemCount = 0
  let url = `https://mishigami.org/feed/json`
  do {
    console.log(url)
    await fetch(url)
      .then((response) => {
        // console.log(response)
        // console.log(response.headers)
        return response.json()
      })
      .then(async (responseJson) => {
        console.log(responseJson)
        if (responseJson.hasOwnProperty("next_url")) {
          url = responseJson.next_url
        } else {
          url = ''
        }
        // LOOP OVER ALL EVENTS
        for (const item of responseJson.items) {
          // console.log(item)
          const { id, title, url, content_html, content_text, date_published, date_modified, author } = item

          // CHECK IF EVENT EXISTS
          const articlId = id.split('=')[1]
          const hasEvent = existingArticles.data.listArticles.items.some(i => i.id === articlId)

          const pubDate = new Date(date_published)
          const modDate = new Date(date_modified)

          if (hasEvent) {
            // console.log(`Article ${articlId} exists, do nothing`)
          } else {
            // console.log(`Add atricle ${articlId}`)

            await addArticle({
              id: articlId,
              title: title,
              description: content_html ?? '',
              createdAt: pubDate.toISOString(),
              updatedAt: modDate.toISOString(),
              author: author.name ?? '',
              link: url ?? '',
            })
          }
        }
      })
      .catch(error => {
        // this.setState({ error, loading: false, refreshing: false });
      })

  } while (url != '')
}
