import React, { useState, useEffect } from 'react'

function PricePercent({ open, color, indicator, percent }) {
   return (
      <div className="price-percent-wrapper">
         <div className='price'>$ {open}</div>
         <div className="percent_indicator-wrapper">
            <div className={`${color} percent`}>{percent}%</div>
            <div className="indicator">{indicator}</div>
         </div>
      </div>
   )
}

export default PricePercent
