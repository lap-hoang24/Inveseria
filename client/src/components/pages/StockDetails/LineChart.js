import { createChart } from 'lightweight-charts';

export const paintLineChart = (dataSet) => {
   const chart = createChart(document.getElementById('line-chart'), {
      width: 300,
      height: 240,
      localization: {
         dateFormat: 'yyyy/MM/dd',
      },
      grid: {
         vertLines: {
            color: 'rgba(197, 203, 206, 0.0)',
         },
         horzLines: {
            color: 'rgba(197, 203, 206, 0.0)',
         },
      },
      timeScale: {
         timeVisible: true,
         secondsVisible: false,
      },
      rightPriceScale: {
         borderVisible: false,
      },
      timeScale: {
         borderVisible: false,
      },
   });

//    chart.applyOptions({
//       priceScale: {
//           position: 'left',
//           mode: 2,
//           autoScale: false,
//           invertScale: true,
//           alignLabels: false,
//           borderVisible: false,
//           borderColor: '#555ffd',
//           scaleMargins: {
//               top: 0.30,
//               bottom: 0.25,
//           },
//       },
//   });
   const lineSeries = chart.addLineSeries();

   return lineSeries.setData(dataSet);
}