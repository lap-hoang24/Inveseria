import React, { useState, useEffect} from 'react'
import { withCookies } from 'react-cookie';
import {withRouter} from 'react-router-dom';
import UserInfo from './UserInfo';
import Search from './Search';
import Portfolio from './Portfolio';
import News from './News';
import axios from 'axios';


function Home(props) {
   localStorage.setItem('lastPath', "/");
   const [state, setState] = useState({});
   const [loading, setLoading] = useState(true);
   

   useEffect(() => {
      const userId = props.cookies.get('id');
      const userInfo = axios.post('/auth/info', { userId });
      const userPortfo = axios.post('/stockApi/getUserPortfolio', { userId });
      // const marketNews = axios.get('https://finnhub.io/api/v1/news?category=general&token=c32dffiad3ieculvh350');

      Promise.all([userInfo, userPortfo]).then(values => {
         let portfolios = values[1].data.portfolios;
         let portfoIntra = values[1].data.portfoIntra;
         let userInfo = values[0].data;

         if (portfoIntra && portfolios) {
            portfolios.forEach(portfo => {
               for (let i = 0; i < portfoIntra.length; i++) {
                  if (portfo.ticker === portfoIntra[i].ticker) {
                     portfo.intra = portfoIntra[i].intraday
                  }
               }
            })
         }

         setState({ portfolios, portfoIntra, userInfo});
         setLoading(false);
      })
   }, []);

   const { portfolios, userInfo} = state;

   if (loading) {
      return (<div className="loading">LOADING...</div>)
   } else {
      return (
         <div id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Portfolio userPortfolio={portfolios} cash={userInfo.cash}/>
            <News />
         </div>
      )
   }
}

export default withCookies(Home);
