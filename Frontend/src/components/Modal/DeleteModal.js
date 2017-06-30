import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import './Modal.scss'
import { FormButton } from '../Form'

class DeleteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.values.title,
      content: this.props.values.content,
      userId: this.props.values.userId,
      id: this.props.values.id,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.values.title,
      content: newProps.values.content,
      userId: newProps.values.userId,
      id: newProps.values.id,
    })
  }


  render() {
    const onSubmit =()=> {
      this.props.onSubmit(this.state)
    }

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
            onSubmit={onSubmit}
            />
        </Modal>
      </div>
    )
  }
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
}

export default DeleteModal