import { actionType } from './AuthReducer'
import axios from 'axios'
import api from 'api'

export const responseGoogle = (response) => {
  return (dispatch) => {
    const token = response.tokenObj.id_token
    axios.defaults.headers.common['Authorization'] = token
    dispatch({
      type: actionType.SAVE_TOKEN,
      token,
    })
    localStorage.setItem('token', JSON.stringify(token))
    //console.log("State(token): " + JSON.parse(localStorage.getItem('token')))

    api.get('/api/users/token')
          .then(function (response) {
            const userId = response.data
            dispatch({
              type: actionType.SAVE_USERID,
              userId,
            })

            localStorage.setItem('userId', JSON.stringify(userId))
            //console.log("State(userId): " + JSON.parse(localStorage.getItem('userId')))
          })
          .catch(function (error) {
            console.log("an error occurred")
            console.log(error)
          })
  }
}

export const responseGoogle2 = (response) => {
}

export const getAuthData = () => {
  return (dispatch) => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const token = JSON.parse(storedToken)
      //console.log("localStorage.token: " + token)
      dispatch({
        type: actionType.SAVE_TOKEN,
        token,
      })
      axios.defaults.headers.common['Authorization'] = token
      const storedUserId = localStorage.getItem('userId')
      if(storedUserId) {
        const userId = JSON.parse(storedUserId)
        //console.log("localStorage.userId: " + userId)
        dispatch({
          type: actionType.SAVE_USERID,
          userId,
        })
      }
    }
  }
}

export const getToken = () => {
  return(dispatch) => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      const token = JSON.parse(storedToken)
      console.log("localStorage.token: " + token)
      axios.defaults.headers.common['Authorization'] = token
      dispatch({
        type: actionType.SAVE_TOKEN,
        token,
      })
      //return 'token fetched'
    }
  }
}


export const getUserId = () => {
  return(dispatch) => {
    const storedUserId = localStorage.getItem('userId')
    if(storedUserId) {
      const userId = JSON.parse(storedUserId)
      console.log("localStorage.userId: " + userId)
      dispatch({
        type: actionType.SAVE_USERID,
        userId,
      })
      //return 'userId fetched'
    }
  }
}