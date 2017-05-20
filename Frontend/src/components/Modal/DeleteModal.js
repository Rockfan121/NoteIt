import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import './Modal.scss'

const DeleteModal = React.createClass({
  propTypes: {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  },

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel='Modal'
          onRequestClose={this.props.onRequestClose}
          className='content'
          overlayClassName='overlay'
        >
          <h1>Delete Content</h1>
          <p>Etc.</p>
        </Modal>
      </div>
    )
  },
})

export default DeleteModal