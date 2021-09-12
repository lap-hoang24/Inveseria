import React from 'react'
import { Link } from 'react-router-dom';
import Search from '../add-ons/Search';


function Navbar() {
   return (
      <nav id="nav-bar">
         <Link to="/" className="nav-link"><i className="fas fa-dice-five"></i></Link>
         <Link to="/watchlist" className="nav-link"><i className="fas fa-star"></i></Link>
         <Search />
         <Link to="/login" className="nav-link"><i className="fas fa-bars"></i></Link>
      </nav>
   )
}

export default Navbar;
