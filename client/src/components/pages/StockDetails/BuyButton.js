import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles, useAlertStyles } from '../../component/Styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';



function BuyButton({ open, percent, symbol, userCash, userId, tickerInfo, history }) {
   const [buyOpen, setBuyOpen] = useState(false);
   const [numOfShares, setNumOfShares] = useState(0);
   const [buyPrice, setBuyPrice] = useState();
   const [cashExceed, setCashExceed] = useState(false);
   const modalClasses = useModalStyles();
   const inputClasses = useInputStyles();
   const alertClasses = useAlertStyles();
   const handleBuyOpen = () => { setBuyOpen(true) };
   const handleBuyClose = () => { setBuyOpen(false) };

   const compareCash = (numOfShares) => {
      const buyBtn = document.getElementById('buy-btn-modal');
      let totalPurchase = numOfShares * open;
      if (totalPurchase > userCash) {
         setCashExceed(true);
         buyBtn.disabled = true;
         buyBtn.style.backgroundColor = 'grey';
      } else {
         setCashExceed(false);
         buyBtn.disabled = false;
         buyBtn.style.backgroundColor = 'green';
      }
   }

   useEffect(() => {
      if (buyPrice !== 0 && numOfShares !== 0) {
         const params = {
            price: buyPrice,
            numOfShares: numOfShares,
            tickerInfo,
            userId
         }

         axios.post('/stockApi/buyStock', params)
            .then(response => {
               history.push('/');
               sessionStorage.setItem('stockAction', `buy-${tickerInfo.ticker}-${numOfShares}`);
            })
            .catch(err => console.error(err))

         document.getElementById('buy-input').value = "";
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
            <TextField InputProps={{ className: inputClasses.input }}
               className={inputClasses.root}
               onChange={(event) => { setNumOfShares(event.target.value); compareCash(event.target.value) }}
               id='buy-input'
               autoComplete="off" type="number"
               autoFocus variant="outlined" />
            <button onClick={() => { setBuyPrice(open) }} className="buy-btn" id="buy-btn-modal">BUY</button>
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
