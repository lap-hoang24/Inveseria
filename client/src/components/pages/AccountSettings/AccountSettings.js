import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import axios from 'axios';
const greetings = ['Hi', 'Hello', 'Yo', 'Wassup', 'Hola', 'Salut', 'Chào'];


const AccountSettings = (props) => {
   const [userInfo, setUserInfo] = useState({});
   const [randomNum, setRandomNum] = useState(0);

   useEffect(() => {
      const userId = props.cookies.get('id');

      axios.post(process.env.REACT_APP_API_URL + '/auth/info', { userId })
         .then(response => {
            setRandomNum(Math.ceil(Math.random() * 6));
            setUserInfo(response.data)
         })
         .catch(err => { console.log(err) });
   }, [])

   return (
      <div id="account-settings">
         <div id="info-wrapper">
            <img src={userInfo.picture} alt="" />
            <div className="username">{greetings[randomNum]}, {userInfo.username}!</div>
         </div>

         <div id="link-wrapper">
            <Link className="link" to='/transactions'><i class="fab fa-typo3"></i>Transactions</Link>
         </div>
         <div id="signout">
            <button>Sign Out</button>
         </div>
      </div>
   )
}

export default withCookies(AccountSettings);
