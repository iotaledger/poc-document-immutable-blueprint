import React from 'react';

function Title(props) {
  return (<span
      style={{ color: props.valid ? '#019792' : '#603f98', ...props.style }}
      className="text instruction-title">
      {props.value}
    </span>)
}

export default Title
