import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
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
    let docMutated = this.props.docMutated
    let title = 'Please fill the form'
    let text = `Please fill the generated TX Hash (should be in your clipboard) and the Fetching Testing Address, if you don't have them yet, please go to Step 2`
    let cssClass = 'message-box__info'
    if(docMutated === false) {
      cssClass = 'message-box__danger'
      title = 'Document not valid anymore'
      text = `The calculated Hash didn't match with the saved one`
    } else if(docMutated === true) {
      cssClass = 'message-box__success'
      title = 'Document Valid!'
      text = `The document hash haven't been mutated since its first signature with the Tangle.`
    }
    return(<div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="txhash"
               style={styles}
               placeholder="TX Hash"
               value={this.props.transactionHash}
               onChange={this.props.handleInputTextChange}
        />
      </div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="address"
               style={styles}
               placeholder="Fetch Address"
               value={this.props.address}
               onChange={this.props.handleInputTextChange}
        />
      </div>
       <div className="button-container button-container__center">
        <button className="button" onClick={this.props.verify}>Verify</button>
        <button className="button" onClick={this.props.reset}>Reset</button>
       </div>
       <br/>
       <div className="button-container button-container__center">
          <div className={`message-box ${cssClass}`} >
            <div className="message-box--icon"></div>
            <div className="message-box--text">
               <div className="message-box--title">{title}</div>
               <div className="message-box--content">{text}</div>
            </div>
          </div>
      </div></div>)
  }
}


export default App
