import React  from 'react';


import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import './App.scss';

import { Routes } from '../utils/routes.js'
import {AutorizedRoutes, NotAutorizedRoutes} from '../components/routes'
import { SignUp, SignIn, Tasks, Users, Home } from '../pages'
import { Navigation, Header } from '../components/index.js'

function App() {


  return (
    <Router>

            <Route exact path={Routes.HomeRoute}>
                  <Home/>
            </Route>

          <Route exact path={Routes.SignInRoute}>
                <Header/>
                <SignIn/>
          </Route>

          <Route exact path={Routes.SignUpRoute}>
                <Header/>
                <SignUp/>
          </Route>

          <Route exact path={Routes.UsersRoute}>
                <Navigation/>
                <Users/>
          </Route>

          <Route exact path={Routes.TasksRoute}>
                <Navigation/>
                <Tasks/>
          </Route>

    </Router>
  );
}

export default App;
