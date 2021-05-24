import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Navbar from '../../layouts/Navbar';

function StockDetails() {
   const { ticker } = useParams();
   const [tickerInfo, setTickerInfo] = useState({})
   const [buyPrice, setBuyPrice] = useState(0);

   useEffect(() => {
      axios.get('/stockApi/getIntraday/' + ticker)
         .then(response => {
            console.log(response.data)
            setTickerInfo(response.data)
         })
         .catch(err => { console.error(err) })
   }, [ticker])


   useEffect(() => {
      console.log(buyPrice)

      if (buyPrice !== 0) {

         // axios.post()
      }
   }, [buyPrice])








   let percent = tickerInfo.intraday && String(((tickerInfo.intraday[8].last - tickerInfo.intraday[8].close) / tickerInfo.intraday[8].close) * 100).slice(0, 4);

   return (
      <div id="stock-details">
         <div className="top-wrapper">
            <div className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></div>
            <div className="ticker">{tickerInfo.ticker}</div>
            <div className="add-favorite-btn"><i className="far fa-star"></i></div>
         </div>

         <div className="price-buy-btn-wrapper">
            <div className="price-percent-wrapper">
               <div className='price'>$ {tickerInfo.intraday && tickerInfo.intraday[8].last}</div>
               <div className="percent">{percent}%</div>
            </div>

            <div className="btn-wrapper">
               <button onClick={() => { setBuyPrice(tickerInfo.intraday[8].last) }} className="buy-btn">BUY</button>
               <button className="sell-btn">SELL</button>
            </div>
         </div>

         <div className="chart">
            <h5>Chart</h5>
            {/* LINE CHART GOES HERE FROM CHART.js */}
         </div>

         <div className="news">
            <h5>News</h5>
         </div>


         <Navbar />
      </div>
   )
}

export default StockDetails
