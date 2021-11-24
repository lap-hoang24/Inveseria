import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Financials({ ticker }) {
   const [results, setResults] = useState({});

   useEffect(() => {
      const options = {
         params: { symbol: ticker, region: 'US' },
         headers: {
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            'x-rapidapi-key': '619a93f73bmsh2c63b3d89ee00a5p13dc29jsn941d23998c56'
         }
      };

      axios.get('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials', options)
         .then(response => { setResults(response); console.log(response) })
         .catch(error => console.error(error))


         
   }, [])

   if (results.status === 200) {
      const { summaryDetail, timeSeries } = results.data;

      return (
         <div id="financials">
            <div className="heading">key stats</div>
            {/* <div className="stats">
               <div className="stats-line"><span className="key">P/E Ratio</span><span className="value">{summaryDetail.trailingPE.fmt}</span></div>
               <div className="stats-line"><span className="key">All time high</span><span className="value">$ {summaryDetail.fiftyTwoWeekHigh.fmt}</span></div>
               <div className="stats-line"><span className="key">Trading volume</span><span className="value">{summaryDetail.volume.longFmt}</span></div>
               <div className="stats-line"><span className="key">200 DMA</span><span className="value">$ {summaryDetail.twoHundredDayAverage.fmt}</span></div>
               <div className="stats-line"><span className="key">50 DMA</span><span className="value">$ {summaryDetail.fiftyDayAverage.fmt}</span></div>
               <div className="stats-line"><span className="key">Market Cap</span><span className="value">$ {summaryDetail.marketCap.longFmt}</span></div>
               <div className="stats-line"><span className="key">Shares Outstanding</span><span className="value">{timeSeries.annualBasicAverageShares[3].reportedValue.raw.toLocaleString()}</span></div>
               <div className="stats-line"><span className="key">Total Revenue (TTM)</span><span className="value">$ {timeSeries.trailingTotalRevenue[0].reportedValue.raw.toLocaleString()}</span></div>
               <div className="stats-line"><span className="key">Total Income (TTM)</span><span className="value">$ {timeSeries.trailingNetIncome[0].reportedValue.raw.toLocaleString()}</span></div>
            </div> */}
         </div>
      )
   } else {
      return (
         <div className="asa"></div>
      )
   }

}

export default Financials;
