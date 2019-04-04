import React, { Component } from 'react';
import { verify, hash, publish } from 'signature-validation-tool'
import nodes from './../nodes'
import DropDown from './../Dropdown'

const styles = {width: '360px'}

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      transactionHash: '',
      provider: ''
    }
    // this.handleFileSet = this.handleFileSet.bind(this)
    // this.verify = this.verify.bind(this)
  }
  componentDidMount() {
  }
  render() {
    return(<div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="file"
               id="input"
               onChange={this.props.handleFileSet}
        />
      </div>
      <div className="button-container button-container__center">
        <DropDown
          nodes={nodes}
          onProviderSelected={this.props.onProviderSelected}
          styles={styles}
        />
      </div>
      <div className="button-container button-container__center">
         <div style={{display: 'block'}}>
           <div><span className="text text--level2">Calculated Hash Value:</span></div>
           <div>{this.props.hashValue}</div>
         </div>
      </div>
      </div>)
  }
}


export default App
