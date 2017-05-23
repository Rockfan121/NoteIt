import { actionType } from './NoteReducer'
import api from 'api'

export const fetchNotes = (id) => {
  return (dispatch) => {
    return api.get('api/users/' + id + '/notes')
      .then((response) => {
        const notes = response.data
        dispatch({
          type: actionType.NOTES_GET,
          notes,
        })
      })
  }
}
