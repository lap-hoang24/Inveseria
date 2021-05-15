import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getUserInfo } from '../../store/actions/authActions';
import { withCookies } from 'react-cookie';

class Login extends Component {
   state = {
      username: "",
      password: ""
   }

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.login(this.state);

      this.setState({
         username: "",
         password: ""
      })

      document.getElementById('login-form').reset();
   }

   componentDidMount() {
      const email = this.props.cookies.get('email');
      this.props.getUserInfo({ email })
   }

   render() {
      const { userInfo } = this.props;

      return (
         <div>
            <form id='login-form' onSubmit={this.handleSubmit} className="row">
               <div className="input-field col s4 offset-s4">
                  <input type="text" id="username" onChange={this.handleChange} />
                  <label htmlFor="username">Username</label>
               </div>
               <div className="input-field col s4 offset-s4">
                  <input type="text" id="password" onChange={this.handleChange} />
                  <label htmlFor="password">Password</label>
               </div>
               <button className=" btn col s4 offset-s4 red darken-2">Log In</button>

               <NavLink to="/signup">
                  <button className="btn col s4 offset-s4 green darken-2">Sign Up</button>
               </NavLink>
               {/* <div className="col s8 offset-s2"> */}
               <a href="http://localhost:5000/auth/google" className="btn btn-danger col"><span className="fa fa-google"></span> SignIn with Google</a>
               {/* </div> */}
               <button className="btn col s4 offset-s4 green darken-2"> <a href='http://localhost:5000/auth/logout'>Log Out</a></button>
            </form>

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
      login: (userCredentials) => { dispatch(login(userCredentials)) },
      getUserInfo: (email) => { dispatch(getUserInfo(email)) },
   }
}

export default withCookies(
   connect
      (mapStateToProps, mapDispatchToProps)
      (Login)
);
