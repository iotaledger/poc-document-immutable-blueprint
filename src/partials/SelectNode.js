import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import nodes from './../nodes'
import DropDown from './../Dropdown'
import Title from './title'

const styles = { width: '100%' }

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class SelectNode extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let everythingIsOk = (this.props.hashValue!='')
    let title = 'Select your Node'
    if(everythingIsOk === true) {
      title = 'Node Selected'
    }
    return(<div>

      <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
        <Title value={title} />
      </div>
      <p>A node is the first receiver of your transaction, it will be later broadcasted to its neighbours</p>
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
