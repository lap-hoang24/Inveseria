import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { PieChart } from './PieChart';
import axios from 'axios';

import ApexCharts from "apexcharts";
const greetings = ['Hi', 'Hello', 'Yo', 'Wassup', 'Hola', 'Salut', 'Chào'];


const AccountSettings = (props) => {
   localStorage.setItem('lastPath', "/account");
   const [userInfo, setUserInfo] = useState({});
   const [randomNum, setRandomNum] = useState(0);

   useEffect(() => {
      const userId = props.cookies.get('id');
      const userInfo = axios.post(process.env.REACT_APP_API_URL + '/stockApi/getUserPortfolio', { userId });
      const userPortfo = axios.post(process.env.REACT_APP_API_URL + '/auth/info', { userId });

      Promise.all([userInfo, userPortfo]).then(values => {
         let portfolios = values[0].data;
         let info = values[1].data;
         let totalAccount = 0;

         portfolios.forEach(portfo => {
            totalAccount += portfo.numOfShares * portfo.tickerValue[0].intraday[0].high;
         })

         let processInfo = {
            join: new Date(info?.createdAt).toLocaleDateString(),
            total: totalAccount,
            username: info?.username,
            picture: info?.picture,
         }
         setRandomNum(Math.ceil(Math.random() * 6));
         setUserInfo(processInfo)
      })
   }, [])

   return (
      <div id="account-settings">
         <div id="info-wrapper">
            <img src={userInfo.picture} alt="" />
            <div className="username">{greetings[randomNum]}, {userInfo?.username}!</div>
         </div>

         <div id="link-wrapper">
            <Link className="link" to='/transactions'><i className="far fa-list-alt"></i>Transactions</Link>
         </div>

         <div id="user-info">
            <div className="join">Joined on: {userInfo?.join}</div>
            <div className="return">Gain: {userInfo?.total?.toFixed(2)}</div>
         </div>

         <div id="signout">
            <button>Sign Out</button>
         </div>
      </div>
   )
}

export default withCookies(AccountSettings);
