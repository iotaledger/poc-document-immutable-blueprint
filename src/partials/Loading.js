import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import loading from './../loading.gif'

function Loader(props) {
  return (<div style={{ margin: '30px 0'}} className="button-container button-container__center">
     <div className="button-container button-container__center">
        <img src={loading} />
     </div>
  </div>)
}


export default Loader
