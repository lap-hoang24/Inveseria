import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// const GetTicker = (props) => {


//   useEffect(() => {

//     //get all tickers from Database

//     axios.get('/stockApi/getAllStocks')
//       .then(res => {
//         console.log(res.data);
//         // put them in an array
//         let allTickers = res.data;
//         let i = 0;

//         setInterval(() => {

//           var options = {
//             method: 'GET',
//             // QUOTES - ok
//             // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
//             // params: {region: 'US', symbols: 'TSLA'},
//             // EARNINGS - ok 
//             // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-earnings',
//             // params: { region: 'US', startDate: '1585155600000', endDate: '1589475600000', size: '10' },
//             // FINANCIALS - excellent!
//             // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
//             // params: { symbol: 'TSLA', region: 'US' },
//             // RECOMMENDATIONS - related to the stock -  great!
//             // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations',
//             // params: { symbol: 'AAL' },
//             // STOCK HISTORY - 1 YEAR TRADING
//             url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
//             params: { symbol: allTickers[i].ticker, region: 'US' },
//             headers: {
//               'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//               'x-rapidapi-key': '619a93f73bmsh2c63b3d89ee00a5p13dc29jsn941d23998c56'
//             }
//           };

//           // loop through all + update to database every 3 seconds

//           axios.default.request(options)
//             .then(function (ress) {

//               axios.post('/stockApi/addIntraday', { ticker: allTickers[i].ticker, prices: ress.data.prices })
//                 .then(respon => {
//                   console.log(allTickers[i].ticker + ' OKAY', respon);
//                   ++i;
//                 })
//                 .catch(e => console.log(e))


//               console.log(ress.data);
//             })
//             .catch(function (error) {
//               console.error(error);
//             });

//           console.log(allTickers[i].ticker);

//         }, 4000)
//       })
//       .catch(err => console.error(err))
//   }, [])

//   return (
//     <div></div>
//   );
// }




const GetTicker = () => {

  useEffect(() => {

    axios.get('/stockApi/getBrokenPrices')
      .then(res => console.log(res))
      .catch(err => console.error(err))

  }, [])

  return (
    <div className="aa"></div>
  )
}


export default GetTicker;