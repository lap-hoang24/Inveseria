import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStyles, modalStyle } from '../../component/Modal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const inputStyles = {
   input: {
      height: "40px",
      width: "100%"
   },
   label: {
      fontStyle: 'italic',
      fontSize: "14px",
   },
   float: {
      color: 'red'
   }
}

function Search({ classes }) {
   const emptyArray = [{
      _id: 'nothing',
   }]
   const [tickerInput, setTickerInput] = useState('');
   const [stocksFound, setStocksFound] = useState([]);
   const [open, setOpen] = useState(false);
   const handleOpen = () => { setOpen(true) };
   const handleClose = () => {
      setOpen(false);
      setTickerInput('');
   };

   const saveHistory = (event) => {
      let ticker = localStorage.getItem('ticker');
      if (ticker) {
         if (ticker.includes(event.target.textContent)) {
            localStorage.setItem('ticker', ticker)
         } else {
            localStorage.setItem('ticker', `${ticker}/${event.target.textContent}`)
         }
      } else {
         localStorage.setItem('ticker', event.target.textContent)
      }
   }

   let history = localStorage.getItem('ticker') ? localStorage.getItem('ticker').split('/ ') : '';

   useEffect(() => {
      axios.post('/stockApi/search-ticker', { companyName: tickerInput })
         .then(response => {
            if (typeof response.data === 'object') {
               setStocksFound(response.data);
            } else {
               setStocksFound(emptyArray);
            }
         })
         .catch(err => console.error(err));
   }, [tickerInput])


   // ==============MODAL BODY AND STYLINGS===========================

   const classe = useStyles();
   const body = (
      <div style={modalStyle} className={classe.paper} id="search-modal">
         <TextField InputProps={{ classes: { root: classes.input } }}
            InputLabelProps={{ className: classes.label }}
            value={tickerInput}
            onChange={(event) => { setTickerInput(event.target.value) }}
            id='ticker-search' label="Find stocks..."
            autoComplete="off"
            autoFocus variant="outlined" />

         <div id="found-stock-container">
            {stocksFound && stocksFound.map(stock => {
               if (stock.ticker) {
                  let nameDisplay = stock.companyName.length > 20 ? stock.companyName.slice(0, 20) + "..." : stock.companyName;
                  return (
                     <div className="search-result" key={stock._id}>
                        <a data={stock._id} onClick={(event) => { saveHistory(event) }} href={"/viewstock/" + stock.ticker}> {stock.ticker} - {nameDisplay}</a>
                     </div>
                  )
               } else {
                  return (
                     <div className="search-result" key={'something'}>
                        <p>search history...</p>
                        {history && history.map(hist => {
                           let ticker = hist.split(' - ');
                           return (
                              <div className="search-result" key={ticker}>
                                 <a href={`/viewstock/${ticker[0].trim()}`} className="history">{hist}</a>
                              </div>
                           )
                        })}
                     </div>
                  )
               }
            })}
         </div>
      </div>
   )

   return (
      <div id="search">
         <button id='search-button' type="button" style={{ border: 'none', background: 'none' }} onClick={handleOpen}><i className="fas fa-search"></i></button>
         <Modal open={open} onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 250,
            }}>
            <Fade in={open}>
               {body}
            </Fade>
         </Modal>
      </div>
   )
}

export default withStyles(inputStyles)(Search);
