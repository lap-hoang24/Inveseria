import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import { paintLineChart } from './LineChart';
import Favorite from '../../component/Favorite';
import BuyButton from './BuyButton';
import SellButton from './SellButton';


function StockDetails(props) {
   const lastPath = sessionStorage.getItem('lastPath');
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
            console.log(values);
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

      setInterval(() => {
         randomNum = Math.floor((Math.random() * 50));
         setRandomNumber(randomNum)
      }, 1500)
   }, [])

   const {history} = props;
   const { tickerInfo, tickerIntra, userPosition, userCash, userId, inWatchlist } = state;

   if (tickerIntra && userPosition) {
      let percent = String(((tickerIntra[randomNumber].open.toFixed(1) - tickerIntra[randomNumber].low.toFixed(1)) / tickerIntra[randomNumber].close) * 100).slice(0, 4);
      let symbol = tickerIntra[randomNumber].symbol;
      let open = tickerIntra[randomNumber].open;

      // ========================RETURN=============================
      return (
         <div id="stock-details">
            <div className="top-wrapper">
               <a href={lastPath} className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></a>
               <div className="ticker">{symbol}</div>
               <Favorite ticker={symbol} userId={userId} inWatchlist={inWatchlist} />
            </div>

            <div className="price-buy-btn-wrapper">
               <div className="price-percent-wrapper">
                  <div className='price'>$ {open}</div>
                  <div className="percent">{percent}%</div>
               </div>

               <div className="btn-wrapper">
                  <BuyButton open={open} symbol={symbol} userCash={userCash} tickerInfo={tickerInfo} userId={userId} history={history} />
                  <SellButton open={open} symbol={symbol} userPosition={userPosition} tickerInfo={tickerInfo} userId={userId} history={history} />
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

            <Navbar />
         </div>
      )
   } else {
      return (<div className="loading">LOADING...</div>)
   }
}
export default withCookies(StockDetails)
