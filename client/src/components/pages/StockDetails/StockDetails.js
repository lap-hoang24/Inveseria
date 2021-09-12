import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, withRouter, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
// import { paintLineChart } from './LineChart';
import Favorite from '../../add-ons/Favorite';
import BuyButton from './BuyButton';
import SellButton from './SellButton';
import Loading from '../../add-ons/Loading';
import Chart from './Chart';
import News from '../../add-ons/News';
import { finnhubToken } from '../../../keys';




function StockDetails(props) {
   const lastPath = localStorage.getItem('lastPath');
   const { ticker } = useParams();
   const [state, setState] = useState({})
   const [randomNumber, setRandomNumber] = useState(0);
   let randomNum = 0;
   const stockNews = `https://finnhub.io/api/v1/company-news?symbol=${ticker}`;

   useEffect(() => {
      const userId = props.cookies.get('id');
      const stockIntraday = axios.get('/stockApi/getIntraday/' + ticker);
      const userPos = axios.post('/stockApi/getUserPosition/', { ticker, userId });

      // GET STOCK RECOMMENDATION TREND
      // axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=c32dffiad3ieculvh350`)
      // .then(res => { res.data.length = 6; console.log(res); })
      // .catch(err => { console.error(err) })

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

            setState({ tickerInfo, tickerIntra, userPosition, userCash, userId, inWatchlist });
         }).catch(err => console.error(err))

      const interval = setInterval(() => {
         randomNum = Math.floor((Math.random() * 50));
         setRandomNumber(randomNum)
      }, 1500)




      return () => {
         clearInterval(interval);
      }
   }, [])

   const { history } = props;
   const { tickerInfo, tickerIntra, userPosition, userCash, userId, inWatchlist } = state;

   if (tickerIntra && userPosition) {
      let open = (tickerIntra[randomNumber].open).toFixed(1);
      let close = (tickerIntra[randomNumber].low).toFixed(1);
      let percent = (((open - close) / close) * 100).toFixed(2);
      percent <= 0 ? percent = -(Math.random()).toFixed(2) : percent = percent;
      let symbol = tickerInfo.ticker;
      let color = percent > 0 ? 'green' : 'red';
      let indicator = percent > 0 ? <i className="fas fa-sort-up green"></i> : <i className="fas fa-sort-down red "></i>;
      let shareString = userPosition.numOfShares > 1 ? 'shares' : 'share';

      // ========================RETURN=============================
      return (
         <div id="stock-details">
            <div className="top-wrapper">
               <Link to={lastPath} className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></Link>
               <div className="ticker">{symbol}</div>
               <Favorite ticker={symbol} userId={userId} inWatchlist={inWatchlist} />
            </div>

            <div className="price_btn-wrapper">
               <div className="price-percent-wrapper">
                  <div className='price'>$ {open}</div>
                  <div className="percent_indicator-wrapper">
                     <div className={`${color} percent`}>{percent}%</div>
                     <div className="indicator">{indicator}</div>
                  </div>
               </div>

               <div className="btn-wrapper">
                  <BuyButton open={open} symbol={symbol} userCash={userCash} tickerInfo={tickerInfo} userId={userId} history={history} percent={percent} />
                  <SellButton open={open} symbol={symbol} userPosition={userPosition} tickerInfo={tickerInfo} userId={userId} history={history} percent={percent} />
               </div>
            </div>

            <div className="user-position">
               <div>Your Position: {userPosition.numOfShares ? userPosition.numOfShares : '0'} {shareString}</div>
               <div>Avg Price: $ {userPosition.avgPrice ? userPosition.avgPrice.toFixed(2) : '0'}</div>
            </div>

            <Chart tickerIntra={tickerIntra} ticker={tickerInfo.ticker} />

            <News token={finnhubToken} type={stockNews} period={getCurrent3DayPeriod()} heading={`News related to ${ticker}`} />
         </div>
      )
   } else {
      return <Loading />
   }
}
export default withCookies(withRouter(StockDetails));

const getCurrent3DayPeriod = () => {
   let today = new Date().getTime();
   let threeDaysMillisec = 1000 * 3600 * 24 * 3;
   let threeDaysEarlier = new Date(new Date().getTime() - threeDaysMillisec).toLocaleDateString().split('/');

   return `&from${threeDaysEarlier[2]}-${threeDaysEarlier[0]}-${threeDaysEarlier[1]}&to${today[2]}-${today[0]}-${today[1]}`;
}
