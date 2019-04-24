import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { navMap } from './defaults'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const currScrData = navMap.get(this.props.currPath)
    const keys = Array.from(navMap.keys())

    return (<div>
      <header className="sticky-header">
        <img className="sticky-header__brand" src="assets/Logo.svg" />
        <div className="sticky-header__control" style={{ justifyContent: 'center'}}>
          <h1 className="text" style={{  color: 'white', marginBottom: 0 }}>{currScrData.pageTitle}</h1>
        </div>
      </header>
      <div className="step-progress-bar">
        {keys.map((key, indx) => (
          <div
            key={key}
            className={`step-progress-bar-item ${indx <= currScrData.pageN ? 'step-progress-bar-item--visited' : ''}`}
          />
        ))}
      </div>
  </div>)
  }
}

export default Header
