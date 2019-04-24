import React, { Component } from 'react';
import radioChecked from './assets/radio-checked.svg'
import radioUnChecked from './assets/radio-unchecked.svg'

const radioSize = { width: '25px', height: '25px' }

// <img src={radioChecked} style={radioSize} />
// <img src={radioUnChecked} style={radioSize} />

class Radio extends Component {
  constructor(props) {
    super(props)
    this.handleRadio = this.handleRadio.bind(this)
  }
  handleRadio(e) {
    this.props.handleRandioChange(!this.props.checked, this.props.name)
  }

  render() {
    return(<button style={{ border: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', outline: 0 }} onClick={this.handleRadio}>
      {this.props.checked ? <img src={radioChecked} /> : <img src={radioUnChecked} />}
      <span style={{ marginLeft: '10px' }}>{this.props.label}</span>
    </button>
)
  }
}


export default Radio
