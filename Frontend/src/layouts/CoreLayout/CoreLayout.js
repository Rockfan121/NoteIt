import React from 'react'
import { Link } from "react-router"
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends React.Component{
  constructor(props) {
    super(props)
  }
  
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
        <div className='mainContent'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes= {
    children : PropTypes.element.isRequired,  
  }

export default CoreLayout
