import React from 'react';

import './AddTaskForm.scss';

function AddTaskForm ({onSubmit, onChange, value, nameInput, helpText}) {

  return(

    <div className="users__form-wraper">

      <div className="acordion-item__content">

      <form 
        className="add-task__wraper" 
        onSubmit={onSubmit} 
        
      >

        <label className="add-task__label" htmlFor="new-todo">
          Write task:
        </label>

        <input
          className="add-task__input"
          id="new-todo"
          value={value}
          onChange={onChange}
          name={nameInput}
        />

        <input 
          className="add-task__button" 
          type="submit" 
          value="Create task" 
        />

        

      </form>

      <div className='add-task_help-text'>
        <span>{helpText}</span>
      </div>

      </div>

    </div>
  )
}

export default AddTaskForm