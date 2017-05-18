import React from 'react'
import { Link } from "react-router"
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

const CoreLayout = React.createClass({
  propTypes: {
    children : React.PropTypes.element.isRequired,  
  },
  render() {
    const buttons = [
      <Link className='button'
        to='#'>Log out
      </Link>,
    ]
    return (
      <div className='layout'>
        <Header myTitle='NoteIt!' 
          buttons={buttons} />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default CoreLayout
