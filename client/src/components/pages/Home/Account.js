import React from 'react'

function Account({ cash, total }) {
   return (
      <div id="account">
         <div id="balance">Portfolio:<span className="amount"> $ {total && (parseFloat(total.toFixed(2))+ parseFloat(cash)).toFixed(2)}</span></div>
         <div id="cash">Cash: <span className="amount">${cash && cash.toFixed(2)}</span></div>
      </div>
   )
}


export default Account;