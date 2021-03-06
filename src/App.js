import React, { Component } from 'react';
import { verify, hash, publish } from '@iota/poex-tool'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import nodes from './nodes'
import DocumentSignature from './partials/DocumentSignature'
import DocumentVerification from './partials/DocumentVerification'
import SelectFile from './partials/SelectFile'
import SelectNode from './partials/SelectNode'
import Header from './partials/header'
import Loader from './partials/loader'
import Footer from './partials/footer'
import { dSeed, dAddress } from './partials/defaults'
import { isValidTrytes, validateData, redirectTo } from './partials/utils'

const styles = {width: '360px'}

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currPath: '/',
      pageTitle: 'No Title?',
      file: null,
      transactionHash: '',
      provider: '',
      address: '',
      docMutated: null,
      hashValue: '',
      genTxHash: '',
      genChannelAddress: '',
      isLoading: false,
      filename: ''
    }
    this.handleFileSet = this.handleFileSet.bind(this)
    this.verify = this.verify.bind(this)
    this.reset = this.reset.bind(this)
    this.onProviderSelected = this.onProviderSelected.bind(this)
    this.signDocument = this.signDocument.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.triggerRouteChange = this.triggerRouteChange.bind(this)
  }
  triggerRouteChange(childState) {
    this.setState({ currPath: childState.currPath })
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

  async signDocument(address, seed) {
    const isValid = validateData(address,
                     seed,
                     this.state.provider,
                     this.state.file)
    if(!isValid) {
      return
    }
    this.setState({ isLoading: true })
    const provider = this.state.provider
    const data = this.state.hashValue
    const { depth, minWeightMagnitude } = getProviderParams(this.state.isMainnet)
    try {
      const retArr = await publish({
        provider,
        data,
        address,
        seed,
        depth,
        minWeightMagnitude
      })
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

    } catch(e) {
      alert(`could not establish connection to this node ${this.state.provider}, please choose a working node and try again!`)
      redirectTo('/')
    }
  }
  verify(address, transactionHash, navigate) {
    const isValid = validateData(address,
                 transactionHash,
                 this.state.provider,
                 this.state.file)
    if(!isValid) {
      return
    }
    this.setState({
      isLoading: true
    })
    const reader = new FileReader();
    reader.addEventListener("loadend", async () => {
       const file = reader.result
       const bundle = {
         address: address,
         hash: transactionHash,
         provider: this.state.provider
       }
       try {
         const verified = await verify(bundle, true, file)
         this.setState({ isLoading: false, docMutated: verified })
       } catch(e) {
         console.log(e)
         this.setState({ isLoading: false, docMutated: false })
       }

    });
    reader.readAsArrayBuffer(this.state.file);
  }
  reset(e) {

  }
  handleFileSet(e) {
    const file = e.target.files[0]
    this.setState({file, filename: file.name})
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
          enableNextPage={this.state.enableNextPage}
          currPath={this.state.currPath}
        />
        <div className="layouts--search">
          <div className="middle-column">
              {this.state.isLoading && <Loader />}
              <Route exact path="/" component={(match) => (<SelectFile
                                                        filename={this.state.filename}
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
              <Route path="/verif" component={({ history }) => (<DocumentVerification
                                                        history={history}
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
          <Footer triggerRouteChange={this.triggerRouteChange} />
        </Router>
      );
  }
}

export default App;
