import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import { dSeed, dAddress } from './defaults'
import Radio from './radio'
// import nodes from './nodes'
// import DropDown from './Dropdown'

const styles = { width: '100%' }
const topMargin = { marginTop: '30px' }

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class SignDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useDefault: true,
      name: 'default',
      pubAddress: '',
      pubSeed: ''
    }
    this.handleRandioChange = this.handleRandioChange.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
  }
  handleRandioChange(state, name) {
    this.setState({ useDefault: ((name === 'userdata') ? false : state), name })
  }
  handleInputTextChange(e) {
   if(e.target.name === 'pubAddress') {
      this.setState({
        pubAddress: e.target.value
      })
    } else if(e.target.name === 'pubSeed') {
      this.setState({
        pubSeed: e.target.value
      })
    }
  }
  render() {
    let isFormFilled = (this.props.pubAddress!='' && this.props.pubSeed!='')
    let isFormatValid = isFormFilled
    let everythingIsOk = isFormatValid && isFormFilled
    let seedLink =  <a target="_blank" href='https://ipfs.io/ipfs/QmdqTgEdyKVQAVnfT5iV4ULzTbkV4hhkDkMqGBuot8egfA'>here (SEED)</a>
    let AddLink =  <a target="_blank" href='https://people.dsv.su.se/~haughey/iota-offline/iota-offline-address-generator.html'>here (ADDRESS)</a>
    let title = 'Please fill the form'
    let text = (<div className="message-box--content">{`Please generate a TESTING Seed and Address from`} {seedLink} and {AddLink}. <br />
    {`- Do NOT use your real SEED/ADDRESS! Once the Document is signed and you get TX hash, no one can mutate or re-sign that document, even though they got your SEED/ADDRESS.`} <br />
    {`- Using different ADDRESSES is recommended to separate documents by type or category, so only ADDRESS and TX Hash is needed to retrieve the document hash`} <br />
    </div>)
    let cssClass = 'message-box__info'
    if(isFormFilled && !isFormatValid) {
      cssClass = 'message-box__danger'
      title = 'Data not valid'
      text = <div className="message-box--content">{`It seems that your Address/SEED are not valid please make sure they have 81 length and all Uppercase.`}</div>
    } else if(everythingIsOk) {
      cssClass = 'message-box__success'
      title = 'Form Filled'
      text = <div className="message-box--content">{`Form has been filled, please press 'Sign the document', this will send the signature to the Tangle.`}</div>
    }
    const defaultSelected = () => ((this.state.useDefault && this.state.name === 'default') || this.state.useDefault === false)
    return(<div>

      <div style={{ margin: '30px 0'}} className="button-container button-container__center">
         <div className="button-container button-container__center">
             <div className={`message-box ${cssClass}`} >
               <div className="message-box--icon"></div>
               <div className="message-box--text">
                  <div className="message-box--title">{title}</div>
                  {text}
               </div>
             </div>
         </div>
      </div>

      <div style={topMargin}>
        <Radio
          label="Use the default Address and Seed (faster)"
          handleRandioChange={this.handleRandioChange}

          name="default"
          checked={this.state.useDefault}
        />
      </div>
      <div style={topMargin}>
        <label style={{marginLeft: '10px'}}>Address</label>
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubAddress"
               style={styles}
               disabled={this.state.useDefault}
               placeholder="Publish Address"
               value={this.state.useDefault? dAddress : this.state.pubAddress}
               onChange={this.handleInputTextChange}
        />
      </div>
      <div style={topMargin}>
        <label style={{marginLeft: '10px'}}>Seed</label>
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubSeed"
               style={styles}
               disabled={this.state.useDefault}
               placeholder="Seed"
               value={this.state.useDefault? dSeed : this.state.pubSeed}
               onChange={this.handleInputTextChange}
        />
      </div>

      <div style={topMargin}>
        <Radio
          label="Use my own Address and Seed"
          handleRandioChange={this.handleRandioChange}
          name="userdata"
          checked={(this.state.useDefault === false) && this.state.name === 'userdata'}
        />
      </div>

      <div style={topMargin}>
         <button
          className="button"
          onClick={e => this.props.signDocument(this.state.pubAddress, this.state.pubSeed)}>
          Sign the document
         </button>
         
         <button
          className="button"
          onClick={this.props.reset}>
          Clear
        </button>
      </div>

      {/*<div className="button-container button-container__center">
         <div style={{display: 'block'}}>
           <div><span className="text text--level2">Calculated Hash Value:</span></div>
           <div>{this.props.hashValue}</div>
           <div><span className="text text--level2">Generated TX Hash:</span></div>
           <div>{this.props.genTxHash}</div>
         </div>
      </div>*/}

      </div>)
  }
}

export default SignDocument
