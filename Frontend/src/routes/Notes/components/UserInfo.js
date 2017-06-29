import React from "react"
import PropTypes from 'prop-types'

import './UserInfo.scss'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const userData = this.props.userData

    return (
      <div className='userPane'>
        <span className='userHeader'>
          {userData.name}<br />
          {userData.surname}<br />
        </span>
        <hr />
        <span className='userPosts'>
          Number of all notes:
          <br />{userData.nrOfNotes}
        </span>
      </div>
    )
  }
}

UserInfo.propTypes= {
  userData: PropTypes.object.isRequired,
}
  
export default UserInfo