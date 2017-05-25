import React from 'react'
import PropTypes from 'prop-types'
import './Icon.scss'

class Icon extends React.Component {  

  render() {
    const paths = this.props.icon.map((elem, i) => {
      return (
        <path style={{ fill: this.props.color }}
          d={elem}
          key={i}>
        </path> )
    })
    
    return (
      <svg className='svg'
        width={`${this.props.size}px`}
        height={`${this.props.size}px`}
        viewBox='0 0 32 32'>
        {paths}
      </svg>
    )
  }
}

Icon.propTypes = {
  icon: PropTypes.array.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}
Icon.defaultProps = {
  size: 16,
}

export default Icon
