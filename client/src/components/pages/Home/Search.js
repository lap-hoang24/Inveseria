import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Search() {
   const array = [{
      _id: 'nothing',
      ticker: '',
   }]
   const [tickerInput, setTickerInput] = useState('');
   const [stocksFound, setStocksFound] = useState([]);

   useEffect(() => {
      axios.post('/stockApi/search-ticker', { companyName: tickerInput })
         .then(response => {
            if (typeof response.data === 'object') {
               setStocksFound(response.data);
            } else {
               setStocksFound(array);
            }
         })
         .catch(err => console.error(err));
   }, [tickerInput])

   return (
      // modal or side slide-in search effect
      <div id="search-icon">
         <a href="#search-modal" className="modal-trigger"><i className="fas fa-search"></i></a>
         {/* <!-- Modal Structure --> */}
         <div id="search-modal" className="modal">
            <div className="modal-content">
               <i className="fas fa-search"></i><input onChange={(event) => { setTickerInput(event.target.value) }} value={tickerInput} type="text" id='ticker-search' />

               <div id="found-stock-container">
                  {stocksFound && stocksFound.map(stock => {
                     if (stock.ticker) {
                        let nameDisplay = stock.companyName.length > 20 ? stock.companyName.slice(0, 20) + "..." : stock.companyName;
                        return (
                           <div className="search-result" key={stock._id}>
                              <a href={"/viewstock/" + stock.ticker}> {stock.ticker} - {nameDisplay}</a>
                           </div>
                        )
                     } else {
                        return (
                           <div className="search-result" key={stock._id}>
                              ...
                           </div>
                        )
                     }
                  })
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default Search;
