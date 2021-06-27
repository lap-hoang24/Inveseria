import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Search from '../component/Search';


function Navbar() {
   return (
      <div id="nav-bar">
         <Link to="/" className="nav-link"><i className="fas fa-dice-five"></i></Link>
         <Link to="/watchlist" className="nav-link"><i className="fas fa-star"></i></Link>
         <Search />
         <Link to="/login" className="nav-link"><i className="fas fa-bars"></i></Link>
      </div>
   )
}

export default Navbar;
