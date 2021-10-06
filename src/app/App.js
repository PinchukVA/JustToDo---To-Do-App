import React  from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import './Normalize.scss';

import { Routes } from '../utils/routes.js'
import {
    AutorizedRoutes, 
    NotAutorizedRoutes
} from '../components/routes'
import { 
    SignUp, 
    SignIn, 
    Tasks, 
    Users, 
    Home 
} from '../pages'

function App() {

  const {token, role} = useSelector( data => data.Reducer)

  return (
    <Router>

            < NotAutorizedRoutes 
                  path={Routes.HomeRoute}
                  component = {Home}
            />

            < NotAutorizedRoutes 
                  path={Routes.SignInRoute}
                  component = {SignIn}
            />

            < NotAutorizedRoutes 
                  path={Routes.SignUpRoute}
                  component = {SignUp}
            />

            < AutorizedRoutes 
                  path={Routes.UsersRoute}
                  component = {Users}
                  isAutorized = {Boolean(token)}
                  hasPermision={role === 'admin'}
            />

            < AutorizedRoutes 
                  path={Routes.TasksRoute}
                  component = {Tasks}
                  isAutorized = {Boolean(token)}
                  hasPermision={role === 'user'}
            />

            < AutorizedRoutes 
                  path='/tasks/:user_Id'
                  component = {Tasks}
                  isAutorized = {Boolean(token)}
                  hasPermision={role === 'admin'}
            />

    </Router>
  );
}

export default App;
