import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './PopUpLink.scss'

import { Routes } from '../../utils/routes.js';

import { signIn } from '../../redux/actions/Actions';
import { setCookie } from '../../utils/Cookies'

function PopUpLink ({text, buttonText}) {

  const dispatch = useDispatch();
  const history = useHistory();

  const clearState = () => {
    console.log('clear state')
    const clearState = {
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
    dispatch(signIn(clearState))
    history.replace(Routes.SignInRoute)
  }

  return (
    <>
    <div className='popUp_wraper'>

      <div className='popUp_block slideDown'>

            <p className='popUp_text'>{text}</p>
            <button className='popUp_button' onClick={clearState}>{buttonText}</button>

        </div>

    </div>
   
    <div  className='popUp_back'></div>
   </> 
  )
}

export default PopUpLink;