import React from 'react'

function UserInfo({ userInfo }) {
   return (
      <div id="user-info">
         <img className="user-picture" src={userInfo.data && userInfo.data.picture} alt="Inveseria user" />
         <div className="username">{userInfo.data && userInfo.data.username}</div>
      </div>
   )
}


export default UserInfo;

