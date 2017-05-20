import React from "react"
import { fetchNotes } from 'data/NoteActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

const NotesContainer = connect(
  (state) => {
    const A = state.notes
    return {
      notes: A.get('notes'),
    }
  },
  (dispatch) => {
    return {
      fetchN: () => fetchNotes()(dispatch),
    }
  }
)(notesContainer)

export default NotesContainer
