import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles, useAlertStyles } from '../../add-ons/Styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';



function BuyButton({ open, percent, symbol, userCash, userId, tickerInfo, history }) {
   const [buyOpen, setBuyOpen] = useState(false);
   const [numOfShares, setNumOfShares] = useState('');
   const [buyPrice, setBuyPrice] = useState(0);
   const [cashExceed, setCashExceed] = useState(false);
   const buyBtnExec = useRef();
   const modalClasses = useModalStyles();
   const inputClasses = useInputStyles();
   const alertClasses = useAlertStyles();
   const handleBuyOpen = () => { setBuyOpen(true) };
   const handleBuyClose = () => { setBuyOpen(false) };

   const compareCash = (numOfShares) => {
      let totalPurchase = numOfShares * open;
      if (totalPurchase > userCash) {
         setCashExceed(true);
         buyBtnExec.current.disabled = true;
         buyBtnExec.current.style.backgroundColor = '#e9ecef';
         buyBtnExec.current.style.color = '#6c757d';
      } else {
         setCashExceed(false);
         buyBtnExec.current.disabled = false;
         buyBtnExec.current.style.color = 'white';
         buyBtnExec.current.style.backgroundColor = 'green';
      }
   }

   useEffect(() => {
      if (buyPrice !== 0 && numOfShares !== '') {
         const params = {
            price: buyPrice,
            numOfShares,
            tickerInfo,
            userId
         }

         axios.post('/stockApi/buyStock', params)
            .then(response => {
               history.push('/');
               setNumOfShares('');
               sessionStorage.setItem('stockAction', `buy-${tickerInfo.ticker}-${numOfShares}`);
            })
            .catch(err => console.error(err))
      }
   }, [buyPrice])



   let color = percent > 0 ? "green" : "red";
   let indicator = percent > 0 ? <i className="fas fa-sort-up green"></i> : <i className="fas fa-sort-down red "></i>;


   const buyContent = (
      <div className={modalClasses.paper} id="buy-modal">
         <div className="ticker-info-wrapper">
            <div className="ticker">{symbol}</div>
            <div className="price_percent_indicator-wrapper">
               <div className='price'>$ {open}</div>
               <div className="indicator">{indicator}</div>
               <div className={`percent ${color}`}>{percent}%</div>
            </div>
         </div>

         <div className="input-wrapper">
            <p className={inputClasses.label}>Number of shares</p>
            <TextField
               InputProps={{ className: inputClasses.input }}
               className={inputClasses.root}
               onChange={(event) => { setNumOfShares(event.target.value); compareCash(event.target.value) }}
               value={numOfShares}
               autoComplete="off" type="number"
               autoFocus variant="outlined" />
            <button onClick={() => { setBuyPrice(open) }} className="buy-btn" id="buy-btn-modal" ref={buyBtnExec}>BUY</button>
            {cashExceed
               ? <Alert className={alertClasses.root} severity="error">work harder then you can buy more share mother fucker!</Alert>
               : <div className="exceed-warning"></div>
            }
         </div>
      </div>
   )


   return (
      <div id='buy-wrapper'>
         <button type="button" id="buy-btn-disable" className="buy-btn" data="buy" onClick={handleBuyOpen}>BUY</button>
         <Modal open={buyOpen} onClose={handleBuyClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 250,
            }}>
            <Fade in={buyOpen}>
               {buyContent}
            </Fade>
         </Modal>
      </div>
   )
}

export default BuyButton
