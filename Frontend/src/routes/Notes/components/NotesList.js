import React from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import Modal from 'react-modal'
import Icon from '../../../components/Icon'
import DeleteModal from '../../../components/Modal/DeleteModal'
import NoteModal from '../../../components/Modal/NoteModal'
import { icons } from '../../../assets/icons'
import './NotesList.scss'


class NotesList extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      isEditOpen: false,
      isDeleteOpen: false,
      isAddOpen: false,
      title: '',
      content: '',
      id: 0,
      userId: 0,
    }
  }
  

  componentWillMount() {
    this._isMounted = false
    //console.log("NotesList componentWillMount")
    /*this.setState({ 
      userId: this.props.userId, 
    })*/
   // console.log('Authorization: ' +axios.defaults.headers.common['Authorization'])
  }

  componentWillReceiveProps(newProps) {
    //console.log("NotesList componentWillReceiveProps")
    if (this._isMounted == true) {
      this.setState({ 
        userId: newProps.userId, 
      })
    }
    //console.log('Authorization: ' +axios.defaults.headers.common['Authorization'])
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  createAndFetch = (state) => {
    this.props.createN(state)
      .then((response) =>{
        this.props.fetchN()    
      })
    
    this.handleClickOutside()
  }

  updateAndFetch= (state) =>{
    this.props.updateN(state)
      .then((response) =>{
        this.props.fetchN()    
      })
    this.handleClickOutside()
  }

  deleteAndFetch = (state) =>{
    this.props.deleteN(state)
      .then((response) =>{
        this.props.fetchN()    
      })
    this.handleClickOutside()
  }


  fillState = (e) => {
    const node = this.findAncestor(e.target, 'note')
    const title = node.getAttribute('data-title') 
    const content = node.getAttribute('data-content') 
    const id = node.getAttribute('data-id')
    this.setState({ 
      title,
      content,
      id,
    })
  }

  handleAddClick = (e) => {
    this.setState({ 
      title: '',
      content: '',
      id: 0,
      isAddOpen: true,
    })
  }
  handleEditClick = (e) => {
    this.fillState(e)
    this.setState({ isEditOpen: true })
  }
  handleDeleteClick = (e) => {
    this.fillState(e)
    this.setState({ isDeleteOpen: true })
  }
  handleClickOutside = (e) => {
    this.setState({ 
      isEditOpen: false,
      isDeleteOpen: false,
      isAddOpen: false,
    })
  }

  findAncestor = (el, cls) => {
    while ((el.parentElement) && !el.classList.contains(cls)) {
      el = el.parentElement
    }
    return el
  }


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
          data-id={t.id}
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
        onSubmit={this.createAndFetch}
        values={this.state}
      />
    )
    const editModal = (
      <NoteModal
        isCreated={true}
        isOpen={this.state.isEditOpen}
        onRequestClose={this.handleClickOutside}
        onSubmit={this.updateAndFetch}
        values={this.state}
      />
    )
    const deleteModal = (
      <DeleteModal
        isOpen={this.state.isDeleteOpen}
        onRequestClose={this.handleClickOutside}
        onSubmit={this.deleteAndFetch}
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
  }
}

NotesList.propTypes ={
  fetchN: PropTypes.func.isRequired,
  createN: PropTypes.func.isRequired,
  updateN: PropTypes.func.isRequired,
  deleteN: PropTypes.func.isRequired,
  notes: PropTypes.any.isRequired,
  userId: PropTypes.number.isRequired,
}


export default NotesList