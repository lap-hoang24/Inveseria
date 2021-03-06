import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Favorite from '../../global/Favorite';
import Loading from '../../global/Loading';
import PricePercentButtons from './PricePercentButtons';
import Chart from './Chart';
import Financials from './Financials';
import News from '../../global/News';
import { finnhubToken } from '../../../keys';
import authAxios from '../../api/axiosAuth';


function StockDetails(props) {
   const lastPath = localStorage.getItem('lastPath');
   const { ticker } = useParams();
   const [state, setState] = useState({})
   const stockNews = `https://finnhub.io/api/v1/company-news?symbol=${ticker}`;

   useEffect(() => {
      const stockIntraday = authAxios.get('/stockApi/getIntraday/' + ticker);
      const userPos = authAxios.post('/stockApi/getUserPosition/', { ticker });

      Promise.all([stockIntraday, userPos])
         .then(values => {
            const tickerIntra = [...values[0].data.intraday];
            const tickerInfo = {
               ticker: values[0].data.ticker,
               logo: values[0].data.logo,
               companyName: values[0].data.companyName,
            };
            const userPosition = values[1].data._doc;
            const userCash = values[1].data.userCash;
            const inWatchlist = values[1].data.watchlist.includes(ticker) ? true : false;

            setState({ tickerInfo, tickerIntra, userPosition, userCash, inWatchlist });
         })
         .catch(err => console.error(err))
   }, [])


   const { tickerInfo, tickerIntra, userPosition, userCash, inWatchlist } = state;

   if (tickerIntra && userPosition) {
      let symbol = tickerInfo.ticker;
      let shareString = userPosition.numOfShares > 1 ? 'shares' : 'share';

      // ========================RETURN=============================
      return (
         <div id="stock-details">
            <div className="top-wrapper">
               <a href={lastPath} className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></a>
               <div className="ticker">{symbol}</div>
               <Favorite ticker={symbol} inWatchlist={inWatchlist} />
            </div>
            <PricePercentButtons intraday={tickerIntra} symbol={symbol} userCash={userCash} tickerInfo={tickerInfo} userPosition={userPosition} />

            <div className="user-position">
               <div>Your Position: {userPosition.numOfShares ? userPosition.numOfShares : '0'} {shareString}</div>
               <div>Average Price: $ {userPosition.avgPrice ? userPosition.avgPrice.toFixed(2) : '0'}</div>
            </div>
            <Chart tickerIntra={tickerIntra} ticker={tickerInfo.ticker} />
            <Financials ticker={tickerInfo.ticker} />
            <News token={finnhubToken} type={stockNews} period={getCurrent3DayPeriod()} heading={`News related to ${ticker}`} />
         </div>
      )
   } else {
      return <Loading />
   }
}
export default withCookies(StockDetails);

const getCurrent3DayPeriod = () => {
   let today = new Date(new Date().getTime()).toLocaleDateString().split('/');
   let threeDaysMillisec = 1000 * 3600 * 24 * 3;
   let threeDaysEarlier = new Date(new Date().getTime() - threeDaysMillisec).toLocaleDateString().split('/');
   return `&from${threeDaysEarlier[2]}-${threeDaysEarlier[0]}-${threeDaysEarlier[1]}&to${today[2]}-${today[0]}-${today[1]}`;
}
