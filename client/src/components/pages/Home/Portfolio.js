import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import axios from 'axios'

function Portfolio({ cookies }) {
   let userId = cookies.get('id');

   const [portfolios, setPortfolios] = useState([]);
   const [portfolioBalance, setPortfolioBalance] = useState(0);


   // TRANSFER THIS TO HOME PARENT COMPONENT
   
   useEffect(() => {
      const getUserPortfolio = async () => {
         let totalBalance = 0;
         let portfolios = await axios.post('/stockApi/getUserPortfolio', { userId });
         console.log(portfolios);

         portfolios.data.forEach(port => {
            totalBalance += port.avgPrice * port.numOfShares;
         })
         console.log(totalBalance);
         setPortfolios(portfolios.data)
         setPortfolioBalance(totalBalance)
      }
      getUserPortfolio();
   }, [])

   return (
      <div id="portfolio">
         {portfolios && portfolios.map(portfolio => {
            return (
               <div key={portfolio._id} className='ticker-info'>
                  <div className="logo-symbol-wrapper">
                     <img className='logo' src={portfolio.logo} alt="" />
                     <div className="symbol-name-wrapper">
                        <div className="symbol">{portfolio.ticker}</div>
                        <div className="company-name">{portfolio.numOfShares} shares</div>
                     </div>
                  </div>
                  <div className="price-percent-wrapper">
                     <div className='price'>$ {portfolio.avgPrice.toFixed(2)}</div>
                     {/* <div className="percent">{portfolio.numOfShares}%</div> */}
                  </div>
               </div>
            )
         })}

      </div>
   )
}

export default withCookies(Portfolio);
