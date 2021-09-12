import React, { useEffect, useState } from 'react'
import { oneYearChart } from './LineChart';
import ApexCharts from 'apexcharts';


function Chart({ tickerIntra, ticker }) {

   useEffect(() => {
      let data = tickerIntra.map(intra => [intra.date * 1000, intra.close.toFixed(2)])

      let options = oneYearChart(data, ticker);

      let chart = new ApexCharts(document.querySelector("#line-chart"), options);
      chart.render();

   }, [])

   return (
      <div className="chart" id='line-chart' >
      </div>
   )
}

export default Chart
