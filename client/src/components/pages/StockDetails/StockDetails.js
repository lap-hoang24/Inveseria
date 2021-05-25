import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../store/actions/authActions';
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';

function StockDetails(props) {

   const { ticker } = useParams();
   const [tickerInfo, setTickerInfo] = useState({})
   const [buyPrice, setBuyPrice] = useState(0);
   const [numOfShares, setNumOfShares] = useState(0);


   useEffect(() => {
      axios.get('/stockApi/getIntraday/' + ticker)
         .then(response => { setTickerInfo(response.data) })
         .catch(err => { console.error(err) })
   }, [ticker])


   useEffect(() => {
      if (buyPrice !== 0 && numOfShares !== 0) {

         const params = {
            price: buyPrice,
            numOfShares: numOfShares,
            tickerInfo,
            userId: props.cookies.get('id')
         }

         axios.post('/stockApi/buyStock', params)
            .then(response => { console.log(response) })
            .catch(err => console.error(err))
      }
      document.getElementById('numOfShares').value = "";
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
               <a href="#buy-sell-modal" className="buy-btn modal-trigger">BUY</a>
               <button className="sell-btn">SELL</button>

               <div id="buy-sell-modal" className="modal">
                  <div className="modal-content">
                     <div className="ticker">{tickerInfo.ticker}</div>
                     <div className="price">{tickerInfo.intraday && tickerInfo.intraday[8].last}</div>
                  </div>
                  <p>Please enter number of shares</p>
                  <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" />
                  <button onClick={() => { setBuyPrice(tickerInfo.intraday[8].last) }} className="buy-btn">BUY</button>
               </div>
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

const mapStateToProps = (state, ownProps) => {
   return {
      userInfo: state.userReducer.user,
      cookies: ownProps.cookies
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getUserInfo: (id) => { dispatch(getUserInfo(id)) },
   }
}


export default withCookies(connect(mapStateToProps, mapDispatchToProps)(StockDetails))
