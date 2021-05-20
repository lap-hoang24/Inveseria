import React, { Component } from 'react'
import { getUserInfo } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import UserInfo from './UserInfo';
import Search from './Search';
import Account from './Account';

class Home extends Component {

   componentDidMount() {
      const id = this.props.cookies.get('id');
      this.props.getUserInfo({ id });
   }

   render() {
      const { userInfo } = this.props;

      return (
         <div id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo.data} />
               <Search />
            </div>
            <Account userInfo={userInfo.data}/>
            <Navbar />
         </div>
      )
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      userInfo: state.userReducer.user,
      cookies: ownProps.cookies
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getUserInfo: (id) => { dispatch(getUserInfo(id)) },
   }
}


export default withCookies(
   connect
      (mapStateToProps, mapDispatchToProps)
      (Home)
);
