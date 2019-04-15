import React, { Component } from 'react';
import { verify, hash, publish } from 'iota-proof-tool'
import nodes from './../nodes'
import DropDown from './../Dropdown'

const styles = {width: '360px'}

function getProviderParams(isMainnet) {
  return isMainnet ? {depth :3, minWeightMagnitude :14} : {depth :3, minWeightMagnitude :9}
}

class GeneralParams extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let everythingIsOk = (this.props.hashValue!='' && this.props.provider!='')
    let title = 'Please fill the form'
    let text = `Please select the Provider and the file that you want to Hash for Tangle validation`
    let cssClass = 'message-box__info'
    if(everythingIsOk === true) {
      cssClass = 'message-box__success'
      title = 'Form filled'
      text = `You can continue to the next screen`
    }
    return(<div>

      <div style={{ margin: '30px 0'}} className="button-container button-container__center">
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
      <div className="button-container button-container__center">
        <input className="button button--secondary"
               type="file"
               id="input"
               onChange={this.props.handleFileSet}
        />
      </div>
      <div className="button-container button-container__center">
        <DropDown
          nodes={nodes}
          onProviderSelected={this.props.onProviderSelected}
          styles={styles}
        />
      </div>
      <div className="button-container button-container__center">
         <div style={{display: 'block'}}>
           <div><span className="text text--level2">Calculated Hash Value:</span></div>
           <div>{this.props.hashValue}</div>
         </div>
      </div>
      </div>)
  }
}


export default GeneralParams
