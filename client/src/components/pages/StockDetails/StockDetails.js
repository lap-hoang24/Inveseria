import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../store/actions/authActions';
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import Modal from '@material-ui/core/Modal'
import { useStyles, modalStyle } from '../../component/Modal';


function StockDetails(props) {

   const { ticker } = useParams();
   const [state, setState] = useState({})
   const [buyPrice, setBuyPrice] = useState(0);
   const [sellPrice, setSellPrice] = useState(0);
   const [numOfShares, setNumOfShares] = useState(0);
   const [buyOpen, setBuyOpen] = useState(false);
   const [sellOpen, setSellOpen] = useState(false);
   const handleBuyOpen = () => { setBuyOpen(true) };
   const handleBuyClose = () => { setBuyOpen(false) };
   const handleSellOpen = () => { setSellOpen(true) };
   const handleSellClose = () => { setSellOpen(false) };


   useEffect(() => {
      const userId = props.cookies.get('id');
      const stockIntraday = axios.get('http://api.marketstack.com/v1/intraday?access_key=75b6f2af2935400d9770adbdadf74a58&symbols=' + ticker);
      // get user stock info for this stock, if null, disable SELL button
      const userPos= axios.post('/stockApi/getUserPosition/', { ticker, userId });

      Promise.all([stockIntraday, userPos])
      .then(values => {
         console.log(values);
         const tickerInfo = [...values[0].data.data];
         const userPosition = values[1].data;
         setState({ tickerInfo, userPosition });
      }).catch(err => console.error(err))
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

         document.getElementById('numOfShares').value = "";
      }
   }, [buyPrice])

   useEffect(() => {
      if (sellPrice !== 0 && numOfShares !== 0) {
         const params = {
            price: sellPrice,
            numOfShares: numOfShares,
            tickerInfo,
            userId: props.cookies.get('id')
         }

         axios.post('/stockApi/sellStock', params)
            .then(response => { console.log(response) })
            .catch(err => console.error(err))

         document.getElementById('numOfShares').value = "";
      }
   }, [sellPrice])

   const { tickerInfo, userPosition } = state;
   const classes = useStyles();
   
   if (tickerInfo && userPosition) {
      let percent = tickerInfo && String(((tickerInfo[20].open - tickerInfo[20].close) / tickerInfo[20].close) * 100).slice(0, 4);
      return (
         <div id="stock-details">
            <div className="top-wrapper">
               <div className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></div>
               <div className="ticker">{tickerInfo[20].symbol}</div>
               <div className="add-favorite-btn"><i className="far fa-star"></i></div>
            </div>

            <div className="price-buy-btn-wrapper">
               <div className="price-percent-wrapper">
                  <div className='price'>$ {tickerInfo && tickerInfo[20].last}</div>
                  <div className="percent">{percent}%</div>
               </div>


               <div className="btn-wrapper">
                  <button type="button" className="buy-btn" data="buy" onClick={handleBuyOpen}>BUY</button>
                  <button type="button" className="sell-btn" data="sell" onClick={handleSellOpen}>SELL</button>

                  <Modal open={buyOpen} onClose={handleBuyClose}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description">

                     <div style={modalStyle} className={classes.paper} id="buy-modal">
                        <div className="modal-content">
                           <div className="ticker">{tickerInfo[20].symbol}</div>
                           <div className="price">{tickerInfo && tickerInfo[20].last}</div>
                        </div>
                        <p>Please enter number of shares</p>
                        <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
                        <button onClick={() => { setBuyPrice(tickerInfo[20].last) }} className="buy-btn">BUY</button>
                     </div>
                  </Modal>

                  <Modal open={sellOpen} onClose={handleSellClose}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description">

                     <div style={modalStyle} className={classes.paper} id="sell-modal">
                        <div className="modal-content">
                           <div className="ticker">{tickerInfo[20].symbol}</div>
                           <div className="price">{tickerInfo && tickerInfo[20].last}</div>
                        </div>
                        <p>Please enter number of shares</p>
                        <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
                        <button onClick={() => { setSellPrice(tickerInfo[20].last) }} className="sell-btn">SELL</button>
                     </div>
                  </Modal>
               </div>
            </div>

            {/* UserStock Component */}

            <div className="user-position">
               <div>Your Position: {userPosition.numOfShares ? userPosition.numOfShares : '0'} shares</div>
               <div>Avg Price: ${userPosition.avgPrice? userPosition.avgPrice.toFixed(2) : '0'}</div>
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
   } else {
      return (<div className="loading">LOADING...</div>)
   }
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
