import { actionType } from './NoteReducer'
import api from 'api'

export const fetchNotes = (id) => {
  return (dispatch) => {
    return api.get('api/users/' + id + '/notes')
      .then((response) => {
        console.log('Notes has been successfully fetched')
        const notes = response.data
        dispatch({
          type: actionType.NOTES_GET,
          notes,
        })
        return 'fetched'
      })
  }
}

export const createNote = (data) => {
  return (dispatch) => {
    console.log(data)
    const userId = data.userId
    const url = 'api/users/' + userId + '/notes'

    const title = data.title
    const content = data.content
    return api
      .post(url, {
        title,
        content,
      })
      .then((response) => {
        console.log('New note has been successfully created')
        console.log('Response: ' + response)
        for (var v in response) {
          if (response.hasOwnProperty(v)) {
            console.log(v + ' -> ' + response[v])
          }
        }
        return 'created'
      })
      .catch((error) => {
        console.error('Error: ' + error)
      })
  }
}

export const updateNote = (data) => {
  return (dispatch) => {
    console.log(data)
    const userId = data.userId
    const id = data.id
    const url = 'api/notes/' + id

    const title = data.title
    const content = data.content
    return api
      .put(url, {
        title,
        content,
        userId,
      })
      .then((response) => {
        console.log('Note has been successfully updated')
        console.log('Response: ' + response)
        return 'updated'
      })
      .catch((error) => {
        console.error('Error: ' + error)
      })
  }
}

export const deleteNote = (data) => {
  return (dispatch) => {
    console.log(data)
    const userId = data.userId
    const id = data.id
    const url = 'api/notes/' + id + '/' + userId

    return api
      .delete(url)
      .then((response) => {
        console.log('Note has been successfully deleted')
        console.log('Response: ' + response)
        return 'deleted'
      })
      .catch((error) => {
        console.error('Error: ' + error)
      })
  }
}
