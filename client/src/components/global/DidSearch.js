import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DidSearch = ({ show, userId }) => {
   const [showIt, setShowIt] = useState(show);
   let didSearch = showIt ? 'show' : '';


   const didSearchClick = () => {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/updateDidSearch`, { userId })
         .then(response => {
            setShowIt(true)
         })
         .catch(err => console.error(err));
   }

   useEffect(() => {

   }, [showIt])


   return (
      <div id={`did-search`} className={`${didSearch}`}>
         <div className="message">Search for your stock here!</div>
         <div className="arrow"></div>
         <button onClick={didSearchClick} className="confirm-did-search"><i className="fas fa-times"></i> OK, Will do!</button>
      </div>
   )
}

export default DidSearch
