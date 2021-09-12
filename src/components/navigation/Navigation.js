import React from 'react';
import { Link} from 'react-router-dom';

import './Navigation.scss';

import { Routes } from '../../utils/routes.js'

function Navigation () {
  return (
    <>
    <nav className='navigation-nav'>
    <ul className='navigation-list'>
        <li><Link to={Routes.TasksRoute}>Список заданий</Link></li>
        <li><Link to={Routes.UsersRoute}>Пользователи</Link></li>
        <li><Link to={Routes.SignInRoute}>Выход</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default Navigation;