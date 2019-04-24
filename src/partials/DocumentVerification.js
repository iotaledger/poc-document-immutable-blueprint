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
    let text = ''
    let validText = false
    if(docMutated === false) {
      title = 'Document has been changed.'
      text = 'Looks like the Document have been mutated, the calculated hash has changed ever since we signed it with the Tangle.'
    } else if(docMutated === true) {
      title = 'Document Valid!'
      text = 'Tangle Signature valid.'
      validText = true
    }
    return(<div>
      <div>
        <Title value={title} valid={validText} />
        {!docMutated && <p>{text}</p>}
      </div>

      {docMutated && <div style={{ marginTop: '40px' }} className="message-box message-box__success">
        <div className="message-box--icon"></div>
        <div className="message-box--text">
          <div className="message-box--title">{title}</div>
          <div className="message-box--content">
            {text}
          </div>
        </div>
      </div>}
      {!docMutated &&<section>
         <p>Please fill the generated TX Hash (should be in your clipboard) and the Fetching Address, if you don't have them yet, please go to Step 2</p>
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
       </section>}
      </div>)
  }
}


export default App
