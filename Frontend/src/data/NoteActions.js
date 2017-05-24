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

export const createNote = (data) => {
  return(dispatch) => { 
    const userId = data.userId
    const url = 'api/users/{userId}/notes'

    const title = data.title
    const content = data.content
    return api
      .post(url, {
        title,
        content,
      })
      .then((response) => {
        console.log("New note has been successfully created")
      })
      .catch((error) => {
        console.error("Error: "+error)
      })
  }
}

export const updateNote = (data) => {
  return(dispatch) => { 
    const userId = data.userId
    const id= data.id
    const url = '/notes/{id}'

    const title = data.title
    const content = data.content
    return api
      .put(url, {
        title,
        content,
        userId,
      })
      .then((response) => {
        console.log("Note has been successfully updated")
      })
      .catch((error) => {
        console.error("Error: "+error)
      })
  }
}

export const deleteNote = (data) => {
  return(dispatch) => { 
    const userId = data.userId
    const id = data.id
    const url = '/notes/{id}'

    return api
      .put(url, {
        userId,
      })
      .then((response) => {
        console.log("Note has been successfully updated")
      })
      .catch((error) => {
        console.error("Error: "+error)
      })
  }
}