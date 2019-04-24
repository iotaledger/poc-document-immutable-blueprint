import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import Title from './title'
// import nodes from './nodes'
// import DropDown from './Dropdown'

const styles = {width: '100%'}

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
    let title = `Let the Tangle validate it`
    let validText = false
    if(docMutated === false) {
      title = 'Document has been changed.'
    } else if(docMutated === true) {
      title = 'Document Valid!'
      validText = true
    }
    return(<div>
      <div>
        <Title value={title} valid={validText} />
        <p>Please fill the generated TX Hash (should be in your clipboard) and the Fetching Address, if you don't have them yet, please go to Step 2</p>
      </div>
      <div>
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
      <div>
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
       <div>
        <button className="button" onClick={this.props.verify}>Verify</button>
        <button className="button" onClick={this.props.reset}>Reset</button>
       </div>
       <br/>
       {/*<div className="button-container button-container__center">
          <div className={`message-box ${cssClass}`} >
            <div className="message-box--icon"></div>
            <div className="message-box--text">
               <div className="message-box--title">{title}</div>
               <div className="message-box--content">{text}</div>
            </div>
          </div>
      </div>*/}
      </div>)
  }
}


export default App
