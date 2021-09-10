import React from 'react';
import { Link} from 'react-router-dom';

import './Navigation.scss';

function Navigation () {
  return (
    <>
      <h1> Привет я стартовая страница 1</h1>
      <ul>
        <li><Link to='/signIn'>Логин</Link></li>
        <li><Link to='/signUp'>Регистрация</Link></li>
        <li><Link to='/users'>Пользователи</Link></li>
        <li><Link to='/tasks'>Список заданий</Link></li>
      </ul>
    </>
  )
}

export default Navigation;