import React from 'react';
import { Route } from 'react-router-dom';

import {SignIn } from '../../../pages'

const NotAutorizedRoutes = (props ) => {
  const { component: Component, path} = props
  return(
    <Route path={path}>
            <Component />
      </Route>
  )
}

export default NotAutorizedRoutes;