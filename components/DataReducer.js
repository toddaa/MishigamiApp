import { sortUpdatedDesc, sortStartDesc } from '@/helpers/utils'

export const initialState = {
  events: [],
  articles: [],
  messages: [],
}

export const DataReducer = (initialState, action) => {
  const { type, payload } = action
  // Leaving for future Debug
  // console.log(type)
  // console.log(payload)
  let updated

  switch (type) {
    case 'UPDATE_MESSAGES':
      return {
        ...initialState,
        messages: payload.messages.sort(sortUpdatedDesc),
      }

    case 'UPDATE_NEWS':
      return {
        ...initialState,
        articles: payload.articles.sort(sortUpdatedDesc),
      }

    case 'UPDATE_EVENTS':
      return {
        ...initialState,
        events: payload.events.sort(sortStartDesc),
      }
    case 'ADD_MESSAGE':
      return {
        ...initialState,
        messages: initialState.messages.concat([payload.message]).sort(sortUpdatedDesc),
      }
    case 'ADD_EVENT':
      return {
        ...initialState,
        events: initialState.events.concat([payload.event]).sort(sortStartDesc),
      }
    case 'ADD_NEWS':
      return {
        ...initialState,
        articles: initialState.articles.concat([payload.article]).sort(sortUpdatedDesc),
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
