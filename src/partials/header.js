import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const navMap = new Map();
navMap.set('/', { curP: '/', pageTitle: '1- Please choose your file and the Tangle to connect to', prev: null, next: '/sign'})
      .set('/sign', {curP: '/sign', pageTitle: '2- Sign Document (Optional if you have already signed a document)', prev: '/', next: '/verif'})
      .set('/verif', {curP: '/verif', pageTitle: '3- Verify Document', prev: '/sign', next: null})

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
      <section className="sub-header__wrapper">
        <img style={{ position: 'absolute', top: '25px', left: '30px' }} src="assets/Logo.svg" />
        <div className="sub-header">
            <span className="sub-header__title">{currScrData.pageTitle}</span>
            <section className="sub-header__body">
                <Link to={`${currScrData.prev ? currScrData.prev : currScrData.curP}`}>
                  {(currScrData.curP !== '/') && <button
                    onClick={e => this.changeLocation(0)}
                    disabled={!currScrData.prev ? true: false}
                    className={`arrow-button arrow-button--left`}
                  />}
                </Link>
                <span className="sub-header__bottom-title">{currScrData.pageTitle}</span>
                <Link  to={`${currScrData.next ? currScrData.next : currScrData.curP}`}>
                  <button
                    onClick={e => this.changeLocation(1)}
                    disabled={!currScrData.next ? true: false}
                    className="arrow-button arrow-button--right"
                  />
                </Link>
            </section>
        </div>
      </section>
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
