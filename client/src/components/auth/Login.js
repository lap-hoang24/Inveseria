import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import Google from './Google';

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
      const { whatever } = this.props;
      console.log(whatever);

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
               <div className="col s5 offset-s2">{whatever.data ? whatever.data.username : "shit"}</div>
            </form>

            <Google />  
         </div>
      )
   }
}


const mapStateToProps = (state) => {
   return {
      whatever: state.userRed.user
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (userCredentials) => { dispatch(login(userCredentials)) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
