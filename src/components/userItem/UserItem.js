import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks} from '@fortawesome/free-solid-svg-icons';

import './UserItem.scss';

function UserItem (props){

  const { 
    taskId,
    nickname,
    login
  } = props

  return(

    <li className="user-item">

      <span className="user-id">{taskId}</span>

      <span className="user-name">{nickname}</span>

      <span className="user-login">{login}</span>

      <button className="user-button"><FontAwesomeIcon icon={faTasks} /> </button>
  </li>

  )
}

export default UserItem