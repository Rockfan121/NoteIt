import React from "react"
import { fetchNotes } from 'data/NoteActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import NotesList from '../components/NotesList'
import UserInfo from '../components/UserInfo'

const notesContainer = React.createClass({
  propTypes: {
    fetchN: PropTypes.func.isRequired,
    notes: PropTypes.any.isRequired,
  },

  componentWillReceiveProps(newProps) {
    this.setState({ notes: newProps.notes })
  },

  componentWillMount() {
    this.props.fetchN()
  },

  getInitialState() {
    return {
      notes: [],
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
        <NotesList notes={this.state.notes} />
      </div>
    )
  },
})
let id
const NotesContainer = connect(
  (state) => {
    const A = state.notes
    const B = state.auth
    // set token value (needed in page content refreshing)
    axios.defaults.headers.common['Authorization'] =  B.get('token') // bug: token is undefined (should be saved in homeview response)
    id=B.get('userId')
    return {
      notes: A.get('notes'),
    }
  },
  (dispatch) => {
    return {
      fetchN: () => fetchNotes(id)(dispatch),
    }
  }
)(notesContainer)

export default NotesContainer

