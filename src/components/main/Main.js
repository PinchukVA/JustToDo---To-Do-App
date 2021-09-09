import React from 'react';
import { Link} from "react-router-dom";

import './Main.scss';

function Main () {
  return (
    <>
      <h1> Привет я стартовая страница 1</h1>
      <ul>
        <li><Link to="/login">Логин</Link></li>
        <li><Link to="/register">Регистрация</Link></li>
        <li><Link to="/users">Пользователи</Link></li>
        <li><Link to="/tasks">Список заданий</Link></li>
      </ul>
    </>
  )
}

export default Main;