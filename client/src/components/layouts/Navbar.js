import React from 'react'
import Search from '../pages/Home/Search';

function Navbar() {
   return (
      <div id="nav-bar">
         <a href="/" className="nav-link"><i className="fas fa-dice-five"></i></a>
         <a href="/watchlist" className="nav-link"><i className="fas fa-star"></i></a>
         <Search />
         <a href="/login" className="nav-link"><i className="fas fa-bars"></i></a>
      </div>
   )
}

export default Navbar;
