import React, { Component } from 'react'
import { getUserInfo } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import Navbar from '../layouts/Navbar';

class Home extends Component {

   componentDidMount() {
      const id = this.props.cookies.get('id');
      this.props.getUserInfo({ id });
   }

   render() {
      const { userInfo } = this.props;
      return (
         <div id="home-page">
            <div className="welcome">Welcome, {userInfo.data ? userInfo.data.user.username : ''}</div>
            <div className="account">Net Worth: $ 4000.00</div>
            <div className="account">Buying Power: ${userInfo.data ? userInfo.data.account.total : '0'}</div>
            <img style={{ height:'30px', width:'30px'}} src={userInfo.data ? userInfo.data.user.picture : '0'} alt="" />
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
      getUserInfo: (email) => { dispatch(getUserInfo(email)) },
   }
}


export default withCookies(
   connect
      (mapStateToProps, mapDispatchToProps)
      (Home)
);
