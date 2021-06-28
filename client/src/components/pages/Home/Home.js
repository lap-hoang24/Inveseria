import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import UserInfo from './UserInfo';
import Search from '../../component/Search';
import Portfolio from './Portfolio';
import News from './News';
import axios from 'axios';
import BuySellSnackBar from '../../component/BuySellSnackBar';
import Loading from '../../component/Loading';


function Home(props) {
   localStorage.setItem('lastPath', "/");
   const [state, setState] = useState({});
   const [loading, setLoading] = useState(true);
   const [action, setAction] = useState();
   const [message, setMessage] = useState('');


   useEffect(() => {
      const userId = props.cookies.get('id');
      const userInfo = axios.post('/auth/info', { userId });
      const userPortfo = axios.post('/stockApi/getUserPortfolio', { userId });
      const stockAction = sessionStorage.getItem('stockAction');

      if (stockAction) {
         const splitString = stockAction.split('-');
         if (splitString[0] === 'sell') {
            setAction(`sell`)
            setMessage(`Sold ${splitString[2]} ${splitString[1]}`);
         } else {
            setAction('buy');
            setMessage(`Bought ${splitString[2]} ${splitString[1]}`);
         }
      }

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

         setState({ portfolios, portfoIntra, userInfo });
         setLoading(false);
      })
   }, []);
   const { portfolios, userInfo } = state;

   if (loading) {
      return <Loading />
   } else {
      return (
         <main id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Portfolio userPortfolio={portfolios} cash={userInfo.cash} />
            <News />
            <BuySellSnackBar action={action} message={message} />
         </main>
      )
   }
}

export default withCookies(Home);
