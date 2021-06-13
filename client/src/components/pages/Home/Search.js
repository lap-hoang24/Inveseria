import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import { useStyles, modalStyle } from '../../component/Modal';

function Search(props) {
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
      let ticker = sessionStorage.getItem('ticker');
      if (ticker) {
         if (ticker.includes(event.target.textContent)) {
            sessionStorage.setItem('ticker', ticker)
         } else {
            sessionStorage.setItem('ticker', `${ticker}/${event.target.textContent}`)
         }
      } else {
         sessionStorage.setItem('ticker', event.target.textContent)
      }
   }
   let history = sessionStorage.getItem('ticker') ? sessionStorage.getItem('ticker').split('/ ') : '';

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

   const classes = useStyles();

   const body = (
      <div style={modalStyle} className={classes.paper} id="search-modal">
         <input onChange={(event) => { setTickerInput(event.target.value) }} value={tickerInput} type="text" id='ticker-search' placeholder="Find your stock..." autoComplete="off" autoFocus />
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
      <div id="search-icon">
         <button id='search-button' type="button" style={{ border: 'none', background: 'none' }} onClick={handleOpen}><i className="fas fa-search"></i></button>
         <Modal open={open} onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {body}
         </Modal>
      </div>
   )
}

export default Search;
