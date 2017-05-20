import React from 'react'
import { Link } from 'react-router'
import './HomeView.scss'
import GoogleLogin from 'react-google-login'


// eslint-disable-next-line react/prefer-es6-class
class HomeView extends React.Component {
  responseGoogle = (response) => {

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
            (e) => this.responseGoogle(e)
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
