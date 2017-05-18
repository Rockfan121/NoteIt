import React from 'react'
import './Header.scss'

const Header = React.createClass({
  propTypes: {
    myTitle: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.array,
  },
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
  },
})


export default Header
