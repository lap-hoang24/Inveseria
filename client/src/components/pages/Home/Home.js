import React, { useState, useEffect } from 'react'
import { withCookies } from 'react-cookie';
import UserInfo from './UserInfo';
import Search from '../../add-ons/Search';
import Portfolio from './Portfolio';
import News from '../../add-ons/News';
import axios from 'axios';
import BuySellSnackBar from '../../add-ons/BuySellSnackBar';
import RewardModal from '../../add-ons/RewardModal';
import Loading from '../../add-ons/Loading';
import { finnhubToken } from '../../../keys';


function Home(props) {
   localStorage.setItem('lastPath', "/");
   const [state, setState] = useState({});
   const [loading, setLoading] = useState(true);
   const [action, setAction] = useState();
   const [message, setMessage] = useState('');
   const generalMarketNews = 'https://finnhub.io/api/v1/news?category=general';
   const newsPeriod = '';


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
         let portfolios = values[1].data;
         let userInfo = values[0].data;

         setState({ portfolios, userInfo });
         setLoading(false);
      })
   }, []);

   const { portfolios, userInfo } = state;

   if (loading) {
      return <Loading />
   } else {
      return (
         <main id="home">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Portfolio userPortfolio={portfolios} cash={userInfo.cash} />
            <News token={finnhubToken} type={generalMarketNews} period={newsPeriod} heading={'Market News'} />
            <BuySellSnackBar action={action} message={message} />
            <RewardModal openModal={!userInfo.acceptedReward} userId={userInfo._id} />
         </main>
      )
   }
}

export default withCookies(Home);
