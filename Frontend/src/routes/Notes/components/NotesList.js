import React from "react"
import PropTypes from 'prop-types'
import Icon from 'components/Icon'
import { icons } from 'assets/icons'


import './NotesList.scss'

const NotesList = React.createClass({
  propTypes: {
    notes: PropTypes.any.isRequired,
  },
  render() {
    const iconsData = [
      {
        icon: [
          icons.delete1,
          icons.delete2,
        ],
      },
      {
        icon: [
          icons.edit,
        ],
      },
    ]
    const iconsTags = iconsData.map((t, i) => {
      return (
        <div className='noteIcon'
          key={i}>
          <Icon icon={t.icon}
            size={15}
            color='black'/>
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
    return (
      <div className='notesList'>
        <h1>Notes</h1>
        {notes}
      </div>
    )
  },
})

export default NotesList