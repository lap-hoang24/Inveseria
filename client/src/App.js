
import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Transactions from './components/pages/AccountSettings/Transactions';
import Home from './components/pages/Home/Home';
import GetTicker from './components/auth/getTicker'
import StockDetails from './components/pages/StockDetails/StockDetails';
import Watchlist from './components/pages/Watchlist/Watchlist';
import AccountSettings from './components/pages/AccountSettings/AccountSettings';
import Navbar from './components/layouts/Navbar';
import ProtectedRoute from './components/global/ProtectedRoute';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path='/account' isAuthenticated={true} element={<AccountSettings />} />
            <Route path='/transactions' isAuthenticated={true} element={<Transactions />} />
            <Route path="/viewstock/:ticker" isAuthenticated={true} element={<StockDetails />} />
            <Route path='/watchlist' isAuthenticated={true} element={<Watchlist />} />
            <Route path='/' isAuthenticated={true} element={<Home />} />
          </Routes>
          <Navbar />
        </Router>
      </div>
    )
  }
}


export default withCookies(App);
