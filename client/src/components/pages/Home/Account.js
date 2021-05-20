import React from 'react'

function Account({ userInfo }) {
   return (
      <div id="account">
         <div id="balance">Balance: ${userInfo && userInfo.account.total}</div>
         <div id="power">Power: $0</div>
      </div>
   )
}


export default Account;