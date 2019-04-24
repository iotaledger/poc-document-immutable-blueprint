import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import nodes from './nodes'
import DropDown from './Dropdown'
import DocumentSignature from './partials/DocumentSignature'
import DocumentVerification from './partials/DocumentVerification'
import SelectFile from './partials/SelectFile'
import SelectNode from './partials/SelectNode'
import Header from './partials/header'
import Loading from './partials/Loading'
import Footer from './partials/footer'
import { dSeed, dAddress } from './partials/defaults'

const styles = {width: '360px'}

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathname: window.location.pathname,
      pubSeed: dSeed,
      pubAddress: dAddress,
      pageTitle: 'No Title?',
      file: null,
      transactionHash: '',
      provider: '',
      address: '',
      docMutated: null,
      hashValue: '',
      genTxHash: '',
      genChannelAddress: '',
      isLoading: false
    }
    this.handleFileSet = this.handleFileSet.bind(this)
    this.verify = this.verify.bind(this)
    this.reset = this.reset.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.onProviderSelected = this.onProviderSelected.bind(this)
    this.signDocument = this.signDocument.bind(this)
    this.setTitle = this.setTitle.bind(this)
  }
  setTitle(title) {
    this.setState({
      pageTitle: title
    })
  }
  onProviderSelected(provider, isMainnet) {
    this.setState({
      provider,
      isMainnet
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
    } else if(e.target.name === 'pubAddress') {
      this.setState({
        pubAddress: e.target.value
      })
    } else if(e.target.name === 'pubSeed') {
      this.setState({
        pubSeed: e.target.value
      })
    }
  }
  signDocument(e) {
    this.setState({ isLoading: true })
    const provider = this.state.provider
    const data = this.state.hashValue
    const address = this.state.pubAddress
    const seed = this.state.pubSeed
    const { depth, minWeightMagnitude } = getProviderParams(this.state.isMainnet)
    publish({
      provider,
      data,
      address,
      seed,
      depth,
      minWeightMagnitude
    }, (retArr) => {
      navigator.clipboard.writeText(retArr[0].hash).then(() => {
        /* clipboard successfully set */
        this.setState({
          genTxHash: retArr[0].hash,
          isLoading: false
        })
        alert('TX Hash has been copied to clipboard!')
      }, function() {
        alert('clipboard not supported, please copy manually the generated TX Hash')
      });

    })
  }
  verify(e) {
    this.setState({
      isLoading: true
    })
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
              (verified) => this.setState({ isLoading: false, docMutated: verified })
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
    return (
        <Router>
        <Header
          pageTitle={this.state.pageTitle}
          location={this.state.pathname}
          enableNextPage={this.state.enableNextPage}
        />
        <div className="layouts--search">
          <div className="middle-column" style={{border: '1px solid blue'}}>
              {this.state.isLoading && <Loading />}
              <Route exact path="/" component={(match) => (<SelectFile
                                                        handleFileSet={this.handleFileSet}
                                                        onProviderSelected={this.onProviderSelected}
                                                        hashValue={this.state.hashValue}
                                                        provider={this.state.provider}
                                                        setNextPage={this.setNextPage}
                                                        />)} />
              <Route exact path="/node" component={(match) => (<SelectNode
                                                        handleFileSet={this.handleFileSet}
                                                        onProviderSelected={this.onProviderSelected}
                                                        hashValue={this.state.hashValue}
                                                        provider={this.state.provider}
                                                        setNextPage={this.setNextPage}
                                                        />)} />
              <Route path="/sign" component={() => (<DocumentSignature
                                                      pubAddress={this.state.pubAddress}
                                                      handleInputTextChange={this.handleInputTextChange}
                                                      pubSeed={this.state.pubSeed}
                                                      signDocument={this.signDocument}
                                                      hashValue={this.state.hashValue}
                                                      genTxHash={this.state.genTxHash}
                                                      setNextPage={this.setNextPage}
                                                      />)} />
              <Route path="/verif" component={() => (<DocumentVerification
                                                        transactionHash={this.state.transactionHash}
                                                        handleInputTextChange={this.handleInputTextChange}
                                                        address={this.state.address}
                                                        onChange={this.handleInputTextChange}
                                                        reset={this.reset}
                                                        docMutated={this.state.docMutated}
                                                        verify={this.verify}
                                                        reset={this.reset}/>)} />

            </div>
          </div>
          <Footer />
        </Router>
      );
  }
  /*render() {
    let docMutated = this.state.docMutated
    let title = 'Please fill the form'
    let text = `Please fill the form above, make sure you pick up the right provider.
    If you don't have TX Hash or Chnnel Address yet, then you have to publish your document and get these infos.`
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
    return (
      <div className="layouts--search">
         <div className="middle-column">
           <h1 className="text text--level1 text--primary">1 - General params</h1>
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
           <h1 className="text text--level1 text--primary">2 - Document Signature (can be omitted)</h1>

           <div className="button-container button-container__center">
             <input className="button button--secondary"
                    type="text"
                    id="input"
                    name="pubAddress"
                    style={styles}
                    placeholder="Publish Address, if omitted default"
                    value={this.state.pubAddress}
                    onChange={this.handleInputTextChange}
             />
           </div>
           <div className="button-container button-container__center">
             <input className="button button--secondary"
                    type="text"
                    id="input"
                    name="pubSeed"
                    style={styles}
                    placeholder="Seed, if omitted default is taken"
                    value={this.state.pubSeed}
                    onChange={this.handleInputTextChange}
             />
           </div>
           <div className="button-container button-container__center">
            <button className="button" onClick={this.signDocument}>Sign the document</button>
            <button className="button" onClick={this.reset}>Clear</button>
           </div>

           <div className="button-container button-container__center">
              <div style={{display: 'block'}}>
                <div><span className="text text--level2">Calculated Hash Value:</span></div>
                <div>{this.state.hashValue}</div>
                <div><span className="text text--level2">Generated TX Hash:</span></div>
                <div>{this.state.genTxHash}</div>
              </div>
           </div>

           <div className="horizontal-rule"></div>

           <h1 className="text text--level1 text--primary">3 - Document Validation</h1>

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
                   placeholder="Fetch Address"
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
  } */
}

export default App;
