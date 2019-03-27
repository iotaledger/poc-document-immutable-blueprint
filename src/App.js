import React, { Component } from 'react';
import { verify } from 'signature-validation-tool'
import nodes from './nodes'
import DropDown from './Dropdown'
//IFWT9BLRWACAJHCMTBKDPYRDAWUQSYVIPTLQSRKJJ9XCIPVXTZSNSABBRWEQDVOGIVHFLXZGI9XSA9999
//MRDVKCDQAPYQOJEQTUWDMNYZKDUDBRNHJWV9VTKTCUUYQICLPFBETMYYVKEPFCXZE9EJZHFUWJZVEWUCWSGDUVMOYD

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      transactionHash: '',
      provider: '',
      address: ''
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
              (verified) => console.log(verified)
             )
    });
    reader.readAsArrayBuffer(this.state.file);
  }
  reset(e) {

  }
  handleFileSet(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  render() {
    return (
      <div className="layouts--search">
         <div className="middle-column">
          <div className="button-container button-container__center">
            <input className="button button--secondary"
                   type="file"
                   id="input"
                   onChange={this.handleFileSet}
            />
          </div>
          <div className="button-container button-container__center">
            <DropDown nodes={nodes} onProviderSelected={this.onProviderSelected}/>
          </div>
          <div className="button-container button-container__center">
            <input className="button button--secondary"
                   type="text"
                   id="input"
                   name="txhash"
                   placeholder="TX Hash"
                   value={this.state.transactionHash}
                   onChange={this.handleInputTextChange}
            />
            <input className="button button--secondary"
                   type="text"
                   id="input"
                   name="address"
                   placeholder="Channel Address"
                   value={this.state.address}
                   onChange={this.handleInputTextChange}
            />
          </div>
           <div className="button-container button-container__center">
            <button className="button" onClick={this.verify}>Verify</button>
            <button className="button" onClick={this.reset}>Reset</button>
           </div>
         </div>
       </div>
    );
  }
}

export default App;
