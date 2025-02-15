import React, { useState, createContext, useContext, useEffect, useReducer } from 'react'
import { initialState, DataReducer } from './DataReducer'
import { startOfYear, endOfYear, add, getUnixTime, sub } from 'date-fns'
import { generateClient } from 'aws-amplify/api'
import * as queries from '../src/graphql/queries'
import * as subscriptions from '../src/graphql/subscriptions'
import * as mutations from '../src/graphql/mutations'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import Constants from 'expo-constants'


const DataContext = createContext()
const client = generateClient()

export const DataProvider = ({ children }) => {
  const [dataState, dispatch] = useReducer(DataReducer, initialState)
  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        setExpoPushToken(token ?? '')
        await getCurrentToken(token)
      })
      .catch((error) => console.log(`${error}`))

    getMessages()
    getNews()
    getEvents()

    connectMessageSubs()
    connectEventSubs()
    connectArticleSubs()
  }, [])

  // useEffect(() => {
  //   console.log('TOKEN: ' + dataState.pushToken)
  //   // async function saveToken () {
  //   //   await getCurrentToken(expoPushToken)
  //   // }
  //   // saveToken()

  //   if (expoPushToken !== null && dataState.pushToken === null) {
  //     savePushToken(expoPushToken)
  //   }
  // }, [dataState.pushToken])

  // useEffect(() => {
  //   console.log({ expoPushToken })
  //   async function saveToken () {
  //     await getCurrentToken(expoPushToken)
  //   }
  //   saveToken()
  // }, [expoPushToken])

  function handleRegistrationError (errorMessage) {
    alert(errorMessage)
    throw new Error(errorMessage)
  }

  async function registerForPushNotificationsAsync () {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!')
        return
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId
      if (!projectId) {
        handleRegistrationError('Project ID not found')
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data
        // console.log({ pushTokenString });
        return pushTokenString
      } catch (e) {
        handleRegistrationError(`${e}`)
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications')
    }
  }

  async function connectMessageSubs () {
    client.graphql({
      query: subscriptions.onCreateMessage, variables: {
        filter: { title: { ne: '' } }
      }
    }).subscribe({
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

  async function connectEventSubs () {
    client.graphql({
      query: subscriptions.onCreateEvent, variables: {
        filter: { name: { ne: '' } }
      }
    }).subscribe({
      next: ({ data }) => {
        if (data !== undefined && data !== null) {
          dispatch({
            type: 'ADD_EVENT',
            payload: {
              event: data.onCreateEvent,
            },
          })
        }
      },
      error: (error) => console.warn({ error })
    })

    client.graphql({
      query: subscriptions.onUpdateEvent, variables: {}
    }).subscribe({
      next: ({ data }) => {
        console.log(data)
        if (data !== undefined && data !== null) {
          dispatch({
            type: 'UPDATE_EVENT',
            payload: {
              event: data.onUpdateEvent,
            },
          })
        }
      },
      error: (error) => console.warn({ error })
    })

    client.graphql({
      query: subscriptions.onDeleteEvent, variables: {}
    }).subscribe({
      next: ({ data }) => {
        if (data !== undefined && data !== null) {
          dispatch({
            type: 'DELETE_EVENT',
            payload: {
              event: data.onDeleteEvent,
            },
          })
        }
      },
      error: (error) => console.warn({ error })
    })
  }

  async function connectArticleSubs () {
    client.graphql({
      query: subscriptions.onCreateArticle, variables: {
        filter: { title: { ne: '' } }
      }
    }).subscribe({
      next: ({ data }) => {
        if (data !== undefined && data !== null) {
          // console.log(data)
          dispatch({
            type: 'ADD_NEWS',
            payload: {
              article: data.onCreateArticle,
            },
          })
        }
      },
      error: (error) => console.warn({ error })
    })

    client.graphql({
      query: subscriptions.onUpdateArticle, variables: {
        filter: { title: { ne: '' } }
      }
    }).subscribe({
      next: ({ data }) => {
        if (data !== undefined && data !== null) {
          dispatch({
            type: 'UPDATE_ARTICLE',
            payload: {
              article: data.onUpdateArticle,
            },
          })
        }
      },
      error: (error) => console.warn({ error })
    })

    client.graphql({
      query: subscriptions.onDeleteArticle, variables: {
        filter: { title: { ne: '' } }
      }
    }).subscribe({
      next: ({ data }) => {
        if (data !== undefined && data !== null) {
          dispatch({
            type: 'DELETE_ARTICLE',
            payload: {
              article: data.onDeleteArticle,
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
      type: 'INIT_MESSAGES',
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
      ttl: getUnixTime(ttl),
      target: params.target
    }
    // console.log(input)

    const newMessage = await client.graphql({
      query: mutations.createMessage,
      variables: { input: input }
    })
    console.log(newMessage)
  }

  const getNews = async () => {
    const now = new Date()
    const startDate = sub(now, { days: 90 })

    const articles = await client.graphql({ query: queries.listArticles, variables: { filter: { updatedAt: { ge: startDate } } } })
    // console.log(articles.data.listArticles.items)

    dispatch({
      type: 'INIT_NEWS',
      payload: {
        articles: articles.data.listArticles.items,
      },
    })
  }

  const getEvents = async () => {
    const now = new Date()
    const startDate = now // sub(now, { days: 1 })
    let endOfYearDate = endOfYear(now)

    const events = await client.graphql({ query: queries.listEvents, variables: { filter: { startDate: { ge: startDate }, endDate: { lt: endOfYearDate } } } })
    // console.log(events.data.listEvents.items)

    dispatch({
      type: 'INIT_EVENTS',
      payload: {
        events: events.data.listEvents.items,
      },
    })
  }

  const getCurrentToken = async (token) => {
    // console.log({ token })
    const existingToken = await client.graphql({
      query: queries.getPushTokens,
      variables: { token: token }
    })

    // console.log(existingToken.data.getPushTokens)
    if (existingToken.data.getPushTokens !== null) {
      // const payload =
      // if (existingToken.data.getPushTokens !== null) {
      //   payload.subscriptions = existingToken.data.getPushTokens?.subscriptions
      // }
      // console.log({ payload })
      dispatch({
        type: 'INIT_SUBS',
        payload: {
          token: existingToken.data.getPushTokens?.token,
          subscriptions: JSON.parse(existingToken.data.getPushTokens?.subscriptions) ?? {},
        }
      })
    } else {
      await savePushToken(token)
    }
  }

  const savePushToken = async (token) => {
    // console.log('SAVING TOKEN')
    // console.log({ token })

    // const existingToken = await client.graphql({ query: queries.getPushTokens, variables: { token: token } })
    // console.log(existingToken.data.getPushTokens)

    // if (existingToken.data.getPushTokens === null) {
    const now = new Date()
    const exp = add(new Date(now), { years: 1 })
    const input = {
      token: token,
      ttl: getUnixTime(exp)
    }
    // console.log({ input })

    const response = await client.graphql({
      query: mutations.createPushTokens,
      variables: { input: input }
    })
    // console.log(response.data.createPushTokens)

    dispatch({
      type: 'INIT_SUBS',
      payload: {
        token: response.data.createPushTokens?.token,
        subscriptions: response.data.createPushTokens?.subscriptions ?? {},
      }
    })
  }

  const saveSubscription = async (name, value) => {
    // console.log(name)
    // console.log(value)
    const subs = {
      ...dataState.subscriptions,
    }
    subs[name] = value

    const input = {
      token: expoPushToken,
      subscriptions: JSON.stringify(subs)
    }
    // console.log(input)

    const response = await client.graphql({
      query: mutations.updatePushTokens,
      variables: { input: input }
    })
    // console.log(response)

    dispatch({
      type: 'UPDATE_SUBS',
      payload: {
        subscriptions: JSON.parse(response.data.updatePushTokens?.subscriptions) ?? {},
      }
    })
  }

  const sharedState = {
    dataState,
    expoPushToken,
    sendMessage,
    saveSubscription,
  }

  return (
    <DataContext.Provider value={sharedState}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
