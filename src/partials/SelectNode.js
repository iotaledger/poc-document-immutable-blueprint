import React, { Component } from 'react';
import nodes from './../nodes'
import DropDown from './Dropdown'
import Title from './title'

const styles = { width: '100%' }

class SelectNode extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let everythingIsOk = (this.props.provider!='')
    let title = 'Select your Node'
    let validText = false
    if(everythingIsOk === true) {
      title = 'Selected node runs on ' + ((this.props.isMainnet === true)? 'Mainnet' : 'Devnet')
      validText = true
    }
    return(<div>

      <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
        <Title value={title} valid={validText} />
      </div>
      <p>A node is the first receiver of your message. Nodes will continuously broadcast all received, valid messages to their neighbours, quickly reaching all nodes in a peer-to-peer-manner.</p>
      <p>Proofs issued on Mainnet or Devnet can only be verified with nodes running on Mainnet or Devnet, respectively.</p>
      <p>Note: If you just want to verify a Proof-of-Existence you issued before the Chrysalis-network was live (e.g. before April 28th, 2021), just click "Continue".</p>
      <DropDown
        nodes={nodes}
        onProviderSelected={this.props.onProviderSelected}
        styles={styles}
        provider={this.props.provider}
      />
      </div>)
  }
}


export default SelectNode
