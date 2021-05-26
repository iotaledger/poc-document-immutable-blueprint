import React, { Component } from 'react';
import Title from './title'
import { isValidTrytes } from './utils';

const styles = { width: '100%' }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      msgIdOrTxHash: '',
      legacyAddress: '',
      provider: '',
      verifyAnother: false,
      isLegacy: false
    }
    this.verifyAnother = this.verifyAnother.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
  }
  verifyAnother(e) {
    this.setState({ verifyAnother: true })
  }
  handleInputTextChange(e) {
    if (e.target.name === 'msgIdOrtxhash') {
      this.setState({
        msgIdOrTxHash: e.target.value
      })
      if (isValidTrytes(e.target.value) &&e.target.value.length === 81) {
        this.setState({ isLegacy: true })
      }
      else {
        this.setState({ isLegacy: false })
      }
    } else if (e.target.name === 'legacyAddress') {
      this.setState({
        legacyAddress: e.target.value
      })
    }
  }
  render() {
    let docMutated = this.props.docMutated
    docMutated = this.state.verifyAnother ? '' : docMutated
    let title = ''
    let text = ''
    let validText = false
    if (docMutated === false) {
      title = 'Document Has Been Changed'
      text = 'It looks like the document has been modified, the calculated hash has changed ever since it was signed on the Tangle.'
    } else if (docMutated === true) {
      title = 'Document Is Valid!'
      text = 'The PoE stored in the Tangle matched the fingerprint of the provided file.'
      validText = true
    } else {
      title = 'Let the Tangle Validate It'
      text = "Please fill in the generated MessageID (should be in your clipboard). If you want to verify a PoE created before the Chrysalis network upgrade, please enter your Transaction Hash and then the issuing address."
    }
    const { legacyAddress, msgIdOrTxHash } = this.state
    return (<div>
      <div>
        <Title value={title} valid={validText} />
      </div>

      {docMutated && <div style={{ marginTop: '40px' }} className="message-box message-box__success">
        <div className="message-box--icon"></div>
        <div className="message-box--text">
          <div className="message-box--title">{title}</div>
          <div className="message-box--content">
            <p>{text} </p>
            <p></p>
          </div>
        </div>
      </div>}

      {docMutated && <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }} >
        <a onClick={this.verifyAnother}>Verify another document</a>
        <a href={`${window.location.origin}/`}>Start over again</a>
      </div>}
      {!docMutated && <section>
        <p>{text}</p>
        <div>
          <input className="button button--secondary"
            type="text"
            id="input"
            name="msgIdOrtxhash"
            style={styles}
            placeholder="MessageID / Legacy-TX Hash"
            value={this.state.msgIdOrTxHash}
            onChange={this.handleInputTextChange}
            
          />
        </div>
        {this.state.isLegacy === true && // Only render this field if it happens to be a Legacy-TX-hash that has been provided
          <div>
            <input className="button button--secondary"
              type="text"
              id="input"
              name="legacyAddress"
              style={styles}
              placeholder="Legacy-Fetch Address"
              value={this.state.legacyAddress}
              onChange={this.handleInputTextChange}
            />
          </div>
        }
        <div>
          <button className="button" onClick={e => this.props.verify(legacyAddress, msgIdOrTxHash, this.props.history.push)}>Verify</button>
          <button className="button" onClick={this.props.reset}>Reset</button>
        </div>
      </section>}
    </div>)
  }
}


export default App
