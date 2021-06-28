import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useModalStyles, useInputStyles } from './Styles';
import TextField from '@material-ui/core/TextField';



const trendingStocksArr = ['TSLA', 'AAPL', 'AMZN', 'SQ', 'NIO', 'NKE', 'GOOG'];

function Search() {
   const emptyArray = [{
      _id: 'nothing',
   }]
   const [tickerInput, setTickerInput] = useState('');
   const [stocksFound, setStocksFound] = useState([]);
   const [trendingStocks, setTrendingStocks] = useState([]);
   const [open, setOpen] = useState(false);
   const [history, setHistory] = useState('');
   const handleOpen = () => { setOpen(true) };
   const handleClose = () => {
      setOpen(false);
      setTickerInput('');
   };
   const inputClasses = useInputStyles();
   const modalClasses = useModalStyles();
   let historyItems = localStorage.getItem('ticker') ? localStorage.getItem('ticker').split('/ ') : '';

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

   const clearHistory = () => {
      localStorage.removeItem('ticker');
      setHistory('');
   }

   useEffect(() => {
      setHistory(historyItems);
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


   useEffect(() => {
      axios.post('/stockApi/getTrendingStocks', trendingStocksArr)
         .then(response => {
            setTrendingStocks(response.data);
         })
         .catch(err => console.error(err));
   }, [])

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
                  return <SearchResultItem key={stock._id} saveHistory={saveHistory} stock={stock} />
               } else {
                  if (history) {
                     return (<div id="history">
                        <button id="clear-history-btn" onClick={clearHistory}>clear history</button>
                        {history.map(item => {
                           let ticker = item.split(' - ');
                           return (
                              <div className="search-result" key={ticker}>
                                 <a href={`/viewstock/${ticker[0].trim()}`} className="history">{item}</a>
                              </div>
                           )
                        })}
                     </div>)
                  } else {
                     return (
                        <div id="trending-stocks">
                           <div className="trending-message">trending stocks</div>
                           {trendingStocks && trendingStocks.map(stock => {
                              return <SearchResultItem key={stock._id} saveHistory={saveHistory} stock={stock} />
                           })}
                        </div>
                     )
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



function SearchResultItem({ stock, saveHistory }) {
   let nameDisplay = stock.companyName.length > 30 ? stock.companyName.slice(0, 30) + "..." : stock.companyName;
   return (
      <div className="search-result">
         <a onClick={(event) => { saveHistory(event) }} href={"/viewstock/" + stock.ticker}> {stock.ticker} - {nameDisplay}</a>
      </div>
   )
}




export default Search;
