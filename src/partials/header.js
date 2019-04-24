import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { navMap } from './defaults'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currPath: window.location.pathname
    }
    this.changeLocation = this.changeLocation.bind(this)
  }
  changeLocation(forward) {
    const currPath = window.location.pathname
    if(forward) {
      this.setState({ currPath: navMap.get(currPath).next ?  navMap.get(currPath).next : navMap.get(currPath).curP })
    } else {
      this.setState({ currPath: navMap.get(currPath).prev ? navMap.get(currPath).prev : navMap.get(currPath).curP })
    }
  }
  render() {
    const currScrData = navMap.get(this.state.currPath)
    return (<div>
      <header className="sticky-header">
        <img className="sticky-header__brand" src="assets/Logo.svg" />
        <div className="sticky-header__control" style={{ justifyContent: 'center'}}>
          <h1 className="text" style={{  color: 'white', marginBottom: 0 }}>{currScrData.pageTitle}</h1>
        </div>
      </header>
      <div className="step-progress-bar">
        <div className="step-progress-bar-item step-progress-bar-item--visited">
        </div>
        <div className="step-progress-bar-item step-progress-bar-item--visited">
        </div>
        <div className="step-progress-bar-item step-progress-bar-item--visited">
        </div>
        <div className="step-progress-bar-item">
        </div>
      </div>
  </div>)
  }
}

export default Header
