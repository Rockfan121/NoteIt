import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import PropTypes from 'prop-types'
import axios from 'axios'

import './HomeView.scss'
import { responseGoogle, responseGoogle2 } from 'data/AuthActions'

// eslint-disable-next-line react/prefer-es6-class
class homeView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='homeContent'>
        <h4>Welcome!</h4>
        <GoogleLogin
          clientId='571224980832-uanbm1kfqji3da8dq326v2b08vfv7akq.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={
            (e) => this.props.responseGoogle(e)
          }
          onFailure={
            (e) => this.props.responseGoogle2(e)
          }
        >G+ login</GoogleLogin>
        <Link to='/notes'>
          <h1>Notes</h1>
        </Link>
      </div>
    )
  }
}

homeView.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
  responseGoogle2: PropTypes.func.isRequired,
}

const HomeView = connect(
  (state) => {
    return {}
  },
  (dispatch) => {
    return {
      responseGoogle: (e) => responseGoogle(e)(dispatch),
      responseGoogle2: (e) => responseGoogle2(e)(dispatch),
    }
  }
)(homeView)

export default HomeView
