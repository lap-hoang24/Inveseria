import React, { Component } from 'react'
import { getUserInfo } from '../../../store/actions/authActions';
import { getUserPortfolio } from '../../../store/actions/stockActions'
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
      this.props.getUserInfo(id);
      this.props.getUserPortfolio(id)
   }

   render() {
      const { userInfo, userPortfolio } = this.props;

      console.log(this.props)
      // if (userInfo && userPortfolio) {
      //    userInfo.totalBalance = userPortfolio.totalBalance;
      // }

      return (
         <div id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Account userInfo={userInfo} />
            <Portfolio userPortfolio={userPortfolio} />
            <News />
            <Navbar />
         </div>
      )
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      userInfo: state.userReducer.user,
      userPortfolio: state.stockReducer.portfolios,
      cookies: ownProps.cookies
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getUserInfo: (userId) => { dispatch(getUserInfo({ userId })) },
      getUserPortfolio: (userId) => { dispatch(getUserPortfolio({ userId })) },
   }
}


export default withCookies(
   connect
      (mapStateToProps, mapDispatchToProps)
      (Home));
