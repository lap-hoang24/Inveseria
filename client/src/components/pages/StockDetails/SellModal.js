import React from 'react'

function SellModal({ modalStyle, classes, tickerInfo, setNumOfShares, setSellPrice }) {
   return (
      <div style={modalStyle} className={classes.paper} id="sell-modal">
         <div className="modal-content">
            <div className="ticker">{tickerInfo && tickerInfo[18].symbol}</div>
            <div className="price">{tickerInfo && tickerInfo[18].last}</div>
         </div>
         <p>Please enter number of shares</p>
         <input id='numOfShares' onChange={(event) => { setNumOfShares(event.target.value) }} type="text" autoComplete="off" />
         <button onClick={() => { setSellPrice(tickerInfo[18].last) }} className="sell-btn">SELL</button>
      </div>
   )
}

export default SellModal
