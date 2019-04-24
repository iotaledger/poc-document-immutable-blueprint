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
    }
  }
  signDocument(address, seed) {
    this.setState({ isLoading: true })
    const provider = this.state.provider
    const data = this.state.hashValue
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
          <div className="middle-column">
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
}

export default App;
