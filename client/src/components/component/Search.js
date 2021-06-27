import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles } from './Styles';
import TextField from '@material-ui/core/TextField';


const trendingStocks = ['TSLA', 'AAPL', 'AMZN', 'SQ', 'NIO', 'NKE', 'GOOG'];

function Search() {
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
   const inputClasses = useInputStyles();
   const modalClasses = useModalStyles();


   const clearHistory = () => {
      localStorage.removeItem('ticker');
   }

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


   const searchContent = (
      <div className={modalClasses.paper} id="search-modal">

         <TextField InputProps={{ className: inputClasses.input }}
            className={inputClasses.root}
            value={tickerInput}
            onChange={(event) => { setTickerInput(event.target.value) }}
            id='ticker-search' label="Find stocks..."
            autoComplete="off"
            autoFocus variant="outlined" />

         <div id="found-stock_history-container">
            {stocksFound && stocksFound.map(stock => {
               if (stock.ticker) {
                  let nameDisplay = stock.companyName.length > 20 ? stock.companyName.slice(0, 20) + "..." : stock.companyName;
                  return (
                     <div className="search-result" key={stock._id}>
                        <a data={stock._id} onClick={(event) => { saveHistory(event) }} href={"/viewstock/" + stock.ticker}> {stock.ticker} - {nameDisplay}</a>
                     </div>
                  )
               } else {

                  {
                     if (history) {
                        return (<div id="history" key={'something'}>
                           <button id="clear-history-btn" onClick={clearHistory}>clear history</button>
                           {history.map(hist => {
                              let ticker = hist.split(' - ');
                              return (
                                 <div className="search-result" key={ticker}>
                                    <a href={`/viewstock/${ticker[0].trim()}`} className="history">{hist}</a>
                                 </div>
                              )
                           })}
                        </div>)
                     } else {
                        return (
                           <div id="trending-stocks">
                              <div className="trending-message">trending stocks</div>
                              <div className="search-result">
                                 <a href="/viewstock/TSLA">TSLA</a>
                              </div>
                              <div className="search-result">
                                 <a href="/viewstock/AAPL">AAPL</a>
                              </div>
                              <div className="search-result">
                                 <a href="/viewstock/AMZN">AMZN</a>
                              </div>
                              <div className="search-result">
                                 <a href="/viewstock/SQ">SQ</a>
                              </div>
                           </div>
                        )
                     }
                  }
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
            <Fade in={open} >
               {searchContent}
            </Fade>
         </Modal>
      </div>
   )
}

export default Search;
