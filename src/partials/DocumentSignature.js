import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import { dSeed, dAddress } from './defaults'
import Radio from './radio'
import Title from './title'
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
    this.signDocument = this.signDocument.bind(this)
  }
  signDocument(pubAddress, pubSeed) {
    if(this.state.useDefault) {
      this.props.signDocument(dAddress, dSeed)
    } else {
      this.props.signDocument(pubAddress, pubSeed)
    }
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
    let generatedHash = this.props.genTxHash!=''
    let seedLink =  <a target="_blank" href='https://ipfs.io/ipfs/QmdqTgEdyKVQAVnfT5iV4ULzTbkV4hhkDkMqGBuot8egfA'>here (SEED)</a>
    let AddLink =  <a target="_blank" href='https://people.dsv.su.se/~haughey/iota-offline/iota-offline-address-generator.html'>here (ADDRESS)</a>
    let title = 'Generate your TX Hash'
    if(generatedHash) {
      title = 'TX Hash Generated'
    }
    return(<div>
      <div>
        <Title value={title} valid={generatedHash} />
      </div>
      <div style={{ marginTop: '35px' }}>
        {generatedHash && <Title
                            value={this.props.genTxHash}
                            valid={false}
                            style={{ fontSize: '32px', wordBreak: 'break-word' }}
                          />}

      </div>
      {!generatedHash && <section>
        <p>This is a very long desciption to be incorporated here, to be written in the future</p>
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
            onClick={e => this.signDocument(this.state.pubAddress, this.state.pubSeed)}>
            Sign the document
           </button>

           <button
            className="button"
            onClick={this.props.reset}>
            Clear
          </button>
        </div>
      </section>}
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
