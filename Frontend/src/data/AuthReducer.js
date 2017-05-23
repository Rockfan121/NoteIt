import Immutable from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const actionType = {
  SAVE_TOKEN: 'SAVE_TOKEN',
  SAVE_USERID: 'SAVE_USERID',
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [actionType.SAVE_TOKEN]: (state, action) => {
    return state
      .set('token', action.token)
  },
  [actionType.SAVE_USERID]: (state, action) => {
    return state
      .set('userId', action.userId)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  token: null,
  userId: null,
})
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
