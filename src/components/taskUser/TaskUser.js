import React from 'react';

import './TaskUser.scss';


function TaskUser (props) {

  const { 
    taskId,
    taskName,
    onChange={}
  } = props;

  return (
    <li className='task-item'>
        <span className='item-id'>{taskId}</span>

        <label className='item-name' for={taskId}>
          {taskName}
        </label>

        <input
          className='item-check'
          type='checkbox'
          id={taskId}
          name={taskId}
        />
        
      </li>
  )
}

export default TaskUser;