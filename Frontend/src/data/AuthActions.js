import { actionType } from './AuthReducer'
import axios from 'axios'
import api from 'api'

export const responseGoogle = (response) => {
  return (dispatch) => {
    const token = response.tokenObj.id_token
    axios.defaults.headers.common['Authorization'] =  token
    dispatch({
      type: actionType.SAVE_TOKEN,
      token,
    })
    console.log("State(token): " + token)
    api.get('/api/users/token')
          .then(function (response) {
            const userId = response.data
            dispatch({
              type: actionType.SAVE_USERID,
              userId,
            })
            console.log("State(userId): " + userId)
          })
          .catch(function (error) {
            console.log("an error occurred")
            console.log(error)
          })
  }
}

export const responseGoogle2 = (response) => {
}
