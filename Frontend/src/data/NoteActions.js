import { actionType } from './NoteReducer'
import api from 'api'


export const fetchNotes = () => {
  return (dispatch) => {
    return api.get('api/notes')
      .then((response) => {
        const notes = response.data
        dispatch({
          type: actionType.NOTES_GET,
          notes,
        })
      })
  }
}
