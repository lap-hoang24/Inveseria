import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signup } from '../../store/actions/authActions';

class Signup extends Component {
   state = {
      username: '',
      password: '',
      email: '',
   }

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.signup(this.state);

      this.setState({
         username: '',
         password: '',
         email: '',
      })

      document.getElementById('signup-form').reset();
   }
   render() {
      console.log(this.props);
      return (
         <div>
            <form id="signup-form" onSubmit={this.handleSubmit} className="row">
               <div className="input-field col s4 offset-s4">
                  <input id="username" type="text" onChange={this.handleChange} />
                  <label htmlFor="username">Username</label>
               </div>
               <div className="input-field col s4 offset-s4">
                  <input id="email" type="text" onChange={this.handleChange} />
                  <label htmlFor="email">Email</label>
               </div>
               <div className="input-field col s4 offset-s4">
                  <input id="password" type="text" onChange={this.handleChange} />
                  <label htmlFor="password">Password</label>
               </div>
               <button className="btn col s4 offset-s4 red darken-2">Sign up!</button>
               <NavLink to="/login">
                  <button className="btn col s4 offset-s4 green darken-2">Log In</button>
               </NavLink>
               <div className="col s5 offset-s1">{this.props.message.message}</div>
            </form>
         </div>
      )
   }
}


const mapStateToProps = (state) => {
   return {
      message: state.userRed.message,
      user: state.userRed.user
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      signup: (userInfo) => { dispatch(signup(userInfo)) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
