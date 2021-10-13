import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import UserInfo from './UserInfo';
import Search from '../../global/Search';
import Portfolio from './Portfolio';
import News from '../../global/News';
import axios from 'axios';
import BuySellSnackBar from '../../global/BuySellSnackBar';
import RewardModal from '../../global/RewardModal';
import Loading from '../../global/Loading';
import { finnhubToken } from '../../../keys';


function Home(props) {
   localStorage.setItem('lastPath', "/");
   const [state, setState] = useState({});
   const [loading, setLoading] = useState(true);
   const [action, setAction] = useState();
   const [message, setMessage] = useState('');
   const generalMarketNews = 'https://finnhub.io/api/v1/news?category=general';
   const newsPeriod = '';
   const history = useHistory();

   useEffect(() => {
      const userId = props.cookies.get('id');
      const userInfo = axios.post(process.env.REACT_APP_API_URL + '/auth/info', { userId });
      const userPortfo = axios.post(process.env.REACT_APP_API_URL + '/stockApi/getUserPortfolio', { userId });
      const buySellData = history.location.state;

      if (buySellData) {
         const { action, numOfShares, ticker, price } = buySellData;
         setAction(action);
         setMessage(`${action} ${numOfShares} ${ticker} at $${price}`);
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
