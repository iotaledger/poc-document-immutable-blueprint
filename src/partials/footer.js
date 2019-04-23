import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function Footer(props) {
  return (<div style={{ margin: '30px 0'}}>
  <div className="button-container" style={{ justifyContent: 'space-between', position: 'fixed', bottom: '0px', padding: '53px' }}>
    <button className="button button--secondary">Go Back</button>
    <button className="button">Continue</button>
  </div>

  </div>)
}


export default Footer
