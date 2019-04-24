import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import nodes from './../nodes'
import DropDown from './../Dropdown'
import Title from './title'

const styles = {width: '360px'}

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

function SelectFileArea(p) {
  return (<div style={{cursor: 'pointer'}} className={`file-upload ${p.fileSelected ? 'file-upload--selected' : ''}`}>
    <div className="file-upload__icon icon-file-upload" style={{alignItems: 'center'}}></div>
    <span className="file-upload__text">{p.fileSelected ? 'file selected' : 'Select File to be hashed'}</span>
    <span className="file-upload__text-filename">{p.fileSelected ? 'mySample.doc' : ''}</span>
  </div>)
}

class SelectFile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let everythingIsOk = (this.props.hashValue!='')
    let title = 'Select your file'
    let validText = false
    if(everythingIsOk === true) {
      title = 'File Selected'
       validText = true
    }
    return(<div>

      <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
        <Title value={title} valid={validText} />
      </div>

      <div style={{ width: '100%', position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
        <SelectFileArea fileSelected={this.props.hashValue} />
        <input style={{ height: '100%', fontSize:'100px', opacity: '0', position: 'absolute', left: '0', top: '0' }}
               type="file"
               id="input"
               onChange={this.props.handleFileSet}
        />
      </div>
      {/*<div className="button-container button-container__center">
        <DropDown
          nodes={nodes}
          onProviderSelected={this.props.onProviderSelected}
          styles={styles}
          provider={this.props.provider}
        />
      </div>*/}
         <div style={{display: 'block', marginTop: '30px'}}>
           <div><span className="text text--level2">Calculated Hash Value:</span></div>
           <div>{this.props.hashValue}</div>
         </div>
      </div>)
  }
}


export default SelectFile
