import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles, useAlertStyles } from '../../component/Styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import BuySellSnackBar from '../../component/BuySellSnackBar';




function SellButton({ open, percent, symbol, userPosition, userId, tickerInfo, history }) {
   const [sellPrice, setSellPrice] = useState();
   const [numOfShares, setNumOfShares] = useState(0);
   const [sellOpen, setSellOpen] = useState(false);
   const [snackOpen, setSnackOpen] = useState(false);
   const [action, setAction] = useState();
   const [shareExceed, setShareExceed] = useState(false);
   const handleSellOpen = () => { setSellOpen(true) };
   const handleSellClose = () => { setSellOpen(false) };
   const modalClasses = useModalStyles();
   const inputClasses = useInputStyles();
   const alertClasses = useAlertStyles();



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
         setAction('sell')
         setSnackOpen(true);
         const params = {
            price: sellPrice,
            numOfShares,
            tickerInfo,
            userId
         }
         axios.post('/stockApi/sellStock', params)
            .then(response => {
               setSnackOpen(false);
               setTimeout(() => {
                  history.push('/')
               }, 1000)
            })
            .catch(err => console.error(err))
         document.getElementById('sell-input').value = "";
      }
   }, [sellPrice])



   let color = percent > 0 ? "green" : "red";
   let indicator = percent > 0 ? <i className="fas fa-sort-up green"></i> : <i className="fas fa-sort-down red "></i>;

   const sellContent = (
      <div className={modalClasses.paper} id="sell-modal">
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
               onChange={(event) => { setNumOfShares(event.target.value); compareShares(event.target.value) }}
               id='sell-input'
               autoComplete="off" type="number"
               autoFocus variant="outlined" />
            <button onClick={() => { setSellPrice(open) }} className="sell-btn" id='sell-btn-modal'>SELL</button>
            {shareExceed ? <Alert className={alertClasses.root} severity="error">you can't fucking sell what you dont own mother fucker!</Alert> : <div className="exceed-warning"></div>}
         </div>
      </div>
   )

   return (
      <div id="sell-wrapper">
         <button type="button" id="sell-btn-disable" className="sell-btn" data="sell" onClick={handleSellOpen}>SELL</button>

         <Modal open={sellOpen} onClose={handleSellClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 250,
            }}>
            <Fade in={sellOpen}>
               {sellContent}
            </Fade>
         </Modal>

         <BuySellSnackBar action={action} snackStatus={snackOpen} />
      </div>
   )
}

export default SellButton;

