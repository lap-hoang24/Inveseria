import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { useStyles, modalStyle } from '../../component/Modal';




function SellButton({ open, symbol, userPosition, userId, tickerInfo, history }) {
   const [sellPrice, setSellPrice] = useState();
   const [numOfShares, setNumOfShares] = useState(0);
   const [sellOpen, setSellOpen] = useState(false);
   const [shareExceed, setShareExceed] = useState(false);
   const handleSellOpen = () => { setSellOpen(true) };
   const handleSellClose = () => { setSellOpen(false) };
   const classes = useStyles();


   const compareShares = (numOfShares) => {
      const sellBtn = document.getElementById('sell-btn-modal');
      if (numOfShares > userPosition.numOfShares) {
         setShareExceed(true);
         sellBtn.disabled = true;
         sellBtn.style.backgroundColor = 'grey';
      } else {
         setShareExceed(false);
         sellBtn.disabled = false;
         sellBtn.style.backgroundColor = 'red';
      }
   }

   useEffect(() => {
      if (sellPrice !== 0 && numOfShares !== 0) {
         const params = {
            price: sellPrice,
            numOfShares,
            tickerInfo,
            userId
         }
         axios.post('/stockApi/sellStock', params)
            .then(response => { history.push('/') })
            .catch(err => console.error(err))
         document.getElementById('numOfShares').value = "";
      }
   }, [sellPrice])

   return (
      <div>
         <button type="button" id="sell-btn-disable" className="sell-btn" data="sell" onClick={handleSellOpen}>SELL</button>

         <Modal open={sellOpen} onClose={handleSellClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div style={modalStyle} className={classes.paper} id="sell-modal">
               <div className="modal-content">
                  <div className="ticker">{symbol}</div>
                  <div className="price">{open}</div>
               </div>
               <p>Please enter number of shares</p>
               <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value); compareShares(event.target.value) }} type="number" autoComplete="off" autoFocus />
               {shareExceed ? <div> you can't fucking sell what you dont own mother fucker!</div> : ''}
               <button onClick={() => { setSellPrice(open) }} className="sell-btn" id='sell-btn-modal'>SELL</button>
            </div>
         </Modal>
      </div>
   )
}

export default SellButton;

