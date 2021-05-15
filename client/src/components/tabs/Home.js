import React, { Component } from 'react'
import { getUserInfo } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

class Home extends Component {

   constructor(props) {
      super(props);
      const id = props.cookies.get('id');
      props.getUserInfo({ id });
   }

   // componentDidMount() {
   //    const email = this.props.cookies.get('email');
   //    this.props.getUserInfo({ email })
   // }

   render() {
      const { userInfo } = this.props;
      return (
         <div>
            <div className="welcome">Welcome, {userInfo.data ? userInfo.data.username : ''}</div>
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
