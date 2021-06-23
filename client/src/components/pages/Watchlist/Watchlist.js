import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Loading from '../../component/Loading';

function Watchlist({ cookies }) {
   localStorage.setItem('lastPath', "/watchlist");
   const [watchlist, setWatchlist] = useState(false);
   const [randomNum, setRandomNum] = useState(10);

   useEffect(() => {
      const userId = cookies.get('id');
      let interval;
      axios.get('/stockApi/getWatchlist?userId=' + userId)
         .then(response => {
            setWatchlist(response.data);
            interval = setInterval(() => {
               let randomNumber = Math.floor(Math.random() * 99);
               setRandomNum(randomNumber);
            }, 1500)
         })
         .catch(err => console.error(err));

      return () => {
         clearInterval(interval);
      }
   }, [])

   if (watchlist) {
      return (
         <div id="watchlist">
            <div className="heading">Your Watchlist</div>
            <div id="list-wrapper">
               {watchlist.map(stock => {
                  return (
                     <Link to={`/viewstock/${stock.ticker}`} key={stock._id} className="stock-info">
                        <div className="ticker-logo-wrapper">
                           <img className="logo" src={stock.logo} alt="" />
                           <div className="ticker">{stock.ticker}</div>
                        </div>
                        <div className="price-percent-wrapper">
                           <div className="price">$ {randomNum ? stock.intraday[randomNum].open : '0'}</div>
                           <div className="percent">{randomNum ? (((stock.intraday[randomNum].open - stock.intraday[randomNum].low) / stock.intraday[randomNum].low) * 100).toFixed(2) : '0.00'} %</div>
                        </div>
                     </Link>
                  )
               })}
            </div>
         </div>
      )
   } else {
      return <Loading />
   }
}

export default withCookies(Watchlist);


