import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
      const routeTriggerCallback = (e) => this.props.triggerRouteChange(this.state)
      if(forward) {
        this.setState({
                        currPath: navMap.get(currPath).next ?
                        navMap.get(currPath).next :
                        navMap.get(currPath).curP }, routeTriggerCallback)
      } else {
        this.setState({
                        currPath: navMap.get(currPath).prev ?
                        navMap.get(currPath).prev :
                        navMap.get(currPath).curP }, routeTriggerCallback)
      }
    }

    render() {
      const currScrData = navMap.get(this.state.currPath)
      return (<div style={{ margin: '30px 0'}}>
      <div className="button-container">

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
