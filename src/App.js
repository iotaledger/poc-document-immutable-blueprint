import React, { Component } from 'react';
import { verify } from 'signature-validation-tool'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      transactionHash: ''
    }
    this.handleFileSet = this.handleFileSet.bind(this)
    this.verify = this.verify.bind(this)
    this.reset = this.reset.bind(this)
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
  }
  handleInputTextChange(e) {
    this.setState({
      transactionHash: e.target.value
    })
  }
  verify(e) {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
       verify(
              this.state.transactionHash,
              true,
              reader.result,
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
            <input className="button button--secondary"
                   type="text"
                   id="input"
                   value={this.state.transactionHash}
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
