import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import authAxios from '../../api/axiosAuth';
const greetings = ['Hi', 'Hello', 'Yo', 'Wassup', 'Hola', 'Salut', 'Chào'];


const AccountSettings = (props) => {
   localStorage.setItem('lastPath', "/account");
   const [userInfo, setUserInfo] = useState({});
   const [randomNum, setRandomNum] = useState(0);
   const history = useNavigate();

   const signOut = () => {
      props.cookies.set('jwt', '');

      return history.push('/login');
   }

   useEffect(() => {
      const userInfo = authAxios.post(process.env.REACT_APP_API_URL + '/stockApi/getUserPortfolio');
      const userPortfo = authAxios.post(process.env.REACT_APP_API_URL + '/auth/info');


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
            <button onClick={signOut}>Sign Out</button>
         </div>
      </div>
   )
}

export default withCookies(AccountSettings);
