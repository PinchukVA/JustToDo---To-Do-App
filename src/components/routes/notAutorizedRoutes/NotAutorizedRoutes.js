import React from 'react';
import { Route } from 'react-router-dom';

const NotAutorizedRoutes = (props ) => {
  const { component: Component, path} = props
  return(
    <Route exact path={path}>
            <Component />
      </Route>
  )
}

export default NotAutorizedRoutes;