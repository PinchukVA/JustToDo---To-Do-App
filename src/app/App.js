import React from 'react';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.scss';

import  SignUp  from '../pages/signUp/SignUp.js'
import  SignIn  from '../pages/signIn/SignIn.js';
import  Tasks  from '../pages/tasks/Tasks.js';
import  Users  from '../pages/users/Users.js';
import  Main  from '../components/main/Main.js'

function App() {
  return (
    <Router>

      <Route path="/">
            <Main />
      </Route>

      <Route exact path="/register">
            <SignUp />
      </Route>

      <Route exact path="/login">
            <SignIn />
      </Route>

      <Route exact path="/tasks">
            <Tasks />
      </Route>

      <Route exact path="/users">
            <Users />
      </Route>

    </Router>
  );
}

export default App;
