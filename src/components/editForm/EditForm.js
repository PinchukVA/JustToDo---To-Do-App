import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import './EditForm.scss';

function EditForm ({onClick}) {

  return(
    <>
      <div className="edit__content">

      <form 
        className="edit__wraper" 
        // onSubmit={onSubmit} 
        
      >

        <label className="edit__label" htmlFor="new-todo">
          Edit task
        </label>

        <input
          className="edit__input"
          id="new-todo"
          // value={value}
          // onChange={onChange}
          // name={nameInput}
        />

        <div className="edit__buttons-wraper">

          <input 
            className="edit__button" 
            type="submit" 
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

      <div className='edit_help-text'>
        {/* <span>{helpText}</span> */}
      </div>

      </div>
      
      <div  className='edit__back'></div>
      </>  
  )
}

export default EditForm