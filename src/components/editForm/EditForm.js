import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './EditForm.scss';

function EditForm ({onClick, onChange,value,nameInput,nameButton,helpEditText,onSubmit,formName}) {

  return(
    <>
      <div className="edit__content">

      <form 
        className="edit__wraper" 
        onSubmit={onSubmit} 
        name={formName}
      >

        <label className="edit__label" htmlFor="new-todo">
          Edit task
        </label>

        <input
          className="edit__input"
          id="new-todo"
          value={value}
          onChange={onChange}
          name={nameInput}
        />

        <div className='edit_help-text'>
          <span>{helpEditText}</span>
        </div>

        <div className="edit__buttons-wraper">

          <input 
            className="edit__button" 
            type="submit" 
            name={nameButton}
            value="Edit task" 
          />

          <button 
          className="edit__close-button" 
          title='Close editing'
          onClick={onClick}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>

        </div>

      </form>

      </div>
      
      <div  className='edit__back'></div>
      </>  
  )
}

export default EditForm