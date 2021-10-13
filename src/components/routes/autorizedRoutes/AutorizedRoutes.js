import React from 'react';
import { Route, Redirect} from 'react-router-dom';

import { Navigation } from '../../../components'
import { Routes } from '../../../utils/routes'

const AutorizedRoutes = (props ) => {
  const { component: Component, path, isAutorized, hasPermision} = props
  return(
    <>
    <Route exact path={path}>
      { isAutorized && hasPermision ?
        <>
        <Navigation />
        <Component />
        </> : 
        <Redirect to={Routes.SignInRoute} />
      }      
      </Route>
    </>  
  )
}

export default AutorizedRoutes;