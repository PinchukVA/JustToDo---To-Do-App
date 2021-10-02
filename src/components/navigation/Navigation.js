import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';


import './Navigation.scss';

import { Routes } from '../../utils/routes.js'
import { signIn, addUsersList } from '../../redux/actions/Actions';

function Navigation () {

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = () => {
    const addTostate = {
      token:'', 
      role:'' 
    }
    dispatch(signIn(addTostate))
    dispatch(addUsersList([]))
    history.replace(Routes.SignInRoute)
  }

  return (
    <>
      <nav className='navigation-nav'>
        <ul className='navigation-list'>
          <li><span onClick = {clearState} >Выход</span></li>
       </ul>
     </nav>
    </>
  )
}

export default Navigation;