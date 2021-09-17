import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import './SignUp.scss';

import { Routes } from '../../utils/routes.js'
import { Preview } from '../../components'

function SignUp () {

  const [loginForm, setLoginForm] = useState({
      nickNameValue:'',
      emailValue:'', 
      passwordValue:'', 
      passwordRepeatValue:'',  
      roleValue:'',
      adminIdValue:''
    })

    // Types form Errors 'empty', 'notValued', 'notExists', 'notRepeat'
    const [loginFormError, setLoginFormError] = useState({
      nickNameError:'',
      emailError:'', 
      passwordError:'', 
      passwordRepeatError:'',  
      roleError:'',
      adminIdError:''
    })

    const handleChangeLoginForm = (event, inputName, errorName) => {
      const loginFormCopy = {...loginForm};
      const loginFormErrorCopy = {...loginFormError};

      loginFormErrorCopy[errorName] = '';
      setLoginFormError(loginFormErrorCopy)

      if (inputName === 'passwordValue'){
        loginFormErrorCopy.passwordRepeatError = '';
        setLoginFormError(loginFormErrorCopy)
        loginFormCopy.passwordRepeatValue = '';
        setLoginForm(loginFormCopy);
        // clearField(passwordRepeatValue);
      }

      loginFormCopy[inputName] = event.target.value;
      setLoginForm(loginFormCopy);
    }

    const handleCheckPasswordValidation = (loginForm, loginFormError) =>{
  
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

      const result = re.test(String(loginForm.passwordValue).toLowerCase());

      if ( !result ){
        loginFormError.passwordError = 'notValued';
        setLoginFormError(loginFormError);
        console.log('возвращаем ошибку')
        return true
      }
      console.log('не возвращаем ошибку', result)
      return result
    }

    const handleCheckPasswordRepeat = (loginForm, loginFormError) =>{

      const result = loginForm.passwordValue === loginForm.passwordRepeatValue;

      if ( !result ){
        loginFormError.passwordRepeatError = 'notValued';
        setLoginFormError(loginFormError);
        console.log('возвращаем ошибку')
        return true
      }
      console.log('не возвращаем ошибку', result)
      return result
    }

    const handleCheckDifficultNickName = (loginForm, loginFormError) =>{
  
      const re = /(?=(?:.*[a-zA-Z]){3,})/;

      const result = re.test(String(loginForm.nickNameValue).toLowerCase());

      if ( !result || ! (loginForm.nickNameValue.length >= 5)){
        loginFormError.nickNameError = 'notValued';
         setLoginFormError(loginFormError);
         console.log('возвращаем ошибку')
         return true
      }
      console.log('не возвращаем ошибку', result)
      return result
    }

    const handleCheckEmailValidation = (loginForm, loginFormError ) =>{
    
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const result = re.test(String(loginForm.emailValue).toLowerCase());

      if ( !result ){
        loginFormError.emailError = 'notValued';
        setLoginFormError(loginFormError);
        console.log('возвращаем ошибку')
        return true
      }
      console.log('не возвращаем ошибку', result)
      return result
    }

    const handleCheckEmptyInput = ( loginForm, loginFormError, inputName= '', errorName = '' ) => {
      console.log('Проверка пустого поля', inputName)
      console.log('Проверка пустого поля - поле ошибки', errorName)
      if ( loginForm[inputName] === ''){
          loginFormError[errorName] = 'empty'
          setLoginFormError(loginFormError)
          console.log('объект с ошибками',loginFormError)
          return true
      }
      return false
    }

    const handleCheckInput = ( event = {}, inputName = '', errorName = '' ) => {
      console.log('Проверка инпута', inputName)
      const loginFormCopy = {...loginForm};
      const loginFormErrorCopy = {...loginFormError}

      if ( inputName === 'nickNameValue'){
        if (handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)){
          return true
        }
        handleCheckDifficultNickName(loginFormCopy, loginFormErrorCopy)
      }

      if ( inputName === 'emailValue'){
        if (handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)){
          return true
        }
        handleCheckEmailValidation(loginFormCopy, loginFormErrorCopy)
      }

      if ( inputName === 'passwordValue'){
        if (handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)){
          return true
        }
        handleCheckPasswordValidation(loginFormCopy, loginFormErrorCopy)
      }

      if ( inputName === 'passwordRepeatValue'){
        if (handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)){
          return true
        }
        handleCheckPasswordRepeat(loginFormCopy, loginFormErrorCopy)
      }

      if ( inputName === 'roleValue'){
        handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)
      }

      if ( inputName === 'adminIdValue'){
        handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)
      }
      console.log('состояние поля', loginFormCopy)
    }

    const handleSubmitForm = (event) => {
      event.preventDefault();
      
      // if form is empty - return
      // if (  handleCheckEmptyForm() ){
      //     console.log('РЕТУРНУЛИСЬ')
      //     return;
      // }
      console.log('hello submit form')
      //else we send Post request
    }

    const { nickNameValue, emailValue, passwordValue, passwordRepeatValue, roleValue, adminIdValue  } = loginForm;
    const { nickNameError, emailError, passwordError, passwordRepeatError, roleError, adminIdError } = loginFormError;

  return (
    <>
      <setion className='signUp'>

        <Preview />

        <div className='signUp-form_main'>

          <div className='signUp-form_block' >

          <h2 className='signUp_logo-text'>Just ToDo It</h2>

            <form 
                className='signUp_form' 
                noValidate
                onSubmit = {handleSubmitForm}
            >
              <label 
                className='signUp-label' 
                htmlFor='signUp-nickname'
            >
                Nickname
            </label>

            <input
                className='signUp_input'
                id='signUp-nickname'
                name='nickname'
                type='text'
                value={nickNameValue} 
                onChange={event => handleChangeLoginForm(event, 'nickNameValue', 'nickNameError')}
                onBlur ={event => handleCheckInput(event, 'nickNameValue', 'nickNameError')}
            />

            { 
              nickNameError === 'empty' && <span className='signUp_error'>Enter nickname</span> 
            }
            { 
              nickNameError === 'notValued' && <span className='signUp_error'>Incorrect nickname. Min 5 symbols, min 3 letters</span> 
            }

            <label 
                className='signUp-label' 
                htmlFor='signUp-e-mail'
            >
                e-mail
            </label>

            <input
                className='signUp_input'
                id='signUp-e-mail'
                name='login'
                type='email'
                value={emailValue}
                onChange={event => handleChangeLoginForm(event, 'emailValue', 'emailError')} 
                onBlur ={event => handleCheckInput(event, 'emailValue', 'emailError')}
            />

            { 
              emailError === 'empty' && <span className='signUp_error'>Enter email</span> 
            }
            { 
              emailError === 'notValued' && <span className='signUp_error'>The e-mail you entered is not in the correct format. Please try again.</span> 
            }

            <label 
                className='signUp-label' 
                htmlFor='signUp-password'
            >
                Password
            </label>

            <input
                className='signUp_input'
                id='signUp-password'
                type='password'
                name='password'
                value={passwordValue}
                onChange={event => handleChangeLoginForm(event, 'passwordValue', 'passwordError')}  
                onBlur ={event => handleCheckInput(event, 'passwordValue', 'passwordError')}
            />

            { 
              passwordError === 'empty' && <span className='signUp_error'>Enter password</span> 
            }
            { 
              passwordError === 'notValued' && <span className='signUp_error'>Incorrect password. Min. 5 symbols. Min. 1 letters and min. 1 digit </span> 
            }

            <label 
                className={passwordValue==='' ? 'signUp-label-disabled'  : 'signUp-label'}
                htmlFor='signUp-password-repeat'
            >
                Repeat password
            </label>

            <input
                className={passwordValue==='' ? 'signUp_input-disabled' : 'signUp_input'}
                id='signUp-password-repeat'
                type='password'
                name='password-repeat'
                value={passwordRepeatValue}
                disabled={!passwordValue}
                onChange={event => handleChangeLoginForm(event, 'passwordRepeatValue', 'passwordRepeatError')}   
                onBlur ={event => handleCheckInput(event, 'passwordRepeatValue', 'passwordRepeatError')}
            />

            { 
              passwordRepeatError === 'empty' && <span className='signUp_error'>Repeat password please</span> 
            }
            { 
              passwordRepeatError === 'notValued' && <span className='signUp_error'>Passwords must match</span> 
            }

            <select
              className='signUp_select'
              name="select-role"
              value={roleValue} 
              onChange={event => handleChangeLoginForm(event, 'roleValue', 'roleError')}
              onBlur ={event => handleCheckInput(event, 'roleValue', 'roleError')}   
            >
              <option  value='' disabled>
              Select a role
              </option>

              <option value='user'>
                User
              </option>

              <option value='admin'>
                Admin
              </option>
            </select>

            { 
              roleError === 'empty' && <span className='signUp_error'>Chose role please</span> 
            }

            <select
              className={roleValue==='user' ? 'signUp_select': 'none-active'}
              name="select-admin"
              value={adminIdValue}
              onChange={event => handleChangeLoginForm(event, 'adminIdValue', 'adminIdError')}
              onBlur ={event => handleCheckInput(event, 'adminIdValue', 'adminIdError')}   
            >
              <option value='' disabled>
                Chose admin
              </option>

              <option value = 'admin-1'>
                Admin-1
              </option>

              <option value = 'admin-2'>
                Admin-2
              </option>

            </select>

            { 
              adminIdError === 'empty' && <span className='signUp_error'>Chose admin please</span> 
            }

            <input  
                className='signUp_log-button'
                type='submit'
                value='Sign Up'
            />

            </form>
          </div>

          <div className='signUp-form_link' >

                    <p  className='signUp_text' >
                      Have an account?
                    </p>

                    <Link to={Routes.SignInRoute} style={{ textDecoration: 'none' }} >
                        <p  className='signUp_link-text' >Log In</p>
                    </Link>

                </div>

        </div>
      </setion>
    </>
  )
}

export default SignUp;