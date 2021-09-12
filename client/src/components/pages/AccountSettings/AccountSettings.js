import React from 'react';
import { withCookies } from 'react-cookie';

const AccountSettings = (props) => {
   console.log(props.cookies.get('id'));

   return (
      <div id="account-settings">
         <h1>my account</h1>
      </div>
   )
}

export default withCookies(AccountSettings)
