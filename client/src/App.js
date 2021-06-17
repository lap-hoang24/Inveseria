
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/pages/Home/Home';
import GetTicker from './components/auth/getTicker'
import StockDetails from './components/pages/StockDetails/StockDetails';
import Watchlist from './components/pages/Watchlist/Watchlist';
import Navbar from './components/layouts/Navbar';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/getTicker" component={GetTicker} />
            <Route path="/viewstock/:ticker" component={StockDetails} />
            <Route path="/watchlist" component={Watchlist} />
          </Switch>
          <Navbar />
        </Router>
      </div>
    )
  }
}


export default withCookies(App);
