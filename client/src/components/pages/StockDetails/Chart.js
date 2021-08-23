import React, { useEffect, useState } from 'react'
// import { paintLineChart } from './LineChart';
import Dailychart from 'dailychart';

function Chart({ tickerIntra }) {


   // useEffect(() => {
   //    let stockData = [];
   //    let dates = [];
   //    tickerIntra.forEach(intraday => {
   //       if (!dates.includes(intraday.date.slice(0, 10))) {
   //          dates.push(intraday.date.slice(0, 10))
   //          stockData.push({
   //             time: intraday.date.slice(0, 10),
   //             value: intraday.open,
   //          })
   //       }
   //    })
   //    stockData.reverse();
   //    paintLineChart(stockData);
   // }, [])

   const [close, setClose] = useState();
   const [values, setValues] = useState();

   useEffect(() => {
      Dailychart.create('#line-chart');
      let closePrice = tickerIntra[0].open;
      let valueArray = tickerIntra.map(intraday => {
         return intraday.open;
      })
      let values = valueArray.join(', ');
      setClose(closePrice);
      setValues(values);
   }, [])

   return (
      <div className="chart" id='line-chart' data-dailychart-values={values} data-dailychart-close={close} data-dailychart-length="99">
      </div>
   )
}

export default Chart
