import React from 'react'

function Account({ cash, total }) {

   return (
      <div id="account">
         <div id="balance">Portfolio:<span className="amount"> $ {total && total.toFixed(2)}</span></div>
         <div id="cash">Cash: <span className="amount">${cash && cash}</span></div>
      </div>
   )
}


export default Account;