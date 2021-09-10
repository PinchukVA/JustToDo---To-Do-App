import React from 'react';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { SignUp, SignIn, Tasks, Users } from '../pages'
import { Navigation } from '../components'

function App() {
  return (
    <Router>

      <Route path='/'>
            <Navigation />
      </Route>

      <Route exact path='/signUp'>
            <SignUp />
      </Route>

      <Route exact path='/signIn'>
            <SignIn />
      </Route>

      <Route exact path='/tasks'>
            <Tasks />
      </Route>

      <Route exact path='/users'>
            <Users />
      </Route>

    </Router>
  );
}

export default App;
