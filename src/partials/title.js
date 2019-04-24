import React, { Component } from 'react';


function Title(props) {
  return (<span
      style={{ fontSize: '64px', color: props.valid ? '#019792' : '#603f98', ...props.style }}
      className="text">
      {props.value}
    </span>)
}


export default Title
