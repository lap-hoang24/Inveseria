import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const GetTicker = (props) => {


  useEffect(() => {



    // setInterval(() => {

      // var options = {
      //   method: 'GET',

      //   //************************END POINTS FROM YAHOO FINANCE*************************

      //   // QUOTES - ok
      //   // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
      //   // params: {region: 'US', symbols: 'TSLA'},

      //   // EARNINGS - ok 
      //   // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-earnings',
      //   // params: { region: 'US', startDate: '1585155600000', endDate: '1589475600000', size: '10' },

      //   // FINANCIALS - excellent! - to be used in "StockDetails".
      //   // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
      //   // params: { symbol: 'TSLA', region: 'US' },

      //   // RECOMMENDATIONS - related to the stock -  great!
      //   // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations',
      //   // params: { symbol: 'AAL' },

      //   // STOCK HISTORY - 1 YEAR TRADING
      //   // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data',
      //   // params: { symbol: 'TSLA', region: 'US' },

      //   // GET STOCK RECOMMENDATION TREND
      //   // axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=c32dffiad3ieculvh350`)
      //   // .then(res => { res.data.length = 6; console.log(res); })
      //   // .catch(err => { console.error(err) })

      //   headers: {
      //     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      //     'x-rapidapi-key': '619a93f73bmsh2c63b3d89ee00a5p13dc29jsn941d23998c56'
      //   }
      // };


      axios.get('https://finnhub.io/api/v1/company-news?symbol=AAPL&from2021-9-16&to2021-9-19&token=c32dffiad3ieculvh350')
        .then(res => console.log(res))
        .catch(err => console.log(err))



    // })
  }, [])

  return (
    <div></div>
  );
}


export default GetTicker;