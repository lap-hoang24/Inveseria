import React from 'react'

function Navbar() {
   return (
      <div id="nav-bar">
         <a href="/" className="nav-link"><i className="fas fa-2x fa-dice-five"></i></a>
         <a href="/watchlist" className="nav-link"><i className="fab fa-2x fa-atlassian"></i></a>
         <a href="/transations" className="nav-link"><i className="fas fa-2x fa-file-alt"></i></a>
         <a href="/login" className="nav-link"><i className="fas fa-2x fa-bars"></i></a>
      </div>
   )
}

export default Navbar;
