import React, { Component } from 'react';
import Title from './title'

function SelectFileArea(p) {
  return (<div style={{ cursor: 'pointer' }} className={`file-upload ${p.fileSelected ? 'file-upload--selected' : ''}`}>
    <div className="file-upload__icon icon-file-upload" style={{ alignItems: 'center' }}></div>
    <span className="file-upload__text">{p.fileSelected ? 'file selected' : 'Select File to be hashed'}</span>
    <span className="file-upload__text-filename">{p.fileSelected ? p.filename : ''}</span>
  </div>)
}

class SelectFile extends Component {
  render() {
    let everythingIsOk = (this.props.hashValue !== '')
    let title = 'Select Your File'
    let validText = false
    if (everythingIsOk === true) {
      title = 'File Selected'
      validText = true
    }
    return (<div>

      <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center' }}>
        <Title
          value={title}
          valid={validText}
        />
      </div>
      <p>Welcome to this short Demo of our Immutable Document Blueprint!</p>
      <p>Documents are an important means of transporting information and contracts between parties. Being able to reliably prove that a document has not been changed from an established state helps ensure trust between parties. This demo illustrates a solution that automatically checks the signature of a previously signed document using the IOTA Tangle.</p>

      <div style={{ width: '100%', position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
        <SelectFileArea fileSelected={this.props.hashValue} {...this.props} />
        <input style={{ height: '100%', fontSize: '100px', opacity: '0', position: 'absolute', left: '0', top: '0' }}
          type="file"
          id="input"
          onChange={this.props.handleFileSet}
        />
      </div>
      <div style={{ display: 'block', marginTop: '30px' }}>
        <div><span className="text text--level2">Calculated Hash Value:</span></div>
        <div>{this.props.hashValue}</div>
      </div>
    </div>)
  }
}


export default SelectFile
