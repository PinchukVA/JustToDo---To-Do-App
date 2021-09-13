import React  from 'react';


import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import './App.scss';
import './Normalize.scss';

import { Routes } from '../utils/routes.js'
import {AutorizedRoutes, NotAutorizedRoutes} from '../components/routes'
import { SignUp, SignIn, Tasks, Users, Home } from '../pages'
import { Navigation } from '../components/index.js'

function App() {


  return (
    <Router>

            <Route exact path={Routes.HomeRoute}>
                  <Home/>
            </Route>

          <Route exact path={Routes.SignInRoute}>
                <SignIn/>
          </Route>

          <Route exact path={Routes.SignUpRoute}>
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
