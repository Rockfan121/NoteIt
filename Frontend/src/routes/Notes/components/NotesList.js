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
      title: '',
      content: '',
    }
  },

  getNoteTitle(e) {
    console.log(e.target.parentElement.className)
    return e.target.parentElement.getAttribute('data-title') 
  },

  getNoteContent(e) {
    console.log(e.target.parentElement.className)
    return e.target.parentElement.getAttribute('data-content') 
  },

  fillState(e) {
    const node = this.findAncestor(e.target, 'note')
    const title = node.getAttribute('data-title') 
    const content = node.getAttribute('data-content') 
    this.setState({ 
      title: title,
      content: content,
    })
  },

  handleAddClick(e) {
    this.setState({ 
      title: '',
      content: '',
      isAddOpen: true,
    })
  },
  handleEditClick(e) {
    this.fillState(e)
    this.setState({ isEditOpen: true })
  },
  handleDeleteClick(e) {
    this.fillState(e)
    this.setState({ isDeleteOpen: true })
  },
  handleClickOutside(e) {
    this.setState({ 
      isEditOpen: false,
      isDeleteOpen: false,
      isAddOpen: false,
    })
  },

  findAncestor (el, cls) {
    while ((el.parentElement) && !el.classList.contains(cls)) {
      el = el.parentElement
    }
    return el
  },

  onSubmit(e) {

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
          className='note'
          data-title={t.title}
          data-content={t.content}
          >
          <div className='titleBar'>
            <p className='title'>
              {t.title} 
            </p>
            <div className='icons'
              key={i}
            >
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
        onSubmit={this.onSubmit}
        values={this.state}
      />
    )
    const editModal = (
      <NoteModal
        isCreated={true}
        isOpen={this.state.isEditOpen}
        onRequestClose={this.handleClickOutside}
        onSubmit={this.onSubmit}
        values={this.state}
      />
    )
    const deleteModal = (
      <DeleteModal
        isOpen={this.state.isDeleteOpen}
        onRequestClose={this.handleClickOutside}
        onSubmit={this.onSubmit}
        values={this.state}
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