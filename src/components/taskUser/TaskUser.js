import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker } from '@fortawesome/free-solid-svg-icons';

import './TaskUser.scss';


function TaskUser ({ taskId, item, onChange, onClick={}, role,handleClick={}}) {

  const createTime =item.createdAt.slice(0,-8).replace('T',' ')  
  const updateTime = item.updatedAt === null ? 'not updated' : item.updatedAt.slice(0,-8).replace('T',' ')
  const deleteButton = () => {
    if (item.checked) {
      return (
        <button
          className="task-item__delete-button" 
          onClick={() => onClick()}
        >
          delete
        </button>
      );
    }
  }
  return (
    
    <div className='task-item__wraper'>

      {role === 'admin' && deleteButton()}

      {role === 'admin' &&
        <button 
          className="task__edit-button" 
          title='Edit task'
          onClick ={handleClick}
        >
          <FontAwesomeIcon icon={faMarker} />
        </button>
      }

      <li className='task-item__regular'>
          <span className='item-id'>{taskId}</span>

          <label className='item-name' htmlFor={item._id}>
            {item.name}
          </label>

          <span className='task-item__span'>
            {item.createdBy}
          </span>

          <span className='task-item__span'>
            {createTime}
          </span>

          <span className='task-item__span'>
            {item.updatedBy}
          </span>

          <span className='task-item__span'>
            {updateTime}
          </span>

          <input
            className='item-check'
            type='checkbox'
            id={item._id}
            checked={item.checked}
            onChange={onChange}
          />
          
      </li>
    
    </div>

  )
}

export default TaskUser;