import React, { useState, useEffect } from 'react'
import Account from './Account';

function Portfolio({ userPortfolio, cash }) {
   const [randomNum, setRandomNum] = useState({});
   useEffect(() => {
      setInterval(() => {
         let randomNumber = Math.floor(Math.random() * 99);
         let totalAcc = 0;
         userPortfolio.forEach(portfo => {
            totalAcc += portfo.intra[randomNumber].open * portfo.numOfShares;
         })

         setRandomNum({ randomNumber, totalAcc });
      }, 1500)
   }, [])
   const { randomNumber, totalAcc } = randomNum;

   if (randomNumber) {
      return (
         <div id="portfolio-acount-wrapper">
            <Account total={totalAcc} cash={cash} />
            <div id="portfolio">
               {userPortfolio && userPortfolio.map(portfolio => {
                  let open = portfolio.intra[randomNumber].open;
                  let close = portfolio.intra[randomNumber].low;
                  return (
                     <div key={portfolio._id} className='ticker-info'>
                        <div className="logo-symbol-wrapper">
                           <img className='logo' src={portfolio.logo} alt="" />
                           <div className="symbol-name-wrapper">
                              <div className="symbol">{portfolio.ticker}</div>
                              <div className="company-name">{portfolio.numOfShares} shares</div>
                           </div>
                        </div>

                        <div className="intra-percent-wrapper">
                           <div className="price">{open}</div>
                           <div className="percent">% {(((open - close) / close) * 100).toFixed(2)}</div>
                        </div>
                        <div className="price-percent-wrapper">
                           <div className='price'>$ {(open * portfolio.numOfShares).toFixed(2)}</div>
                           <div className="percent"> % {(((open - portfolio.avgPrice) / portfolio.avgPrice) * 100).toFixed(2)}</div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      )
   } else {
      return (
         <div id="portfolio"> <span style={{ padding: '10px 10px' }}>Loading portfolio...</span></div>
      )
   }
}

export default Portfolio;
