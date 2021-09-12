import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles, useAlertStyles } from '../../add-ons/Styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';





function SellButton({ open, percent, symbol, userPosition, userId, tickerInfo, history }) {
   const [sellPrice, setSellPrice] = useState();
   const [numOfShares, setNumOfShares] = useState(0);
   const [sellOpen, setSellOpen] = useState(false);
   const [shareExceed, setShareExceed] = useState(false);
   const handleSellOpen = () => { setSellOpen(true) };
   const handleSellClose = () => { setSellOpen(false) };
   const modalClasses = useModalStyles();
   const inputClasses = useInputStyles();
   const alertClasses = useAlertStyles();
   const sellBtnRef = useRef();
   const sellBtnExec = useRef();




   const compareShares = (shareInput) => {
      if (shareInput > userPosition.numOfShares) {
         setShareExceed(true);
         sellBtnExec.current.disabled = true;
         sellBtnExec.current.style.backgroundColor = '#e9ecef';
         sellBtnExec.current.style.color = '#6c757d';
      } else {
         setShareExceed(false);
         sellBtnExec.current.disabled = false;
         sellBtnExec.current.style.backgroundColor = 'red';
         sellBtnExec.current.style.color = 'white';
      }
   }


   useEffect(() => {
      if (userPosition.noPosition || userPosition.numOfShares === 0) {
         sellBtnRef.current.disabled = true;
         sellBtnRef.current.style.backgroundColor = 'grey';
      }

      if (sellPrice !== 0 && numOfShares !== 0) {
         const params = {
            price: sellPrice,
            numOfShares,
            tickerInfo,
            userId
         }
         axios.post('/stockApi/sellStock', params)
            .then(response => {
               history.push('/');
               setNumOfShares('');
               sessionStorage.setItem('stockAction', `sell-${tickerInfo.ticker}-${numOfShares}`);
            })
            .catch(err => console.error(err))
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
            <TextField
               InputProps={{ className: inputClasses.input }}
               className={inputClasses.root}
               onChange={(event) => { setNumOfShares(event.target.value); compareShares(event.target.value) }}
               value={numOfShares}
               autoComplete="off" type="number"
               autoFocus variant="outlined" />
            <button onClick={() => { setSellPrice(open) }} className="sell-btn" id="sell-btn-modal" ref={sellBtnExec}>SELL</button>
            {shareExceed ? <Alert className={alertClasses.root} severity="error">you can't fucking sell what you dont own mother fucker!</Alert> : <div className="exceed-warning"></div>}
         </div>
      </div>
   )

   return (
      <div id="sell-wrapper">
         <button type="button" ref={sellBtnRef} className="sell-btn" data="sell" onClick={handleSellOpen}>SELL</button>

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
      </div>
   )
}

export default SellButton;

