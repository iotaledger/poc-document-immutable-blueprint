import React, { Component } from 'react';
import { verify, hash, publish } from '@iota/poex-tool'
import { dSeed, dAddress } from './defaults'
import Radio from './radio'
import Title from './title'

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
    let title = 'Generate your TX Hash'
    if(generatedHash) {
      title = 'TX Hash Generated'
    }
    return(<div>
      <div>
        <Title value={title} valid={generatedHash} />
      </div>
      <div style={{ marginTop: '35px' }}>
        {generatedHash && <div>
                            <Title
                              value={this.props.genTxHash}
                              valid={false}
                              style={{ fontSize: '32px', wordBreak: 'break-word' }}
                            />
                            <p>The TX Hash already copied in clipboard, please press 'Continue'</p>
                           </div>}

      </div>
      {!generatedHash && <section>
        <p>By signing your Document, it will be stored securely in the Tangle and therefore any subsequent change to the document will be detected!</p>
        <div style={topMargin}>
          <Radio
            label="Use default seed (faster)"
            handleRandioChange={this.handleRandioChange}

            name="default"
            checked={this.state.useDefault}
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

      </div>)
  }
}

export default SignDocument
