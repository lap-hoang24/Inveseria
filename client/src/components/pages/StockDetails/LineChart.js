import ApexCharts from "apexcharts";

export const oneYearChart = (dataObject) => {
   return {
      series: [dataObject],
      chart: {
         id: 'stockChart',
         type: 'area',
         stacked: false,
         height: 350,
         zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
         },
         animations: {
            enabled: true,
            easing: 'easeout',
            speed: 500,
         },
         toolbar: {
            show: true,
            autoSelected: 'zoom',
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: true,
            tools: {
               download: false,
               customIcons: [
                  {
                     icon: '<i class="fas fa-adjust"></i>',
                     index: 2,
                     title: 'tooltip of the icon',
                     class: 'custom-icon',
                     click: function (chart, options, e) {

                     }
                  }
               ]
            },
         },
      },
      dataLabels: {
         enabled: false
      },
      stroke: {
         show: true,
         curve: 'smooth',
         lineCap: 'butt',
         colors: undefined,
         width: 2,
         dashArray: 0,
      },
      markers: {
         size: 0,
      },
      title: {
         text: '1 year',
         align: 'left'
      },
      fill: {
         type: 'gradient',
         gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
         },
      },
      yaxis: {
         labels: {
            formatter: function (val) {
               return (val).toFixed(0);
            },
         },
         title: {
            text: 'Price'
         },
      },
      xaxis: {
         type: 'datetime',
      },
      tooltip: {
         shared: true,
         y: {
            formatter: function (val) {
               return (val).toFixed(0)
            }
         }
      }
   };
}