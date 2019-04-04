import React, { Component } from 'react';
import { verify, hash, publish } from 'signature-validation-tool'
// import nodes from './nodes'
// import DropDown from './Dropdown'

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
  render() {
    return(<div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubAddress"
               style={styles}
               placeholder="Publish Address"
               value={this.props.pubAddress}
               onChange={this.props.handleInputTextChange}
        />
      </div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubSeed"
               style={styles}
               placeholder="Seed"
               value={this.props.pubSeed}
               onChange={this.props.handleInputTextChange}
        />
      </div>
      <div className="button-container button-container__center">
       <button className="button" onClick={this.props.signDocument}>Sign the document</button>
       <button className="button" onClick={this.props.reset}>Clear</button>
      </div>

      <div className="button-container button-container__center">
         <div style={{display: 'block'}}>
           <div><span className="text text--level2">Calculated Hash Value:</span></div>
           <div>{this.props.hashValue}</div>
           <div><span className="text text--level2">Generated TX Hash:</span></div>
           <div>{this.props.genTxHash}</div>
         </div>
      </div></div>)
  }
}

export default App
