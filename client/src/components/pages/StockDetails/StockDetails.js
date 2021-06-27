import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, withRouter, Link } from "react-router-dom";
import { withCookies } from 'react-cookie';
import { paintLineChart } from './LineChart';
import Favorite from '../../component/Favorite';
import BuyButton from './BuyButton';
import SellButton from './SellButton';
import Loading from '../../component/Loading';


function StockDetails(props) {
   const lastPath = localStorage.getItem('lastPath');
   const { ticker } = useParams();
   const [state, setState] = useState({})
   const [randomNumber, setRandomNumber] = useState(0);
   let randomNum = 0;

   useEffect(() => {
      const userId = props.cookies.get('id');
      const stockIntraday = axios.get('/stockApi/getIntraday/' + ticker);
      const userPos = axios.post('/stockApi/getUserPosition/', { ticker, userId });

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

            // let dataSet = tickerIntra.map(intraday => {
            //    return {
            //       time: intraday.date.slice(0, 10),
            //       value: intraday.open
            //    }
            // })
            paintLineChart([
               { time: '2019-04-11', value: 80.01 },
               { time: '2019-04-12', value: 96.63 },
               { time: '2019-04-13', value: 76.64 },
               { time: '2019-04-14', value: 81.89 },
               { time: '2019-04-15', value: 74.43 },
               { time: '2019-04-16', value: 80.01 },
               { time: '2019-04-17', value: 96.63 },
               { time: '2019-04-18', value: 76.64 },
               { time: '2019-04-19', value: 81.89 },
               { time: '2019-04-20', value: 74.43 },
            ])

            // disable Sell button if user doesnt have any share
            const sellBtn = document.getElementById('sell-btn-disable');
            if (userPosition.noPosition || userPosition.numOfShares === 0) {
               sellBtn.disabled = true;
               sellBtn.style.backgroundColor = 'grey';
            }
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
      let symbol = tickerIntra[randomNumber].symbol;
      let color = percent > 0 ? 'green' : 'red';
      let indicator = percent > 0 ? <i className="fas fa-sort-up green"></i> : <i className="fas fa-sort-down red "></i>;

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

            {/* UserStock Component */}
            <div className="user-position">
               <div>Your Position: {userPosition.numOfShares ? userPosition.numOfShares : '0'} share(s)</div>
               <div>Avg Price: $ {userPosition.avgPrice ? userPosition.avgPrice.toFixed(2) : '0'}</div>
            </div>

            <div className="chart" id='line-chart'>
               <h5>Chart</h5>
               {/* LINE CHART GOES HERE FROM CHART.js */}
            </div>

            <div className="news">
               <h5>News</h5>
            </div>
         </div>
      )
   } else {
      return <Loading />
   }
}
export default withCookies(withRouter(StockDetails));
