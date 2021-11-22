import React, { useEffect, useState } from 'react'
import BuyButton from './BuyButton'
import SellButton from './SellButton'
import PricePercent from './PricePercent';

function PricePercentButtons({ intraday, symbol, userCash, userPosition, tickerInfo, userId, history, jwt }) {
   const [randomNumber, setRandomNumber] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         let randomNum = Math.floor((Math.random() * 50));
         setRandomNumber(randomNum)
      }, 1500)

      return () => {
         clearInterval(interval);
      }
   }, [])

   let open = (intraday[randomNumber].open).toFixed(1);
   let close = (intraday[randomNumber].close).toFixed(1);
   let percent = (((open - close) / close) * 100).toFixed(2);
   percent <= 0 ? percent = -(Math.random()).toFixed(2) : percent = percent;
   let color = percent > 0 ? 'green' : 'red';
   let indicator = percent > 0 ? <i className="fas fa-sort-up green"></i> : <i className="fas fa-sort-down red "></i>

   return (
      <div className="price_btn-wrapper">
         <PricePercent open={open} percent={percent} color={color} indicator={indicator} />
         <div className="btn-wrapper">
            <BuyButton open={open} symbol={symbol} userCash={userCash} tickerInfo={tickerInfo} userId={userId} history={history} percent={percent} jwt={jwt} />
            <SellButton open={open} symbol={symbol} userPosition={userPosition} tickerInfo={tickerInfo} userId={userId} history={history} percent={percent}  jwt={jwt}/>
         </div>
      </div>
   )
}

export default PricePercentButtons
