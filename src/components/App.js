import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import Teams from './teams/Teams'
import Dropdown from './dropdown/Dropdown'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/teams" component={Teams} />
            <Route path="/" component={Dropdown} />
        </Switch>
    </Router>
    );
  }
}

export default App;
