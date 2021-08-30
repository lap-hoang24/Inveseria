import React from 'react';
import axios from 'axios';

class GetTicker extends React.Component {

  // getTicker = () => {

  //   let allTickers = ['MMM', 'PG', 'UNH', 'CAT', 'HD', 'ABT', 'ICE', 'C', 'WFC', 'AXP', 'ADSK', 'MSI', 'FISV', 'AMAT', 'FTNT', 'CAT', 'LLY', 'GE', 'BA', 'ADI', 'AVGO', 'MS', 'ABT', 'PEP', 'COST', 'ATVI', 'SBUX', 'MCD',];

  //   let i = 0;
  //   setInterval(() => {
  //     axios.get(`https://api.polygon.io/v1/meta/symbols/${allTickers[i]}/company?&apiKey=4c29ZOYHHDcJ9B9i1JSUWL8pFs2ZfphS`)
  //       .then(response => {
  //         axios.post('/getTicker', response)
  //           .then(resDB => { console.log(resDB); })
  //           .catch(err => { console.log(err) })
  //       })
  //       .catch(err => console.error(err));
  //     i++;
  //   }, 21000)
  // }


  componentDidMount = () => {

    var options = {
      method: 'GET',
      // QUOTES - ok
      // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
      // params: {region: 'US', symbols: 'TSLA'},
      // EARNINGS - ok 
      // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-earnings',
      // params: { region: 'US', startDate: '1585155600000', endDate: '1589475600000', size: '10' },
      // FINANCIALS - excellent!
      // url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials',
      // params: { symbol: 'TSLA', region: 'US' },
      // RECOMMENDATIONS - related to the stock -  great!
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations',
      params: {symbol: 'AAL'},
      headers: {
        'x-rapidapi-key': '69f9fdd31cmshc73a59ec773b1b3p1abddbjsn35df1740a420',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };

    // axios.default.request(options).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // https://finnhub.io/api/v1/stock/recommendation?symbol=TSLA&token=c32dffiad3ieculvh350

  }


  // addIntraday = async () => {

  //   let allStocks = await axios.get('/stockApi/getAllStocks')

  //   console.log(allStocks);
  //   let i = 0;
  //   setInterval(() => {
  //     axios.get('http://api.marketstack.com/v1/intraday?access_key=75b6f2af2935400d9770adbdadf74a58&symbols=' + allStocks.data[i].ticker)
  //       .then(response => {
  //         axios.post('/stockApi/addIntraday', response.data)
  //           .then(ss => {
  //             console.log('from DATABASE', ss)
  //           })
  //           .catch(err => { console.error(err) })
  //       })
  //       .catch(err => console.error(err))
  //     i++;
  //   }, 5000)
  // }



  render() {
    return (
      <div>
        <button onClick={this.getTicker}>get the ticker!</button>
        <br></br>
        <button onClick={this.addIntraday}>add Intraday</button>
      </div>
    );
  }
}


export default GetTicker;