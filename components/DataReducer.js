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
        messages: payload.messages,
      }

    case 'UPDATE_NEWS':
      return {
        ...initialState,
        articles: payload.articles,
      }

    case 'UPDATE_EVENTS':
      return {
        ...initialState,
        events: payload.events,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
