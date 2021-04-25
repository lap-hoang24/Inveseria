
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <Switch>
            {/* <Route exact path="/" component={Main} /> */}
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
