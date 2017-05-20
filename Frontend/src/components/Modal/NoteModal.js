import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import './Modal.scss'

const NoteModal = React.createClass({
  propTypes: {
    isOpen: PropTypes.bool.isRequired,
    isCreated: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  },


  render() {
    const text = (this.props.isCreated 
        ? <h1>Edit Content</h1>
        : <h1>Add Content</h1>)

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel='Modal'
          onRequestClose={this.props.onRequestClose}
          className='content'
          overlayClassName='overlay'
        >
          {text}
          <p>Etc.</p>
        </Modal>
      </div>
    )
  },
})

export default NoteModal