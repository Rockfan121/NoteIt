import React from 'react'
import { Link } from 'react-router' //co to jest IndexLink?
import cls from './Header.scss'

const Header = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    buttons: React.PropTypes.array,
  },
  render() {
    const buttons = this.props.buttons != null
    ? this.props.buttons.map((btnName, i) =>{
      return (
        <li key={i}
          className={cls.button}>
          {btnName}
        </li>
      )
    })
    : <li />
    return (
      <div className={cls.barContainer}>
        <div className={cls.barContent}>
          <h1 className={cls.text}>{text}</h1>
          <ul className={cls.barRightSide}>
            {buttons}
          </ul>
        </div>
      </div>
    )
  },
})
export default Header
