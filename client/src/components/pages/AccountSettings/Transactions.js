import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';

const Transactions = props => {

   const [transactions, setTransactions] = useState([]);
   useEffect(async () => {
      let transactionsArr;
      const userId = props.cookies.get('id');
      const allTransactions = await axios.get(`/stockApi/getAllTransactions?userId=${userId}`);
      console.log(allTransactions.data)
      transactionsArr = allTransactions.data;

      // let arrLength = allTransactions.data.length;

      // if(new Date(allTransactions.data[0]._id).getTime() < new Date(allTransactions.data[arrLength - 1]._id).getTime()) {
      //    transactionsArr = allTransactions.data.reverse();
      // } else {
      //    transactionsArr = allTransactions.data;
      // }

      
      setTransactions(transactionsArr);
   }, [])

   return (
      <div id="transactions">
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
                              <div className={`${color} action`}> {action}</div>
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
