import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import authAxios from '../../api/axiosAuth';


const Transactions = props => {
   const lastPath = localStorage.getItem('lastPath');
   const [transactions, setTransactions] = useState([]);

   useEffect(async () => {
      let transactionsArr;

      const allTransactions = await authAxios.get(process.env.REACT_APP_API_URL + `/stockApi/getAllTransactions`);
      transactionsArr = allTransactions.data;
      setTransactions(transactionsArr);
   }, [])

   return (
      <div id="transactions">

         <div className="heading">
            <Link to={lastPath} className="back-btn"><i className="fas fa-chevron-circle-left"></i></Link>
            <div className='header'>All Transactions</div>
            <div className="dummy"></div>
         </div>
         {transactions && transactions.map(trans => {
            return (
               <div key={trans._id} className="day-transaction">
                  <div className="date"> {trans._id.split('-').reverse().join('-')}</div>
                  {trans.transaction.map(transac => {
                     let color = transac.action === "buy" ? "green" : "red";
                     let action = transac.action === "buy" ? <i className="fas fa-plus"></i> : <i className="fas fa-minus"></i>;
                     return (
                        <div key={transac._id} className="transaction">
                           <div className="wrapper">
                              <div className={`${color} action`}>{action}</div>
                              <div className="info-wrapper">
                                 <div className="numOfShares">{transac.numOfShares}</div>
                                 <div className="ticker">{transac.ticker}</div>
                                 <div className="price">@{transac.price}</div>
                              </div>
                           </div>
                           <div className="lower-wrapper">
                              <div className="time">{transac.createdAt.slice(11, 19)}</div>
                           </div>
                        </div>
                     )
                  })}
               </div>
            )
         })}
      </div>
   )
}

export default withCookies(Transactions);
