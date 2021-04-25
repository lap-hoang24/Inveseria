import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';

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
   }

   render() {
      const { whatever } = this.props;
      let Name = whatever.data ? whatever.data.username : "Guy";

      return (
         <div>
            <form onSubmit={this.handleSubmit} className="row">
               <div className="input-field col s12">
                  <input type="text" id="username" onChange={this.handleChange} />
                  <label htmlFor="username">Username</label>
               </div>
               <div className="input-field col s12">
                  <input type="text" id="password" onChange={this.handleChange} />
                  <label htmlFor="password">Password</label>
               </div>
               <button className="btn col s12 red darken-2">Log In</button>
            </form>
            <div className="col s12"> Hello, {Name}!</div>
         </div>
      )
   }
}


const mapStateToProps = (state) => {
   return {
      whatever: state.user.user
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      login: (userCredentials) => { dispatch(login(userCredentials)) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
