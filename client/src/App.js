
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Account from './components/pages/Account/Account';
import Home from './components/pages/Home/Home';
import GetTicker from './components/auth/getTicker'
import StockDetails from './components/pages/StockDetails/StockDetails';
import Watchlist from './components/pages/Watchlist/Watchlist';
import Navbar from './components/layouts/Navbar';
import ProtectedRoute from './components/component/ProtectedRoute';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/getTicker" component={GetTicker} />
            <ProtectedRoute path='/account' isAuthenticated={true} component={Account} />
            <ProtectedRoute path="/viewstock/:ticker" isAuthenticated={true} component={StockDetails} />
            <ProtectedRoute path='/watchlist' isAuthenticated={true} component={Watchlist} />
            <ProtectedRoute path='/' isAuthenticated={true} component={Home} />
          </Switch>
          <Navbar />
        </Router>
      </div>
    )
  }
}


export default withCookies(App);
