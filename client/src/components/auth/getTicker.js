import React from 'react';
import axios from 'axios';

class GetTicker extends React.Component {

  getTicker = () => {

    let allTickers = ['TSLA', 'AAPL', 'AMZN', 'SQ', 'AAL', 'ABNB', 'NIO', 'BABA', 'MSFT', 'NKLA', 'JD', 'FB', 'BIDU', 'QCOM','EBAY','GOOG','AMD','NVDA','GME','AMC','AIG','M','CCL','PLTR','F','GM','SPY','T','PLUG','QQQ','UBER','UAL','WISH','SPCE','PFE','TLRY',];

    let i = 0;
    setInterval(() => {
      axios.get(`https://api.polygon.io/v1/meta/symbols/${allTickers[i]}/company?&apiKey=4c29ZOYHHDcJ9B9i1JSUWL8pFs2ZfphS`)
        .then(response => {
          axios.post('/getTicker', response)
            .then(resDB => { console.log(resDB); })
            .catch(err => { console.log(err) })
        })
        .catch(err => console.error(err));
      i++;
    }, 21000)
  }

  render() {
    return (
      <div>
        <button onClick={this.getTicker}>get the ticker!</button>
      </div>
    );
  }
}


export default GetTicker;