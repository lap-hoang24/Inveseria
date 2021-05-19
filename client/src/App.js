
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/pages/Home';
import GetTicker from './components/auth/getTicker'

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/getTicker" component={GetTicker} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default withCookies(App);
