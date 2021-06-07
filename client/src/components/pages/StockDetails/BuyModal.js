import React from 'react'

function BuyModal({ modalStyle, classes, tickerInfo, setNumOfShares, setBuyPrice }) {
   return (
      <div style={modalStyle} className={classes.paper} id="buy-modal">
         <div className="modal-content">
            <div className="ticker">{tickerInfo &&  tickerInfo[18].symbol}</div>
            <div className="price">{tickerInfo && tickerInfo[18].last}</div>
         </div>
         <p>Please enter number of shares</p>
         <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
         <button onClick={() => { setBuyPrice(tickerInfo[18].last) }} className="buy-btn">BUY</button>
      </div>
   )
}

export default BuyModal
