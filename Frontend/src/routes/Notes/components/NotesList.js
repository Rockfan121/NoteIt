import React from "react"
import PropTypes from 'prop-types'


import './NotesList.scss'

const NotesList = React.createClass({
  propTypes: {
    notes: PropTypes.any.isRequired,
  },
  render() {
    const notes = this.props.notes.map((t, i) => {
      return (
        <div key={i}
          className='note'>
          <p className='title'>
            {t.title} 
          </p>
          <p className='noteContent'>
            {t.content}
          </p>
        </div>
      )
    })
    return (
      <div className='notesList'>
        <h1>Notes</h1>
        {notes}
      </div>
    )
  },
})

export default NotesList