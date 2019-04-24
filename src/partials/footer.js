import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { navMap } from './defaults'

class Footer extends Component {
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
      return (<div style={{ margin: '30px 0'}}>
      <div className="button-container" style={{ justifyContent: 'space-between', position: 'fixed', bottom: '0px', padding: '53px' }}>

        <Link to={`${currScrData.prev ? currScrData.prev : currScrData.curP}`}>
          <button
            className="button button--secondary"
            onClick={e => this.changeLocation(0)}
            disabled={!currScrData.prev ? true: false}
          >
           Go Back
          </button>
        </Link>

        <Link  to={`${currScrData.next ? currScrData.next : currScrData.curP}`}>
          <button
            className="button"
            disabled={!currScrData.next ? true: false}
            onClick={e => this.changeLocation(1)}
          >
            Continue
          </button>
        </Link>

      </div>

      </div>)
    }
}



export default Footer
