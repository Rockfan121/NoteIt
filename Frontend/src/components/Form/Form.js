import React from 'react'
import PropTypes from 'prop-types'

import './Form.scss'
import FormButton from './FormButton'

class Form extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render()  {
    const { buttonLabel, onSubmit, title } = this.props
    const inputs = this.props.children.map((elem,i) =>
      <div key={i}>
        {elem}
      </div>
    ) ? this.props.children : []

    return (
      <div className='form'>
        <div className='title'>{title}</div>
        {inputs}
        <FormButton label={buttonLabel}
          onSubmit={onSubmit} />
      </div>
    )
  }
}

Form.propTypes={
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.array,
  title: PropTypes.string,
}

export default Form