import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';

function Watchlist(props) {
   sessionStorage.setItem('lastPath', "/watchlist");
   const [watchlist, setWatchlist] = useState(false);
   const [randomNum, setRandomNum] = useState();

   useEffect(() => {
      const userId = props.cookies.get('id');

      axios.get('/stockApi/getWatchlist?userId=' + userId)
         .then(response => {
            setWatchlist(response.data);
            console.log(response.data)
            setInterval(() => {
               let randomNumber = Math.floor(Math.random() * 99);
               setRandomNum(randomNumber);
            }, 1500)
         })
         .catch(err => console.error(err));
   }, [])



   if (watchlist) {
      return (
         <div id="watchlist">
            <div className="heading">Your Watchlist</div>


            <div id="list-wrapper">
               {watchlist.map(stock => {
                  return (
                     <a href={`/viewstock/${stock.ticker}`} key={stock._id} className="stock-info">
                        <div className="ticker-logo-wrapper">
                           <img className="logo" src={stock.logo} alt="" />
                           <div className="ticker">{stock.ticker}</div>
                        </div>
                        <div className="price-percent-wrapper">
                           <div>$ {randomNum ? stock.intraday[randomNum].open : '0'}</div>
                           <div>{randomNum ? (((stock.intraday[randomNum].open - stock.intraday[randomNum].low) / stock.intraday[randomNum].low) * 100).toFixed(2) : '0.00'} %</div>
                        </div>
                     </a>
                  )
               })}
            </div>

            <Navbar />
         </div>
      )
   } else {
      return (<div className="loading">Loading...</div>)
   }
}

export default withCookies(Watchlist);


