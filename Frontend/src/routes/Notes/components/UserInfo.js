import React from "react"
import PropTypes from 'prop-types'

import './UserInfo.scss'

const UserInfo = React.createClass({
  propTypes: {
    userData: PropTypes.object.isRequired,
  },

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
  },
})
export default UserInfo