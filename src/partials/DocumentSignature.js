import React, { Component } from 'react';
import { dSeed } from './defaults'
import Radio from './radio'
import Title from './title'

const styles = { width: '100%' }
const topMargin = { marginTop: '30px' }

class SignDocument extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useDefault: true,
      name: 'default',
      pubSeed: ''
    }
    this.handleRandioChange = this.handleRandioChange.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.signDocument = this.signDocument.bind(this)
  }
  signDocument(pubSeed) {
    if (this.state.useDefault) {
      this.props.signDocument(dSeed)
    } else {
      this.props.signDocument(pubSeed)
    }
  }
  handleRandioChange(state, name) {
    this.setState({ useDefault: ((name === 'userdata') ? false : state), name })
  }
  handleInputTextChange(e) {
    if (e.target.name === 'pubSeed') {
      this.setState({
        pubSeed: e.target.value
      })
    }
  }
  render() {
    let generatedHash = this.props.genTxHash !== ''
    let title = 'Generate Your Proof-of-Existence'
    if (generatedHash) {
      title = 'Message Containing the Proof Has Been Broadcasted to the Tangle!'
    }
    return (<div>
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
          <p>The MessageID, meaning the unique identifier of the message stored on the Tangle, is copied to your clipboard. Please press 'Continue'</p>
        </div>}

      </div>
      {!generatedHash && <section>
        {/* <p>By signing your Document, it will be stored securely in the Tangle and therefore any subsequent change to the document will be detected!</p> */}
        {/* <p>By signing your Document, a so-called Proof-of-Existence (PoE) will be securely stored in the Tangle. A PoE is a unique identifier of the exact content (technically speaking, a SHA-256 Hash-value)of the file you provided that is easy to verify if you have access to the file, but impossible to trace back to the original content of the file.
           Therefore any subsequent change to the document will be detected!, as the </p> */}
        <p>By signing your document, a so-called Proof-of-Existence (PoE) will be securely stored in the Tangle. A PoE is a unique fingerprint of the exact content (technically speaking, the SHA-256-hash) of the file you provided.</p>
        <p>Such a hash is easy to verify if you have access to the file, but it is impossible to deduce the original content of the file from it. Therefore, any subsequent change to the document will be detected, while you remain in complete control of your data!</p>
        <div style={topMargin}>
          <Radio
            label="Use default seed (faster)"
            handleRandioChange={this.handleRandioChange}

            name="default"
            checked={this.state.useDefault}
          />
        </div>
        <div style={topMargin}>
          <label style={{ marginLeft: '10px' }}>Seed</label>
          <input className="button button--secondary"
            type="text"
            id="input"
            name="pubSeed"
            style={styles}
            disabled={this.state.useDefault}
            placeholder="Seed"
            value={this.state.useDefault ? dSeed : this.state.pubSeed}
            onChange={this.handleInputTextChange}
          />
        </div>

        <div style={topMargin}>
          <Radio
            label="Use my own seed"
            handleRandioChange={this.handleRandioChange}
            name="userdata"
            checked={(this.state.useDefault === false) && this.state.name === 'userdata'}
          />
        </div>

        <div style={topMargin}>
          <button
            className="button"
            onClick={e => this.signDocument(this.state.pubSeed)}>
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
