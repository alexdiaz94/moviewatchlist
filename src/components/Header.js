import React from 'react';
import { Link } from 'react-router';
import logo from '../logo.svg';

const Header = () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to Movie WatchList</h2>
    <ul>
      <li>
        <Link
          to="/"
          activeOnlyWhenExact
          activeClassName="active"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/movie"
          activeOnlyWhenExact
          activeClassName="active"
        >
          Create Movie List
        </Link>
      </li>
      <li>
        <Link
          to="/Contact"
          activeOnlyWhenExact
          activeClassName="active"
        >
          Contact
        </Link>
      </li>
    </ul>
  </div>
);

export default Header;
