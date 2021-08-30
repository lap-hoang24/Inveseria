import React, { useState, useEffect } from 'react'
import Account from './Account';
import { Link } from 'react-router-dom';


function Portfolio({ userPortfolio, cash }) {
   const [state, setState] = useState({ randomNumber: 0, totalAcc: 0 });

   useEffect(() => {
      const interval = setInterval(() => {
         let randomNumber = Math.floor(Math.random() * 99);
         let totalAcc = 0;
         userPortfolio.forEach(portfo => {
            totalAcc += portfo.tickerValue[0].intraday[randomNumber].open * portfo.numOfShares;
         })
         setState({ randomNumber, totalAcc });
      }, 1500)

      return () => {
         clearInterval(interval);
      }
   }, [])
   const { randomNumber, totalAcc } = state;

   return (
      <div id="portfolio-account-wrapper">
         <Account total={totalAcc} cash={cash} />

         <div id="portfolio">
            {userPortfolio?.map(portfolio => {
               let low = (portfolio.tickerValue[0].intraday[randomNumber].low).toFixed(1);
               let open = (portfolio.tickerValue[0].intraday[randomNumber].open).toFixed(1);
               let percentIntra = (((open - low) / low) * 100).toFixed(2);
               percentIntra <= 0 ? percentIntra = -(Math.random()).toFixed(2) : percentIntra = percentIntra;
               let percentPortfolio = (((open - portfolio.avgPrice) / portfolio.avgPrice) * 100).toFixed(2);
               let intraColor = percentIntra >= 0 ? "green" : "red";

               return (
                  <Link to={`/viewstock/${portfolio.ticker}`} key={portfolio._id} className='ticker-info'>
                     <div className="logo-symbol-wrapper">
                        <img className='logo' src={portfolio.tickerValue[0].logo} alt="" />
                        <div className="symbol-name-wrapper">
                           <div className="symbol">{portfolio.ticker}</div>
                           <div className="share">{portfolio.numOfShares > 1 ? `${portfolio.numOfShares} shares` : `${portfolio.numOfShares} share`}</div>
                        </div>
                     </div>

                     <div className="intra-percent-wrapper">
                        <div className={`price`}>{open}</div>
                        <div className={`percent ${intraColor}`}>% {percentIntra}</div>
                     </div>
                     <div className="price-percent-wrapper">
                        <div className={`price`}>$ {(open * portfolio.numOfShares).toFixed(2)}</div>
                        <div className={`percent`}> % {percentPortfolio}</div>
                     </div>
                  </Link>
               )
            })}
         </div>
      </div>
   )
}

export default Portfolio;
