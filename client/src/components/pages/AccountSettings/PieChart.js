
export const PieChart = () => {
   return {
      series: [44, 55, 13, 33],
      labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
      chart: {
         id: 'pieChart',
         type: 'donut',
         stacked: false,
         height: 340,
         width: 340,
      },
      title: {
         text: 'portfolio portions',
         align: 'center'
      },
   };
}