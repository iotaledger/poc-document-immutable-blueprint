import React, { Component } from 'react';


function Title(props) {
  return (<span
      style={{ fontSize: '64px', color: '#019792' }}
      className="text">
      {props.value}
    </span>)
}


export default Title
