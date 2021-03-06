import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import { createStore } from 'redux'
import GroupReducer from '../reducers/groups'
import Teams from './teams/Teams'
import Groups from './groups/Groups'
import Group from './groups/Group'
import Dropdown from './dropdown/Dropdown'
import Header from './Header'

export const appStore = createStore(
    GroupReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render() {
    return (
      <Provider store={appStore}>
        <Router>
          <Switch>
              <Route exact path="/groups" component={Groups} />
              <Route path="/groups/:groupId" component={Group} />
              <Route path="/teams" component={Teams} />
              <Route path="/" component={Groups} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
