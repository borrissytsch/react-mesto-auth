import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../images/header/logo.svg';
// import './App.css';

function Header({routeLink, loggedIn, signCaption, ...headerFields}) {
  return (
    <header  className="header">
      <img src={logo} className="header__logo" alt="Лого Место" />
      <div className="header__signs">
        {headerFields.children}
        <NavLink to={routeLink} className={loggedIn ? "header__exit" : "header__link"}>{signCaption}</NavLink>
      </div>
    </header>
  );
}

export default Header;