
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default withCookies(App);
