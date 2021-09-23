import React from 'react';
import { Link } from 'react-router-dom';

function UserInfo({ userInfo }) {
   return (
      <Link to={'/account'} id="user-info">
         <img className="user-picture" src={userInfo && userInfo.picture} alt="Inveseria user" />
         <div className="username">{userInfo && userInfo.username}</div>
      </Link>
   )
}


export default UserInfo;

