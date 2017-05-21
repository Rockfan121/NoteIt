import React from 'react'
import { Link } from 'react-router'
import './HomeView.scss'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

// eslint-disable-next-line react/prefer-es6-class
class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      token: null,
      userId: null,
    }
  }
  responseGoogle = (response) => {
    const token = response.tokenObj.id_token

    axios.defaults.headers.common['Authorization'] =  token
    this.setState({ 'token': token }) // save token value for authorization - doesn't work
    console.log("State(token): " + this.state.token)
    axios.post('/api/users/token', { 'rfdgfd':'ala' })
      .then(function (response) {
        console.log("i'm going to save")
        console.log("another response: " + response)
        for (var key in response) {
          if (response.hasOwnProperty(key)) {
            console.log(key + " -> " + response[key])
          }
        }
        this.setState({ 'userId': response.data }) // save user id - doesn't work too
        console.log("State(userId): " + this.state.userId)
      })
      .catch(function (error) {
        console.log("an error occurred")
      })
  }

  responseGoogle2 = (response) => {
  }

  render () {
    return (
      <div className='homeContent'>
        <h4>Welcome!</h4>
        <GoogleLogin
          clientId='571224980832-uanbm1kfqji3da8dq326v2b08vfv7akq.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={
            (e) => this.responseGoogle(e)
          }
          onFailure={
            (e) => this.responseGoogle2(e)
          }
        >G+ login</GoogleLogin>
        <Link to='/notes'>
          <h1>Notes</h1>
        </Link>
      </div>
    )
  }
}

export default HomeView
