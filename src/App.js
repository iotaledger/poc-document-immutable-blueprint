import React, { Component } from 'react';
import { verify, hash } from 'signature-validation-tool'
import nodes from './nodes'
import DropDown from './Dropdown'
//IFWT9BLRWACAJHCMTBKDPYRDAWUQSYVIPTLQSRKJJ9XCIPVXTZSNSABBRWEQDVOGIVHFLXZGI9XSA9999
//MRDVKCDQAPYQOJEQTUWDMNYZKDUDBRNHJWV9VTKTCUUYQICLPFBETMYYVKEPFCXZE9EJZHFUWJZVEWUCWSGDUVMOYD
const styles = {width: '360px'}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      transactionHash: '',
      provider: '',
      address: '',
      docMutated: null,
      hashValue: '',
      genTxHash: '',
      genChannelAddress: ''
    }
    this.handleFileSet = this.handleFileSet.bind(this)
    this.verify = this.verify.bind(this)
    this.reset = this.reset.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.onProviderSelected = this.onProviderSelected.bind(this)
  }
  onProviderSelected(provider) {
    this.setState({
      provider
    })
  }
  handleInputTextChange(e) {
    if(e.target.name === 'txhash') {
      this.setState({
        transactionHash: e.target.value
      })
    } else if(e.target.name === 'address') {
      this.setState({
        address: e.target.value
      })
    }

  }
  verify(e) {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       const file = reader.result
       const bundle = {
         address: this.state.address,
         hash: this.state.transactionHash,
         provider: this.state.provider
       }
       verify(
              bundle,
              true,
              file,
              (verified) => this.setState({docMutated: verified})
             )
    });
    reader.readAsArrayBuffer(this.state.file);
  }
  reset(e) {

  }
  handleFileSet(e) {
    const file = e.target.files[0]
    this.setState({file})
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       const file = reader.result
       const hashValue = hash(file, true)
       this.setState({hashValue})
    });
    reader.readAsArrayBuffer(file);
  }
  render() {
    const docMutated = this.state.docMutated
    const title = 'Please fill the form'
    const text = `Please fill the form above, make sure you pick up the right provider.
    If you don't have TX Hash or Chnnel Address yet, then you have to publish your document and get these infos.`
    const cssClass = 'message-box__info'
    if(docMutated === 0) {
      cssClass = 'message-box__danger'
      const title = 'Document not valid anymore'
      const text = `The calculated Hash didn't match with the saved one`
      const cssClass = 'message-box__info'
    } else if(docMutated === 1) {
      cssClass = 'message-box__success'
      const title = 'Document Valid!'
      const text = `The document hash haven't been mutated since its first signature with the Tangle.`
      const cssClass = 'message-box__info'
    }
    return (
      <div className="layouts--search">
         <div className="middle-column">
           <h1 className="text text--level1 text--primary">General params</h1>
           <div className="button-container button-container__center">
             <input className="button button--secondary"
                    type="file"
                    id="input"
                    onChange={this.handleFileSet}
             />
           </div>
           <div className="button-container button-container__center">
             <DropDown
               nodes={nodes}
               onProviderSelected={this.onProviderSelected}
               styles={styles}
             />
           </div>

           <div className="horizontal-rule"></div>
           <h1 className="text text--level1 text--primary">Document Signature</h1>


           <div className="button-container button-container__center">
            <button className="button" onClick={this.signDocument}>Sign the document</button>
            <button className="button" onClick={this.reset}>Clear</button>
           </div>

           <div className="button-container button-container__center">
              <div style={{display: 'block'}}>
                <div>{this.state.hashValue}</div>
                <div>{this.state.genTxHash}</div>
                <div>{this.state.genChannelAddress}</div>
              </div>
           </div>

           <div className="horizontal-rule"></div>

           <h1 className="text text--level1 text--primary">Document Validation</h1>

          <div className="button-container button-container__center">
            <input className="button button--secondary"
                   type="text"
                   id="input"
                   name="txhash"
                   style={styles}
                   placeholder="TX Hash"
                   value={this.state.transactionHash}
                   onChange={this.handleInputTextChange}
            />
          </div>
          <div className="button-container button-container__center">
            <input className="button button--secondary"
                   type="text"
                   id="input"
                   name="address"
                   style={styles}
                   placeholder="Channel Address"
                   value={this.state.address}
                   onChange={this.handleInputTextChange}
            />
          </div>
           <div className="button-container button-container__center">
            <button className="button" onClick={this.verify}>Verify</button>
            <button className="button" onClick={this.reset}>Reset</button>
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
          </div>

         </div>
       </div>
    );
  }
}

export default App;
