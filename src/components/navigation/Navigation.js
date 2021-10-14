import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import './Navigation.scss';

import { Routes } from '../../utils/routes.js'
import { signIn, addUsersList } from '../../redux/actions/Actions';
import { authApi } from '../../api/AuthApi'
import { setCookie } from '../../utils/Cookies'

function Navigation () {

  const dispatch = useDispatch();
  const history = useHistory();

  const appState = useSelector( state => state.Reducer)
  const {role, token} = appState;

  const clearState = async () => {
    try{
     const accsesstoken = token;
     const response = await authApi.logOut(accsesstoken)
     if (response.data === 'OK'){
      const addTostate = {
        token:'', 
        role:'',
        userId:'',
        usersList: [],
        usersSearchList: [],
        tasksList: [],
        tasksSearchList: [],
        isUserSearch:false,
        isTaskSearch:false 
      }
      setCookie('authorization', '' )
      dispatch(signIn(addTostate))
      dispatch(addUsersList([]))
      history.replace(Routes.SignInRoute)
     }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <nav className='navigation-nav'>
        <ul className='navigation-list'>

          { role === 'admin' && <Link to={Routes.UsersRoute} 
              style={{ textDecoration: 'none' }} >
                <li><span>Users</span></li>
          </Link>}
          

          <li><span onClick = {clearState} >Sign Out</span></li>
       </ul>
     </nav>
    </>
  )
}

export default Navigation;