import React, { Component } from 'react';

class DropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      default: props.nodes[0].nodeId,
      selected: ''
    }
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.expand = this.expand.bind(this)
  }
  expand(e) {
    this.setState({expand: true})
  }
  handleInputTextChange(e, node, isMainnet) {
    e.stopPropagation()
    this.setState({
      selected: node,
      expand: false
    })
    this.props.onProviderSelected(node, isMainnet)
  }

  render() {
    return (
      <div style={this.props.styles} className={`drop-selector ${this.state.expand? 'drop-selector__expanded' : ''}`} onClick={this.expand}>
          <div className="drop-selector-title">
              <div className="drop-selector-title__text">{this.props.provider || 'Select a Node'}</div>
              <div className="drop-selector-title__icon"></div>
          </div>
          <ul className="drop-selector-list">
              {this.props.nodes.map(node => {
                return (<li key={node.nodeId} className={`drop-selector-list-item ${this.state.selected === node.nodeId? 'drop-selector-list-item__selected' : ''}`}>
                          <a href="#" onClick={e => this.handleInputTextChange(e, node.nodeId, node.isMainnet)}>
                              {node.nodeId}
                          </a>
                      </li>)
              })}
          </ul>
      </div>
    );
  }
}




export default DropDown
