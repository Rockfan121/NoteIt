import React from "react"
import { fetchNotes } from 'data/NoteActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { createNote, updateNote, deleteNote } from 'data/NoteActions'

import NotesList from '../components/NotesList'
import UserInfo from '../components/UserInfo'

const notesContainer = React.createClass({
  propTypes: {
    fetchN: PropTypes.func.isRequired,
    deleteN: PropTypes.func.isRequired,
    createN: PropTypes.func.isRequired,
    updateN: PropTypes.func.isRequired,
    notes: PropTypes.any.isRequired,
    userId: PropTypes.number.isRequired,
  },

  componentWillReceiveProps(newProps) {
    this.setState({ 
      notes: newProps.notes,
      userId: newProps.userId,
    })
  },

  componentWillMount() {
    this.props.fetchN()
  },

  getInitialState() {
    return {
      notes: [],
      userId: 0,
    }
  },



  render() {
    const userData = {
      name: 'Name',
      surname: 'Surname',
      nrOfNotes: this.state.notes.length,
    }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <UserInfo userData={userData} />
        <NotesList notes={this.state.notes} 
          userId={this.state.userId}
          fetchN={this.props.fetchN}
          createN={this.props.createN}
          updateN={this.props.updateN}
          deleteN={this.props.deleteN}/>
      </div>
    )
  },
})
let id
const NotesContainer = connect(
  (state) => {
    console.log(state)
    const A = state.notes
    const B = state.auth
    // set token value (needed in page content refreshing)
    axios.defaults.headers.common['Authorization'] =  B.get('token') // bug: token is undefined (should be saved in homeview response)
    id=B.get('userId')
    return {
      notes: A.get('notes'),
      userId: B.get('userId'),
    }
  },
  (dispatch) => {
    return {
      fetchN: () => fetchNotes(id)(dispatch),
      createN: (data)=>createNote(data)(dispatch),
      updateN: (data)=>updateNote(data)(dispatch),
      deleteN: (data)=>deleteNote(data)(dispatch),
    }
  }
)(notesContainer)

export default NotesContainer

