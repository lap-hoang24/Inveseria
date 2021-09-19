import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function List({ watchlist }) {
   const [randomNumber, setRandomNumber] = useState(0);
   
   useEffect(() => {
      let interval = setInterval(() => {
         let randomNum = Math.floor(Math.random() * 99);
         setRandomNumber(randomNum);
      }, 1500)

      return () => {
         clearInterval(interval);
      }
   }, [])

   return (
      <div id="list-wrapper">
         {watchlist.map(stock => {
            let open = (stock.intraday[randomNumber].open).toFixed(1);
            let low = (stock.intraday[randomNumber].low).toFixed(1);
            let percent = (((open - low) / low) * 100).toFixed(2);
            percent <= 0 ? percent = -(Math.random()).toFixed(2) : percent = percent;
            let color = percent > 0 ? 'green' : 'red';

            return (
               <Link to={`/viewstock/${stock.ticker}`} key={stock._id} className="stock-info">
                  <div className="ticker-logo-wrapper">
                     <img className="logo" src={stock.logo} alt="" />
                     <div className="ticker">{stock.ticker}</div>
                  </div>
                  <div className="price-percent-wrapper">
                     <div className="price">$ {open}</div>
                     <div className={`${color} percent`}>{percent} %</div>
                  </div>
               </Link>
            )
         })}
      </div>
   )
}

export default List
