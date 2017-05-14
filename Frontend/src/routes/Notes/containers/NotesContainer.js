import React from "react"
import { fetchNotes } from 'data/NoteActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
    const notes = this.state.notes.map((t, i) => {
      return <h1 key = {i}>{t.title} {t.content}</h1>
    })
    return (
      <div>
        {notes}
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

