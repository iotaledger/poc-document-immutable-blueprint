import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const navMap = new Map();
navMap.set('/', {pageTitle: 'General Parameters', prev: null, next: '/sign'})
      .set('/sign', {pageTitle: 'Sign Document (Optional if you have already signed a document)', prev: '/', next: '/verif'})
      .set('/verif', {pageTitle: 'Verify Document', prev: '/sign', next: null})

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
      this.setState({ currPath: navMap.get(currPath).next })
    } else {
      this.setState({ currPath: navMap.get(currPath).prev })
    }
  }
  render() {
    const currScrData = navMap.get(this.state.currPath)
    return (<section className="sub-header__wrapper">
        <div className="sub-header">
            <span className="sub-header__title">{currScrData.pageTitle}</span>
            <section className="sub-header__body">
                <Link to={currScrData.prev}><button onClick={e => this.changeLocation(0)} className="arrow-button arrow-button--left"></button></Link>
                <span className="sub-header__bottom-title">{currScrData.pageTitle}</span>
                <Link to={currScrData.next}><button onClick={e => this.changeLocation(1)} className="arrow-button arrow-button--right"></button></Link>
            </section>
        </div>
      </section>)
  }
}

export default Header
