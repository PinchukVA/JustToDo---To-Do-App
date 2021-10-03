import React from 'react';

import './TaskUser.scss';


function TaskUser (props) {

  const { 
    taskId,
    item,
    onChange
  } = props;
  console.log('TaskUser - item',taskId, 'id-item', item._id, 'Checked:', item.checked)
  return (
    <li className='task-item'>
        <span className='item-id'>{taskId}</span>

        <label className='item-name' htmlFor={item._id}>
          {item.name}
        </label>

        <input
          className='item-check'
          type='checkbox'
          id={item._id}
          checked={item.checked}
          onChange={onChange}
        />
        
      </li>
  )
}

export default TaskUser;