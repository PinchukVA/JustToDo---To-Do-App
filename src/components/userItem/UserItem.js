import React from 'react';

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

  </li>

  )
}

export default UserItem