import React from 'react'
import PropTypes from 'prop-types'
import './Form.scss'

class FormTextarea extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.props.onChange(e.target.value, this.props.type)
  }

  render () {
    const { label, value, type, inputType } = this.props

    const textarea = (
      <textarea 
        id='textarea'
        type={type}
        value={value}
        onChange={this.onChange}
        className='textarea'
        />
      )
    return (
      <div>
        <label htmlFor='input'
          className='label'>
          {label}
        </label>
        {textarea}
      </div>
    )
  }
}

FormTextarea.propTypes ={
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string,
}

export default FormTextarea