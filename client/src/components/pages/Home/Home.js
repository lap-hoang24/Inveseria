import React, { Component, } from 'react'
import { getUserInfo } from '../../../store/actions/authActions';
import { getUserPortfolio, getPortfoIntra } from '../../../store/actions/stockActions'
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
      this.props.getUserPortfolio(id);
   }


   render() {
      const { userInfo, userPortfolio, portfoIntra } = this.props;
      console.log(this.props)

      if (portfoIntra && userPortfolio) {
         userInfo.totalBalance = userPortfolio.totalBalance;

         userPortfolio.forEach(portfo => {
            for (let i = 0; i < portfoIntra.length; i++) {
               if (portfo.ticker === portfoIntra[i].ticker) {
                  portfo.intra = portfoIntra[i].intraday
               }
            }
         })
      }

      return (
         <div id="home-page">
            <div id="user-info_search-wrapper">
               <UserInfo userInfo={userInfo} />
               <Search />
            </div>
            <Account userInfo={userInfo} userPortfolio={userPortfolio} />
            <Portfolio userPortfolio={userPortfolio} portfoIntra={portfoIntra} />
            <News />
            <Navbar />
         </div>
      )
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      userInfo: state.userReducer.user,
      userPortfolio: state.stockReducer.userPortfo,
      portfoIntra: state.stockReducer.portfoIntra,
      cookies: ownProps.cookies
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getUserInfo: userId => dispatch(getUserInfo({ userId })),
      getUserPortfolio: userId => dispatch(getUserPortfolio({ userId })),
      getPortfoIntra: portfo => dispatch(getPortfoIntra(portfo))
   }
}

export default withCookies(connect
   (mapStateToProps, mapDispatchToProps)
   (Home));
