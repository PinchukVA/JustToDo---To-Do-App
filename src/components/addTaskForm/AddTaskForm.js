import React from 'react';

import './AddTaskForm.scss';

function AddTaskForm (props) {

  const {
    onSubmit,
    onChange,
    value,
    nameInput 
  } = props

  return(

    <div className="users__form-wraper">

      <div className="form__acordion">

        <div className="acordion-item">

          <input
            className="acordion-item__input"
            type="checkbox"
            id="form__acordion-1"
          />

          <label
            className="acordion-item__trigger"
            htmlFor="form__acordion-1"
          >
            Add a new task for a user
          </label>

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
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddTaskForm