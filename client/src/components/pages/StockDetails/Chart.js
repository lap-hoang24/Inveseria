import React, { useEffect, useState } from 'react'
import { oneYearChart } from './LineChart';
import ApexCharts from 'apexcharts';


function Chart({ tickerIntra, ticker }) {
   const [length, setLength] = useState(250);

   useEffect(() => {
      let data = tickerIntra.map(intra => [intra.date * 1000, intra.close.toFixed(2)])
      data.length = length;
      let startPoint = data[0][1];
      let endPoint = data[data.length - 1][1];
      let lineColor = parseInt(startPoint) - parseInt(endPoint) < 0 ? "#f94144" : "#38b000"; // red and green in _variables.scss
      let options = oneYearChart({ name: ticker, data: data }, lineColor);
      let chart = new ApexCharts(document.querySelector("#line-chart"), options);

      
      if (length === 250) {
         chart.render()
      } else {
         ApexCharts.exec('stockChart', "updateOptions", { stroke: { colors: [lineColor] } })
         ApexCharts.exec('stockChart', "updateSeries", [{ name: ticker, data: data }])
      }
   }, [length])

   return (
      <div id="chart">
         <div id="line-chart"></div>
         <div id="chart-period">
            <button onClick={() => { setLength(7) }} className="period-btn">1W</button>
            <button onClick={() => { setLength(20) }} className="period-btn">1M</button>
            <button onClick={() => { setLength(75) }} className="period-btn">3M</button>
            <button onClick={() => { setLength(130) }} className="period-btn">6M</button>
            <button onClick={() => { setLength(249) }} className="period-btn">1Y</button>
         </div>
      </div>
   )
}

export default Chart;
