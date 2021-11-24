import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { withCookies } from 'react-cookie';
import Navbar from '../layouts/Navbar';



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

   render() {

      // const LoginForm = (
      //    <div>
      //       <form id='login-form' onSubmit={this.handleSubmit} className="row">
      //          <div className="input-field col s4 offset-s4">
      //             <input type="text" id="username" onChange={this.handleChange} />
      //             <label htmlFor="username">Username</label>
      //          </div>
      //          <div className="input-field col s4 offset-s4">
      //             <input type="text" id="password" onChange={this.handleChange} />
      //             <label htmlFor="password">Password</label>
      //          </div>
      //          <button className=" btn col s4 offset-s4 red darken-2">Log In</button>

      //          <Link to="/signup">
      //             <button className="btn col s4 offset-s4 green darken-2">Sign Up</button>
      //          </Link>

      //          <button className="btn col s4 offset-s4 green darken-2"> <a href='http://localhost:5000/auth/logout'>Log Out</a></button>
      //       </form>
      //    </div>
      // )

      return (
         <div id="login-page">
            {/* {LoginForm} */}

            <div id="main-wrapper">
               <div id="square">
                  <div id="square-text">Inveseria.</div>
               </div>
               <div id='google-link'>
                  <a href="/auth/google" className="col s4 offset-s4 btn btn-danger"><span className="fa fa-google"></span> Sign In with Google</a>
               </div>
               <div id='github-link'>
                  <a href="/auth/github" className="col s4 offset-s4 btn btn-danger"><span className="fab fa-github"></span> Sign In with Github</a>
               </div>
               <div id='anonymous-link'>
                  <a href={`/auth/anonymous`} className="col s4 offset-s4 btn btn-danger"><span class="fas fa-mask"></span> Sign In Anonymously</a>
               </div>
            </div>
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
      login: (userCredentials) => { dispatch(login(userCredentials)) },
   }
}

export default withCookies(
   connect
      (mapStateToProps, mapDispatchToProps)
      (Login)
);
