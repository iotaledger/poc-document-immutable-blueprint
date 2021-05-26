import React, { Component } from 'react';
import { verify, verifyLegacy, hash, publish } from '@iota/poex-tool'
import { BrowserRouter as Router, Route } from "react-router-dom";
import DocumentSignature from './partials/DocumentSignature'
import DocumentVerification from './partials/DocumentVerification'
import SelectFile from './partials/SelectFile'
import SelectNode from './partials/SelectNode'
import Header from './partials/header'
import Loader from './partials/loader'
import Footer from './partials/footer'
import { legacyPermanode } from './partials/defaults'
import { validateData, redirectTo } from './partials/utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currPath: '/',
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
    this.triggerRouteChange = this.triggerRouteChange.bind(this)
  }
  triggerRouteChange(childState) {
    this.setState({ currPath: childState.currPath })
  }

  onProviderSelected(provider, isMainnet) {
    this.setState({
      provider,
      isMainnet
    })
  }

  async signDocument(seed) {
    const isValid = validateData("addressPlaceholder",
      seed,
      this.state.provider,
      this.state.file)
    if (!isValid) {
      return
    }
    this.setState({ isLoading: true })
    const provider = this.state.provider
    const data = this.state.hashValue
    // const { depth, minWeightMagnitude } = getProviderParams(this.state.isMainnet)

    try {
      const messageId = await publish(data, "BLUEPRINT_IMMUTABLE_DOCUMENTS", provider);
      navigator.clipboard.writeText(messageId).then(() => {
        /* clipboard successfully set */
        this.setState({
          genTxHash: messageId,
          isLoading: false
        })
        alert('MessageID has been copied to clipboard!')
      }, function () {
        alert('Clipboard not supported, please manually copy the generated MessageID')
      });

    } catch (e) {
      alert(`could not establish connection to the node ${this.state.provider}, please choose a working node and try again!`)
      redirectTo('/')
    }
  }
  verify(address, msgIdOrTxHash, navigate) {
    const isValid = validateData(address,
      msgIdOrTxHash,
      this.state.provider,
      this.state.file)
    if (!isValid) {
      return
    }
    this.setState({
      isLoading: true
    })
    const reader = new FileReader();
    reader.addEventListener("loadend", async () => {
      const file = reader.result

      try {
        let verified;
        if (address && address.length > 0) {
          //If address param is not empty, this is a legacy-fetch
          const bundle = {
            address: address,
            hash: msgIdOrTxHash,
            provider: legacyPermanode
          }
          console.log(bundle)
          verified = await verifyLegacy(bundle, true, file);
        }
        else {
          verified = await verify(msgIdOrTxHash, true, file, this.state.provider);
        }

        this.setState({ isLoading: false, docMutated: verified })
      } catch (e) {
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
    this.setState({ file, filename: file.name })
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      const file = reader.result
      const hashValue = hash(file, true)
      this.setState({ hashValue })
    });
    reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <Router>
        <Header
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
              isMainnet={this.state.isMainnet}
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
            <Route path="/verify" component={({ history }) => (<DocumentVerification
              history={history}
              transactionHash={this.state.transactionHash}
              handleInputTextChange={this.handleInputTextChange}
              address={this.state.address}
              onChange={this.handleInputTextChange}
              reset={this.reset}
              docMutated={this.state.docMutated}
              verify={this.verify}
              reset={this.reset} />)} />

          </div>
        </div>
        <Footer triggerRouteChange={this.triggerRouteChange} />
      </Router>
    );
  }
}

export default App;
