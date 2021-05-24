import React, { Component } from 'react'
import axios from 'axios'

class PortfolioStock extends Component {

   state = {
      tickerInfo: {}
   }

   componentDidMount() {
      axios.get("/stockApi/getIntraday/TSLA")
         .then(response => {
            const latestData = response.data.intraday[8];
            this.setState({
               tickerInfo: {
                  open: latestData.open,
                  high: latestData.high,
                  low: latestData.low,
                  last: latestData.last,
                  close: latestData.close,
                  volume: latestData.volume,
                  data: latestData.date,
                  symbol: latestData.symbol,
                  image: response.data.logo,
                  name: response.data.companyName
               }
            })
         })
         .catch(err => { console.error(err) })
   }



   render() {
      const { tickerInfo } = this.state;

      let percent = tickerInfo && String(((tickerInfo.last - tickerInfo.close) / tickerInfo.close) * 100).slice(0, 4);
      let percentString = percent.slice(0, 5)

      // if (percent < 0) {
      //    document.getElementsByClassName[0].addClass = 'red';
      // }

      return (
         <div className='ticker-info'>
            <div className="logo-symbol-wrapper">
               <img className='logo' src={tickerInfo && tickerInfo.image} alt="" />
               <div className="symbol-name-wrapper">
                  <div className="symbol">{tickerInfo && tickerInfo.symbol}</div>
                  <div className="company-name">{tickerInfo && tickerInfo.name}</div>
               </div>
            </div>
            <div className="price-percent-wrapper">
               <div className='price'>$ {tickerInfo && tickerInfo.last}</div>
               <div className="percent">{percentString}%</div>
            </div>
         </div>
      )
   }
}

export default PortfolioStock;
