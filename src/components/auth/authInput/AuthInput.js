import React  from 'react';

import '../Auth.scss';


function AuthInput  (props) {

  const { labelText,
    inputName,
    inputType,
    inputValue,
    idInput,
    onChange,
    onBlur,
    inputNameError,
    inputTextErrorEmpty,
    inputTextErrorNotValid,
    inputTextErrorExist,
    disabledValue } = props;

    const status = (inputNameError) => {

      switch (inputNameError){
        case 'empty':
          return(
          <span className='auth_error'>{inputTextErrorEmpty}</span> 
          )
        case 'notValid':
          return(
          <span className='auth_error'>{inputTextErrorNotValid}</span>
          )
        case 'exist':
          return(
          <span className='auth_error'>{inputTextErrorExist}</span> 
          )
        default:
          return
      }
    }

  return (
    <>

      <label 
        className={disabledValue ? 'auth-label-disabled'  : 'auth-label'} 
        htmlFor={inputName}
      >
        {labelText}
      </label>

      <input
        className={disabledValue ? 'auth_input-disabled' : 'auth_input'}
        id={idInput}
        name={inputName}
        type={inputType}
        value={inputValue} 
        onChange={onChange}
        onBlur ={onBlur}
        disabled={disabledValue}
      />

      {status(inputNameError)}

    </>
  )
}

export default AuthInput;