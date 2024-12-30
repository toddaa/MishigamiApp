import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk'
import { initialState, DataReducer } from './DataReducer'
import { startOfYear, endOfYear, differenceInDays, add } from 'date-fns'
import { generateClient, CONNECTION_STATE_CHANGE, ConnectionState } from 'aws-amplify/api'
import { listMessages, listArticles, listEvents } from '../src/graphql/queries'
import * as subscriptions from '../src/graphql/subscriptions'
import * as mutations from '../src/graphql/mutations'
import { sortUpdatedDesc } from '@/helpers/utils'
import { Hub } from 'aws-amplify/utils'

// Hub.listen('api', (data) => {
//   const { payload } = data
//   if (payload.event === CONNECTION_STATE_CHANGE) {
//     const connectionState = payload.data.connectionState
//     console.log({ connectionState })
//   }
// })

const DataContext = createContext()
const client = generateClient()

export const DataProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(DataReducer, initialState)

  useEffect(() => {
    getMessages()
    getNews()
    getEvents()

    // connectSubs()
  }, [])


  async function connectSubs () {
    client.graphql({
      query: subscriptions.onCreateMessage, variables: {
        filter: { title: { ne: '' } }
      }
    })
      .subscribe({
        next: ({ data }) => console.log(data),
        error: (error) => console.warn({ error })
      })
  }

  const getMessages = async () => {
    const now = new Date()
    const startOfYearDate = startOfYear(now)

    const messages = await client.graphql({ query: listMessages, variables: { filter: { updatedAt: { ge: startOfYearDate } } } })
    // console.log(messages.data.listMessages.items.sort(sortUpdatedDesc))

    dispatch({
      type: 'UPDATE_MESSAGES',
      payload: {
        messages: messages.data.listMessages.items.sort(sortUpdatedDesc),
      },
    })
  }

  const sendMessage = async (params) => {
    const input = {
      title: params.subject,
      body: params.message
    }
    // console.log(input)

    const newMessage = await client.graphql({
      query: mutations.createMessage,
      variables: { input: input }
    })
    // console.log(newMessage)
  }

  const getNews = async () => {
    const now = new Date()
    const startOfYearDate = startOfYear(now)

    const articles = await client.graphql({ query: listArticles, variables: { filter: { updatedAt: { ge: startOfYearDate } } } })
    // console.log(messages.data.listMessages.items.sort(sortUpdatedDesc))

    dispatch({
      type: 'UPDATE_NEWS',
      payload: {
        articles: articles.data.listArticles.items.sort(sortUpdatedDesc),
      },
    })
  }

  const getEvents = async () => {
    const now = new Date()
    const startOfYearDate = startOfYear(now)
    let endOfYearDate = endOfYear(now)

    if (differenceInDays(new Date(startOfYearDate), new Date(endOfYearDate)) < 60) {
      endOfYearDate = add(new Date(endOfYearDate), { days: 60 })
    }

    const events = await client.graphql({ query: listEvents, variables: { filter: { startDate: { ge: startOfYearDate }, endDate: { lt: endOfYearDate } } } })
    // console.log(events.data.listEvents.items)

    dispatch({
      type: 'UPDATE_EVENTS',
      payload: {
        events: events.data.listEvents.items,
      },
    })
  }

  const sharedState = {
    dataState,
    sendMessage
  }

  return (
    <DataContext.Provider value={sharedState}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
