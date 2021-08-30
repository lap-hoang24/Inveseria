import React from 'react'

const NewsTime = ({ timeStamp }) => {

   let now = (new Date().getTime() / 1000).toFixed(0);
   let difference = now - timeStamp;
   let hour = difference / 3600;
   let minute = ((difference % 3600) / 60).toFixed(0);
   hour = ("" + hour).slice(0, 1);

   return (
      <div className="time">
         {hour}h {minute}min ago
      </div>
   )
}

export default NewsTime
