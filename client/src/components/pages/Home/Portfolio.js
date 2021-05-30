import React, { useState, useEffect } from 'react'

function Portfolio({ cookies, userPortfolio, portfoIntra }) {
   const [randomNum, setRandomNum] = useState(0);
   let randomNumber = 0;
   useEffect(() => {
      setInterval(() => {
         randomNumber = Math.floor(Math.random() * 99);

         setRandomNum(randomNumber);
      }, 1500)
   }, [randomNumber])


   return (
      <div id="portfolio">

         {userPortfolio && userPortfolio.map(portfolio => {
            let open = portfolio.intra[randomNum].open;
            let close = portfolio.intra[randomNum].low;


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
   )
}

export default Portfolio;
