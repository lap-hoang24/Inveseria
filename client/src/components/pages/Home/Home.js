import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import { useNavigate, useLocation } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> efcc94916bbd001302c6a66acc103fd342aba46c
import { withCookies } from 'react-cookie';
import UserInfo from './UserInfo';
import Search from '../../global/Search';
import Portfolio from './Portfolio';
import News from '../../global/News';
import BuySellSnackBar from '../../global/BuySellSnackBar';
import RewardModal from '../../global/RewardModal';
import DidSearch from '../../global/DidSearch';
import Loading from '../../global/Loading';
import { finnhubToken } from '../../../keys';
import authAxios from '../../api/axiosAuth';
import { LINK_GENERAL_MARKET_NEWS } from '../../global/Constants'


function Home(props) {

   localStorage.setItem('lastPath', "/");
   const [state, setState] = useState({});
   const [loading, setLoading] = useState(true);
   const [action, setAction] = useState();
   const [message, setMessage] = useState('');
   const newsPeriod = '';
<<<<<<< HEAD
   const location = useLocation();
=======
   const history = useNavigate();
>>>>>>> efcc94916bbd001302c6a66acc103fd342aba46c

   useEffect(() => {

      const userInfo = authAxios.post('/auth/info');
      const userPortfo = authAxios.post('/stockApi/getUserPortfolio');
      const buySellData = location.state;

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
            <News token={finnhubToken} type={LINK_GENERAL_MARKET_NEWS} period={newsPeriod} heading={'Market News'} />
            <BuySellSnackBar action={action} message={message} />
            <RewardModal openModal={!userInfo.acceptedReward} />
            <DidSearch show={userInfo.didSearch} />
         </main>
      )
   }
}

export default withCookies(Home);
