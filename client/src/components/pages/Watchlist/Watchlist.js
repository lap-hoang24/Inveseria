import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { withCookies } from 'react-cookie';
import List from './List';
import Loading from '../../add-ons/Loading';
import News from '../../add-ons/News';
import { finnhubToken } from '../../../keys';



function Watchlist({ cookies }) {
   localStorage.setItem('lastPath', "/watchlist");
   const [watchlist, setWatchlist] = useState(false);
   const generalMarketNews = 'https://finnhub.io/api/v1/news?category=general';
   const newsPeriod = '';

   useEffect(() => {
      const userId = cookies.get('id');
      axios.get(process.env.REACT_APP_API_URL + '/stockApi/getWatchlist?userId=' + userId)
         .then(response => {
            setWatchlist(response.data);
         })
         .catch(err => console.error(err));
   }, [])

   if (watchlist) {
      return (
         <div id="watchlist">
            <div className="heading">Your Watchlist</div>
            <List watchlist={watchlist} />
            <News token={finnhubToken} type={generalMarketNews} period={newsPeriod} heading={"Market News"} />
         </div>
      )
   } else {
      return <Loading />
   }
}

export default withCookies(Watchlist);


