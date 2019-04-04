import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header(props) {
  return (<section className="sub-header__wrapper">
      <div className="sub-header">
          <span className="sub-header__title">{props.pageTitle}</span>
          <section className="sub-header__body">
              <Link to="/sign"><button className="arrow-button arrow-button--left"></button></Link>
              <span className="sub-header__bottom-title">{props.pageTitle}</span>
              <Link to="/verif"><button className="arrow-button arrow-button--right"></button></Link>
          </section>
      </div>
    </section>)
}


export default Header
