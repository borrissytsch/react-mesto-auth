import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {LoggedInContext} from '../contexts/LoggedInContext.js';
import logo from './../images/header/logo.svg';
// import './App.css';

function Header({routeLink, signCaption, startApp, ...headerFields}) {
  const loggedIn = useContext(LoggedInContext);
  return (
    <header  className="header">
      <img src={logo} className="header__logo" alt="Лого Место" />
      <div className="header__signs">
        {headerFields.children}
        <NavLink to={routeLink} className={loggedIn ? "header__exit" : "header__link"} onClick={handleLinkClick}>{signCaption}</NavLink>
      </div>
    </header>
  );

  function handleLinkClick (evt) {
    if (loggedIn) {
      localStorage.removeItem('token');
      startApp(false);
    }
  }
}

export default Header;