import React, { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Loading from '../../component/Loading';
import News from '../../component/News';



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
                  let open = (stock.intraday[randomNum].open).toFixed(1);
                  let low = (stock.intraday[randomNum].low).toFixed(1);
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


            <News />
         </div>
      )
   } else {
      return <Loading />
   }
}

export default withCookies(Watchlist);


