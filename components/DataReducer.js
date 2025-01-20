import { sortUpdatedDesc, sortStartDesc } from '@/helpers/utils'

export const initialState = {
  events: [],
  articles: [],
  messages: [],
  subscriptions: {},
  pushToken: null,
}

export const DataReducer = (initialState, action) => {
  const { type, payload } = action
  // Leaving for future Debug
  // console.log(type)
  // console.log(payload)
  let updated

  switch (type) {
    case 'INIT_MESSAGES':
      return {
        ...initialState,
        messages: payload.messages.sort(sortUpdatedDesc),
      }
    case 'INIT_NEWS':
      return {
        ...initialState,
        articles: payload.articles.sort(sortUpdatedDesc),
      }
    case 'INIT_EVENTS':
      return {
        ...initialState,
        events: payload.events.sort(sortStartDesc),
      }
    case 'INIT_SUBS':
      // console.log(payload)
      return {
        ...initialState,
        pushToken: payload.token,
        subscriptions: payload.subscriptions,
      }
    case 'ADD_MESSAGE':
      return {
        ...initialState,
        messages: initialState.messages.concat([payload.message]).sort(sortUpdatedDesc),
      }
    case 'UPDATE_MESSAGE':
      updated = initialState.messages.map(n => {
        if (n.id === payload.message.id) {
          return payload.message
        }
        return n
      }).sort(sortUpdatedDesc)
      return {
        ...initialState,
        messages: updated,
      }
    case 'DELETE_MESSAGE':
      updated = initialState.messages.filter(n => {
        if (n.id !== payload.message.id) {
          return true
        }
        return false
      }).sort(sortUpdatedDesc)
      return {
        ...initialState,
        messages: updated,
      }
    case 'ADD_EVENT':
      return {
        ...initialState,
        events: initialState.events.concat([payload.event]).sort(sortStartDesc),
      }
    case 'UPDATE_EVENT':
      updated = initialState.events.map(n => {
        if (n.id === payload.event.id) {
          return payload.event
        }
        return n
      }).sort(sortStartDesc)
      return {
        ...initialState,
        events: updated,
      }
    case 'DELETE_EVENT':
      updated = initialState.events.filter(n => {
        if (n.id !== payload.event.id) {
          return true
        }
        return false
      }).sort(sortStartDesc)
      return {
        ...initialState,
        events: updated,
      }
    case 'ADD_ARTICLE':
      return {
        ...initialState,
        articles: initialState.articles.concat([payload.article]).sort(sortUpdatedDesc),
      }
    case 'UPDATE_ARTICLE':
      updated = initialState.articles.map(n => {
        if (n.id === payload.article.id) {
          return payload.article
        }
        return n
      }).sort(sortUpdatedDesc)
      return {
        ...initialState,
        articles: updated,
      }
    case 'DELETE_ARTICLE':
      updated = initialState.articles.filter(n => {
        if (n.id !== payload.article.id) {
          return true
        }
        return false
      }).sort(sortUpdatedDesc)
      return {
        ...initialState,
        articles: updated,
      }
    case 'UPDATE_SUBS':
      // console.log(payload)
      return {
        ...initialState,
        subscriptions: payload.subscriptions,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
