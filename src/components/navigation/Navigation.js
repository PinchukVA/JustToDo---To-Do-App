import React from 'react';
import { Link} from 'react-router-dom';

import './Navigation.scss';

import { Routes } from '../../utils/routes.js'

function Navigation () {
  return (
    <>
      <nav className='navigation-nav'>
        <ul className='navigation-list'>
          <li><Link to={Routes.SignInRoute} style={{ textDecoration: 'none' }}>Выход</Link></li>
       </ul>
     </nav>
    </>
  )
}

export default Navigation;