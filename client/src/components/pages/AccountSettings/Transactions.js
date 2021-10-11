import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withCookies } from 'react-cookie';

const Transactions = props => {
   const lastPath = localStorage.getItem('lastPath');
   const [transactions, setTransactions] = useState([]);
   useEffect(async () => {
      let transactionsArr;
      const userId = props.cookies.get('id');
      const allTransactions = await axios.get(process.env.REACT_APP_API_URL + `/stockApi/getAllTransactions?userId=${userId}`);
      transactionsArr = allTransactions.data;
      setTransactions(transactionsArr);
   }, [])

   return (
      <div id="transactions">
         <Link to={lastPath} className="back-btn"><i className="fas fa-2x fa-chevron-circle-left"></i></Link>
         <div className="heading">All transactions</div>
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
