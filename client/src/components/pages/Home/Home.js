import React, { Component } from 'react'
import { getUserInfo } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import Navbar from '../../layouts/Navbar';
import UserInfo from './UserInfo';
import Search from './Search';
import Account from './Account';
import Portfolio from './Portfolio';
import News from './News';

class Home extends Component {

   componentDidMount() {
      const id = this.props.cookies.get('id');
      this.props.getUserInfo({ id });
   }

   render() {
      const { userInfo } = this.props;

      console.log(userInfo)

      return (
         <div id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Account userInfo={userInfo} />
            <Portfolio />
            <News />
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
