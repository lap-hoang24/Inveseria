import React, { useState, useEffect } from 'react'
import authAxios from '../../api/axiosAuth';
import { withCookies } from 'react-cookie';
import List from './List';
import PortfolioWatchlistEmpty from '../../global/PortfolioWatchlistEmpty';
import Loading from '../../global/Loading';
import News from '../../global/News';
import { finnhubToken } from '../../../keys';

function Watchlist({ cookies }) {
   localStorage.setItem('lastPath', "/watchlist");
   const [watchlist, setWatchlist] = useState([]);
   const generalMarketNews = 'https://finnhub.io/api/v1/news?category=general';
   const newsPeriod = '';

   useEffect(() => {
      
      authAxios.get('/stockApi/getWatchlist')
         .then(response => {
            setWatchlist(response.data);
         })
         .catch(err => console.error(err));
   }, [])

   if (watchlist) {
      return (
         <div id="watchlist">
            <div className="heading">Your Watchlist</div>
            {watchlist.length > 0 ? <List watchlist={watchlist} /> : <PortfolioWatchlistEmpty component={'Watchlist'} />}
            <News token={finnhubToken} type={generalMarketNews} period={newsPeriod} heading={"Market News"} />
         </div>
      )
   } else {
      return <Loading />
   }
}

export default withCookies(Watchlist);


