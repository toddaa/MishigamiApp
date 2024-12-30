import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk'
import { initialState, DataReducer } from './DataReducer'
import { startOfYear, endOfYear, differenceInDays, add, getUnixTime } from 'date-fns'
import { generateClient } from 'aws-amplify/api'
import * as queries from '../src/graphql/queries'
import * as subscriptions from '../src/graphql/subscriptions'
import * as mutations from '../src/graphql/mutations'

const DataContext = createContext()
const client = generateClient()

export const DataProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(DataReducer, initialState)

  useEffect(() => {
    getMessages()
    getNews()
    getEvents()

    connectSubs()
  }, [])

  async function connectSubs () {
    client.graphql({
      query: subscriptions.onCreateMessage, variables: {
        filter: { title: { ne: '' } }
      }
    })
      .subscribe({
        next: ({ data }) => {
          if (data !== undefined && data !== null) {
            dispatch({
              type: 'ADD_MESSAGE',
              payload: {
                message: data.onCreateMessage,
              },
            })
          }
        },
        error: (error) => console.warn({ error })
      })
  }

  const getMessages = async () => {
    const now = new Date()
    const startOfYearDate = startOfYear(now)

    const messages = await client.graphql({ query: queries.listMessages, variables: { filter: { updatedAt: { ge: startOfYearDate } } } })
    // console.log(messages.data.listMessages.items)

    dispatch({
      type: 'UPDATE_MESSAGES',
      payload: {
        messages: messages.data.listMessages.items,
      },
    })
  }

  const sendMessage = async (params) => {
    const now = new Date()
    const ttl = add(now, { days: 30 })
    const input = {
      title: params.subject,
      body: params.message,
      ttl: getUnixTime(ttl)
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

    const articles = await client.graphql({ query: queries.listArticles, variables: { filter: { updatedAt: { ge: startOfYearDate } } } })
    // console.log(messages.data.listMessages.items)

    dispatch({
      type: 'UPDATE_NEWS',
      payload: {
        articles: articles.data.listArticles.items,
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

    const events = await client.graphql({ query: queries.listEvents, variables: { filter: { startDate: { ge: startOfYearDate }, endDate: { lt: endOfYearDate } } } })
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
