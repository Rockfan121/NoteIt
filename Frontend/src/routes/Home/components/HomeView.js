import React from 'react'
import { Link } from 'react-router'
import './HomeView.scss'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

// eslint-disable-next-line react/prefer-es6-class
class HomeView extends React.Component {
  responseGoogle = (response) => {
    const token = response.tokenObj.id_token
    axios.defaults.headers.common['Authorization'] =  token
    this.setState({ 'token': token }) // save token value for authorization - doesn't work
    axios.post('http://localhost:8080/api/users/token', { 'rfdgfd':'ala' })
      .then(function (response) {
        this.setState({ 'userId': response.data }) // save user id - doesn't work too
      })
      .catch(function (error) {
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
