import React from 'react'

function Account({ userInfo }) {
   return (
      <div id="account">
         {/* <div id="balance">Portfolio:<span className="amount"> $ {userInfo && userInfo.totalBalance.toFixed(2)}</span></div> */}
         {/* <div id="cash">Cash: <span className="amount">${userInfo && userInfo.data.cash}</span></div> */}
      </div>
   )
}


export default Account;