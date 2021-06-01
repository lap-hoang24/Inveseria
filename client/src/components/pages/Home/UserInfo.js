import React from 'react'

function UserInfo({ userInfo }) {
   return (
      <div id="user-info">
         <img className="user-picture" src={userInfo && userInfo.picture} alt="Inveseria user" />
         <div className="username">{userInfo && userInfo.username}</div>
      </div>
   )
}


export default UserInfo;
