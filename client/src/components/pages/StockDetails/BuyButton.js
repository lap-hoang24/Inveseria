import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { useStyles, modalStyle } from '../../component/Modal';


function BuyButton({ open, symbol, userCash, userId, tickerInfo, history }) {
   const [buyOpen, setBuyOpen] = useState(false);
   const [numOfShares, setNumOfShares] = useState(0);
   const [buyPrice, setBuyPrice] = useState();
   const [cashExceed, setCashExceed] = useState(false);
   const classes = useStyles();


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
            .then(response => { history.push('/') })
            .catch(err => console.error(err))

         document.getElementById('numOfShares').value = "";
      }
   }, [buyPrice])

   return (
      <div>
         <button type="button" id="buy-btn-disable" className="buy-btn" data="buy" onClick={handleBuyOpen}>BUY</button>
         <Modal open={buyOpen} onClose={handleBuyClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div style={modalStyle} className={classes.paper} id="buy-modal">
               <div className="modal-content">
                  <div className="ticker">{symbol}</div>
                  <div className="price">{open}</div>
               </div>
               <p>Please enter number of shares</p>
               <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value); compareCash(event.target.value) }} type="number" autoComplete="off" autoFocus />
               {cashExceed ? <div> work harder then you can buy more share mother fucker!</div> : ''}
               <button onClick={() => { setBuyPrice(open) }} className="buy-btn" id="buy-btn-modal">BUY</button>
            </div>
         </Modal>
      </div>
   )
}

export default BuyButton
