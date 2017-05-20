import React from "react"
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Icon from 'components/Icon'
import DeleteModal from 'components/Modal/DeleteModal'
import NoteModal from 'components/Modal/NoteModal'
import { icons } from 'assets/icons'
import './NotesList.scss'

const NotesList = React.createClass({
  propTypes: {
    notes: PropTypes.any.isRequired,
  },

  getInitialState() {
    return {
      isEditOpen: false,
      isDeleteOpen: false,
      isAddOpen: false,
    }
  },

  handleAddClick(e) {
    this.setState({ isAddOpen: true })
  },
  handleEditClick(e) {
    this.setState({ isEditOpen: true })
  },
  handleDeleteClick(e) {
    this.setState({ isDeleteOpen: true })
  },
  handleClickOutside(e) {
    this.setState({ 
      isEditOpen: false,
      isDeleteOpen: false,
      isAddOpen: false,
    })
  },

  render() {
    const iconsColor = '#424242'
    const iconsData = [
      {
        icon: [
          icons.delete1,
          icons.delete2,
        ],
        handler: this.handleDeleteClick,
      },
      {
        icon: [icons.edit],
        handler: this.handleEditClick,
      },
    ]
    const iconsTags = iconsData.map((t, i) => {
      return (
        <div className='noteIcon'
          onClick={t.handler}
          key={i}>
          <Icon icon={t.icon}
            size={15}
            color={iconsColor}/>
        </div>)
    })
    const notes = this.props.notes.map((t, i) => {
      return (
        <div key={i}
          className='note'>
          <div className='titleBar'>
            <p className='title'>
              {t.title} 
            </p>
            <div className='icons'>
              {iconsTags}
            </div>
          </div>
          <p className='noteContent'>
            {t.content}
          </p>
        </div>
      )
    })

    const addModal = (
      <NoteModal
        isCreated={false}
        isOpen={this.state.isAddOpen}
        onRequestClose={this.handleClickOutside}
      />
    )
    const editModal = (
      <NoteModal
        isCreated={true}
        isOpen={this.state.isEditOpen}
        onRequestClose={this.handleClickOutside}
      />
    )
    const deleteModal = (
      <DeleteModal
        isOpen={this.state.isDeleteOpen}
        onRequestClose={this.handleClickOutside}
      />
    )

    return (
      <div className='notesList'>
        <h1>Notes</h1>
        <div className='addNotes'
          onClick={this.handleAddClick}>
          &nbsp;Add new note 
        </div>
        {notes}
        
        {addModal}
        {editModal}
        {deleteModal}
      </div>
    )
  },
})

export default NotesList