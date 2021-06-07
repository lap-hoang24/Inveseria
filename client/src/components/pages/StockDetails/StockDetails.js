import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../store/actions/authActions';
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import Modal from '@material-ui/core/Modal'
import { useStyles, modalStyle } from '../../component/Modal';
import { createChart } from 'lightweight-charts';
import { paintLineChart } from './LineChart';
import BuyModal from './BuyModal';
function StockDetails(props) {

   const { ticker } = useParams();
   const [state, setState] = useState({})
   const [buyPrice, setBuyPrice] = useState();
   const [sellPrice, setSellPrice] = useState();
   const [numOfShares, setNumOfShares] = useState(0);
   const [buyOpen, setBuyOpen] = useState(false);
   const [sellOpen, setSellOpen] = useState(false);
   const [randomNumber, setrandomNumber] = useState(0);
   const handleBuyOpen = () => { setBuyOpen(true) };
   const handleBuyClose = () => { setBuyOpen(false) };
   const handleSellOpen = () => { setSellOpen(true) };
   const handleSellClose = () => { setSellOpen(false) };
   let randomNum = 0;






   // const sellBtn = document.getElementById('sell-btn-disable');
   // userPosition.noPosition ? sellBtn.disabled = true : sellBtn.disabled = false;

   useEffect(() => {
      const userId = props.cookies.get('id');
      const stockIntraday = axios.get('/stockApi/getIntraday/' + ticker);
      // get user stock info for this stock, if null, disable SELL button
      const userPos = axios.post('/stockApi/getUserPosition/', { ticker, userId });

      Promise.all([stockIntraday, userPos])
         .then(values => {
            console.log(values);
            const tickerInfo = [...values[0].data.intraday];
            const userPosition = values[1].data;
            setState({ tickerInfo, userPosition });

            let dataSet = tickerInfo.map(intraday => {
               return {
                  time: intraday.date.slice(0, 10),
                  value: intraday.open
               }
            })
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

            const sellBtn = document.getElementById('sell-btn-disable');
            if (userPosition.noPosition) {
               sellBtn.disabled = true;
               sellBtn.style.backgroundColor = 'grey';
            }

         }).catch(err => console.error(err))

         setInterval(() => {
            randomNum = Math.floor((Math.random() * 50));
            setrandomNumber(randomNum)
         }, 1500)
   }, [])

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

      let percent = tickerInfo && String(((tickerInfo[randomNumber].open.toFixed(1) - tickerInfo[randomNumber].low.toFixed(1)) / tickerInfo[randomNumber].close) * 100).slice(0, 4);
      return (
         <div id="stock-details">
            <div className="top-wrapper">
               <div className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></div>
               <div className="ticker">{tickerInfo[randomNumber].symbol}</div>
               <div className="add-favorite-btn"><i className="far fa-star"></i></div>
            </div>

            <div className="price-buy-btn-wrapper">
               <div className="price-percent-wrapper">
                  <div className='price'>$ {tickerInfo && tickerInfo[randomNumber].open}</div>
                  <div className="percent">{percent}%</div>
               </div>


               <div className="btn-wrapper">
                  <button type="button" id="buy-btn-disable" className="buy-btn" data="buy" onClick={handleBuyOpen}>BUY</button>
                  <button type="button" id="sell-btn-disable" className="sell-btn" data="sell" onClick={handleSellOpen}>SELL</button>
                  <Modal open={buyOpen} onClose={handleBuyClose}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description">
                     <div style={modalStyle} className={classes.paper} id="buy-modal">
                        <div className="modal-content">
                           <div className="ticker">{tickerInfo[randomNumber].symbol}</div>
                           <div className="price">{tickerInfo && tickerInfo[randomNumber].open}</div>
                        </div>
                        <p>Please enter number of shares</p>
                        <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
                        <button onClick={() => { setBuyPrice(tickerInfo[randomNumber].open) }} className="buy-btn">BUY</button>
                     </div>
                  </Modal>

                  <Modal open={sellOpen} onClose={handleSellClose}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description">

                     <div style={modalStyle} className={classes.paper} id="sell-modal">
                        <div className="modal-content">
                           <div className="ticker">{tickerInfo[randomNumber].symbol}</div>
                           <div className="price">{tickerInfo && tickerInfo[randomNumber].open}</div>
                        </div>
                        <p>Please enter number of shares</p>
                        <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
                        <button onClick={() => { setSellPrice(tickerInfo[randomNumber].open) }} className="sell-btn">SELL</button>
                     </div>
                  </Modal>
               </div>
            </div>

            {/* UserStock Component */}

            <div className="user-position">
               <div>Your Position: {userPosition.numOfShares ? userPosition.numOfShares : '0'} shares</div>
               <div>Avg Price: ${userPosition.avgPrice ? userPosition.avgPrice.toFixed(2) : '0'}</div>
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
