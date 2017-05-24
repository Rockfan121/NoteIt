import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import './Modal.scss'
import { FormButton } from 'components/Form'

const DeleteModal = React.createClass({
  propTypes: {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      title: this.props.values.title,
      content: this.props.values.content,
    }
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.values.title,
      content: newProps.values.content,
    })
  },

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel='Modal'
          onRequestClose={this.props.onRequestClose}
          className='deleteContent'
          overlayClassName='overlay'
        >
          <h1>Delete note</h1>
          <p>Are you sure you want to delete this note?</p>
          <h6>{this.state.title}</h6>
          <FormButton
            label='Yes'
            onSubmit={this.props.onSubmit}
            />
        </Modal>
      </div>
    )
  },
})

export default DeleteModal