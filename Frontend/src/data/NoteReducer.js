import Immutable from 'immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const actionType = {
  NOTES_GET: 'NOTES_GET',
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [actionType.NOTES_GET]: (state, action) => {
    return state
      .set('notes', action.notes)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  notes: [],
})
export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
