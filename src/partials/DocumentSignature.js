import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import { dSeed, dAddress } from './defaults'
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
      useDefault: true
    }
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }
  handleCheckbox(e) {
    this.setState({ useDefault:  e.target.checked })
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

      <div className="button-container button-container__center">
          <div className="checkbox">
            <div className="checkbox-border">
              <input type="checkbox" checked={this.state.useDefault} onClick={this.handleCheckbox}/>
            </div>
            <label>Using demo Address/Seed</label>
          </div>
      </div>

      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubAddress"
               style={styles}
               disabled={this.state.useDefault}
               placeholder="Publish Address"
               value={this.state.useDefault? dAddress : this.props.pubAddress}
               onChange={this.props.handleInputTextChange}
        />
      </div>
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="text"
               id="input"
               name="pubSeed"
               style={styles}
               disabled={this.state.useDefault}
               placeholder="Seed"
               value={this.state.useDefault? dSeed : this.props.pubSeed}
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
