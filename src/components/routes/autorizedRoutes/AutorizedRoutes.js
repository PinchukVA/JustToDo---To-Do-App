import React from 'react';
import { Route } from 'react-router-dom';

import {Users } from '../../../pages'
import { Navigation } from '../../../components'

const AutorizedRoutes = (props ) => {
  const { component: Component, path} = props
  return(
    <>
    <Navigation />
    <Route path={path}>
            <Component />
      </Route>
    </>  
  )
}

export default AutorizedRoutes;