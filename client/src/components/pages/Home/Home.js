import React, { Component, useState, useEffect, createContext } from 'react'
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import UserInfo from './UserInfo';
import Search from './Search';
import Account from './Account';
import Portfolio from './Portfolio';
import News from './News';
import axios from 'axios';



function Home(props) {

   const [userInfo, setUserInfo] = useState();
   const [userPortfolio, setUserPortfolio] = useState();
   const [portfoIntra, setPortfoIntra] = useState();
   let totalBalance = 0;


   useEffect(() => {
      const userId = props.cookies.get('id');
      const userInfo = axios.post('/auth/info', { userId });
      const userPortfo = axios.post('/stockApi/getUserPortfolio', { userId });

      Promise.all([userInfo, userPortfo]).then(values => {
         // console.log(values);
         setUserInfo(values[0].data);
         setUserPortfolio(values[1].data.portfolios);
         setPortfoIntra(values[1].data.portfoIntra);

      })
   }, []);

  
   if (portfoIntra && userPortfolio) {
      userPortfolio.forEach(port => {
         totalBalance += port.avgPrice * port.numOfShares;
      })

      userPortfolio.totalBalance = totalBalance;

      userPortfolio.forEach(portfo => {
         for (let i = 0; i < portfoIntra.length; i++) {
            if (portfo.ticker === portfoIntra[i].ticker) {
               portfo.intra = portfoIntra[i].intraday
            }
         }
      })
   }


   console.log(userPortfolio);

   return (
      <div id="home-page">
         <div id="user-info_search-wrapper">
            <UserInfo userInfo={userInfo} />
            <Search />
         </div>
         {/* <Account userInfo={userInfo} userPortfolio={userPortfolio} /> */}
         {/* <Portfolio userPortfolio={userPortfolio} portfoIntra={portfoIntra} />
         <News /> */}
         <Navbar />
      </div>
   )
}

export default withCookies(Home);
