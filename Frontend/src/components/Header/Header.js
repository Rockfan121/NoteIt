import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

class Header extends React.Component{
  constructor(props) {
    super(props)
  }

  
  render() {
    const buttons = this.props.buttons != null 
    ? (this.props.buttons.map((btnName, i) => {
      return (
        <li key={i}
          className='barRightItem'>
          {btnName}
        </li>
      )
    }))
    : <div />

    return (
      <div className='barContainer'>
        <div className='barContent'>
          <a href='/'>
            <h1 className='text'>
              {this.props.myTitle}
            </h1>
          </a>
          <ul className='barRightSide'>
            {buttons}
          </ul>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
    myTitle: PropTypes.string.isRequired,
    buttons: PropTypes.array,
  }


export default Header
