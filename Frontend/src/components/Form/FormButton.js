import React from 'react'
import PropTypes from 'prop-types'
import './Form.scss'

class FormButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <button onClick={this.props.onSubmit}
        className='submitBtn'>
        {this.props.label}
      </button>
    )
  }
}

FormButton.propTypes={
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default FormButton