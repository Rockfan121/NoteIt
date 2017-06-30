import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import './Modal.scss'
import { Form, FormInput, FormTextarea } from '../Form'

class NoteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.setState({
      title: this.props.values.title,
      content: this.props.values.content,
      userId: this.props.values.userId,
      id: this.props.values.id,
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.values.title,
      content: newProps.values.content,
      userId: newProps.values.userId,
      id: newProps.values.id,
    })
  }

  onFormUpdate = (value, type) => {
    this.setState({ [type]: value })
  }


  render() {

    const onSubmit =()=> {
      this.props.onSubmit(this.state)
    }

    const text = (this.props.isCreated 
        ? 'Edit note'
        : 'Add note')

    const buttonLabel=(this.props.isCreated
      ? 'Update'
      : 'Create')

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          contentLabel='Modal'
          onRequestClose={this.props.onRequestClose}
          className='normalContent'
          overlayClassName='overlay'
        >
          <Form 
            title={text}
            buttonLabel={buttonLabel}
            onSubmit={onSubmit}
            >
            <FormInput label='Title'
              type='title'
              value={this.state.title}
              onChange={this.onFormUpdate}
              />
            <FormTextarea label='Content'
              type='content'
              value={this.state.content}
              onChange={this.onFormUpdate}
              />
          </Form>
        </Modal>
      </div>
    )
  }
}

NoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
}

export default NoteModal