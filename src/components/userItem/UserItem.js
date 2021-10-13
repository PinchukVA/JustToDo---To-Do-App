import React from 'react';
import { Link } from 'react-router-dom'

import './UserItem.scss';

function UserItem (props){

  const { 
    taskId,
    nickname,
    login,
    idPath
  } = props

  return(
  <>
    <Link to={`/tasks/${idPath}`} className="link-item">
      <li className="user-item">

      <span className="user-id">{taskId}</span>

      <span className="user-name">{nickname}</span>

      <span className="user-login">{login}</span>

      </li>
    </Link>
  </>
  )
}

export default UserItem