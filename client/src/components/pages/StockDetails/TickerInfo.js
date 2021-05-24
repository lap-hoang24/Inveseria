import React, { useState, useEffect } from 'react'
import axios from 'axios'

function TickerInfo() {

   const [tickerInfo, setTickerInfo] = useState({
      open: '',
      high: '',
      low: '',
      close: '',
      volume: '',
      date: '',
      symbol: '',
   })


   // useEffect(() => {
   //    axios.get("http://api.marketstack.com/v1/intraday?access_key=75b6f2af2935400d9770adbdadf74a58&symbols=TSLA")
   //    .then(response => {
   //       const { data } = response;

   //       console.log(response)
   //       setTickerInfo({
   //          open: data.open,
   //          high: data.high,
   //          low: data.low,
   //          close: data.close,
   //          volume: data.volume,
   //          data: data.date,
   //          symbol: data.symbol,
   //       })
   //    })
   //    .catch(err => { console.error(err) })
   // })

   return (
      <div>
         {/* <div>If there are {tickerInfo.open}</div> */}
      </div>
   )
}

export default TickerInfo;
