import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import './SignUp.scss';

import { Routes } from '../../utils/routes.js'
import { Preview } from '../../components'

function SignUp () {

  const [signUpForm, setSignUpForm] = useState({
      nickNameValue:'',
      emailValue:'', 
      passwordValue:'', 
      passwordRepeatValue:'',  
      roleValue:'',
      adminIdValue:''
    })

    // Types form Errors 'empty', 'notValid', 'notExists', 'notRepeat'
    const [signUpFormError, setSignUpFormError] = useState({
      nickNameError:'',
      emailError:'', 
      passwordError:'', 
      passwordRepeatError:'',  
      roleError:'',
      adminIdError:''
    })

    const { nickNameValue, emailValue, passwordValue, passwordRepeatValue, roleValue, adminIdValue  } = signUpForm;

    const { nickNameError, emailError, passwordError, passwordRepeatError, roleError, adminIdError } = signUpFormError;

    // useEffect(() => { console.log('useEffect - signUpFormError', signUpFormError) }, [signUpFormError])

    const handleChangeForm = (event, inputName, errorName) => {
      const signUpFormCopy = {...signUpForm};
      const signUpFormErrorCopy = {...signUpFormError};

      signUpFormErrorCopy[errorName] = '';
      setSignUpFormError(signUpFormErrorCopy)

      if (inputName === 'passwordValue'){
        signUpFormErrorCopy.passwordRepeatError = '';
        setSignUpFormError(signUpFormErrorCopy)

        signUpFormCopy.passwordRepeatValue = '';
        setSignUpForm(signUpFormCopy);

      }

      signUpFormCopy[inputName] = event.target.value;
      setSignUpForm(signUpFormCopy);
    }

    const handleCheckEmptyInput = ( signUpForm, signUpFormError, inputName= '', errorName = '' ) => {

      if (inputName === 'adminIdValue' ){
        
        if (roleValue === 'user' && signUpForm[inputName] === '' ){
          signUpFormError[errorName] = 'empty'
          return false
        }
        return true
      }

      if ( signUpForm[inputName] === ''){
          signUpFormError[errorName] = 'empty'
          console.log('проверяемся в пустом поле',signUpFormError)
          return false
      }
      return true
    }

    const handleCheckPasswordValidation = (signUpFormError) =>{

      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

      const result = re.test(String(signUpForm.passwordValue).toLowerCase());
      if ( !result && passwordValue !== '' ){
        signUpFormError.passwordError = 'notValid';
      }
      return result
    }

    const handleCheckPasswordRepeat = (signUpFormError) =>{
      const result = signUpForm.passwordValue === signUpForm.passwordRepeatValue;
      if ( !result &&  passwordRepeatValue !==''){
        signUpFormError.passwordRepeatError = 'notValid';
        return !result;
      }
      return result
    }

    const handleCheckDifficultNickName = (signUpFormError) =>{

      const re = /(?=(?:.*[a-zA-Z]){3,})/;

      const result = re.test(String(signUpForm.nickNameValue).toLowerCase());

      if ( nickNameValue !== ''){
        if ( !result || ! (signUpForm.nickNameValue.length >= 5 )){
          signUpFormError.nickNameError = 'notValid';
        }
        return result
      }
    }

    const handleCheckEmailValidation = ( signUpFormError ) =>{

      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const result = re.test(String(signUpForm.emailValue).toLowerCase());

      if ( !result && emailValue !== '' ){
        signUpFormError.emailError = 'notValid';
      }
    }

    const handleCheckForm = ( event = {}, inputName = '', errorName = '') => {

      let signUpFormCopy = {...signUpForm};
      let signUpFormErrorCopy = {...signUpFormError};

      let valuesNameForm = Object.keys (signUpFormCopy)
      let valueErrorForm = Object.keys (signUpFormErrorCopy)

      handleCheckDifficultNickName(signUpFormErrorCopy)
      handleCheckEmailValidation(signUpFormErrorCopy)
      handleCheckPasswordValidation(signUpFormErrorCopy)
      handleCheckPasswordRepeat(signUpFormErrorCopy)

      if ( inputName !== '' && errorName !== '' ) {

          handleCheckEmptyInput ( 
          signUpFormCopy, 
          signUpFormErrorCopy,
          inputName, 
          errorName
        )

        setSignUpFormError(signUpFormErrorCopy)
      } 

      if ( inputName === '' && errorName === '' ) {
        
        for ( let i = 0; i < valuesNameForm.length; i++ ){
            handleCheckEmptyInput ( 
              signUpFormCopy, 
              signUpFormErrorCopy, 
              valuesNameForm[i], 
              valueErrorForm[i]
            )
            setSignUpFormError(signUpFormErrorCopy)
        }
      }
      let valueErrorArray = Object.values (signUpFormErrorCopy)
      let result =  valueErrorArray.every(item => item === '' )
      console.log('handleCheckForm - могу отправить запрос?',result )
      console.log('handleCheckForm - массив значений ошибок',valueErrorArray )
      console.log('handleCheckForm - объект ошибок',signUpFormErrorCopy )
      return result
    }

    const handleSubmitForm = (event) => {
      event.preventDefault();

      // console.log('handleSubmitFormht результат возрата ошибок',  handleCheckForm())
      const canSubmit = handleCheckForm();
      console.log('STATE - объект ошибок',signUpFormError )
      const signUpFormErrorCopy = {...signUpFormError}
      console.log('КОПИЯ - объект ошибок',signUpFormErrorCopy )
      const valueErrors = Object.values(signUpFormErrorCopy)
      console.log('Массив ошибок',valueErrors )
      const canSubmitForm = valueErrors.every(item => item === '' )
      console.log('Я могу отправить запрос?:',canSubmitForm )

      if ( canSubmit){
        console.log('ты ОТПРАВИЛ запрос')
      }
      if (!canSubmit){
        console.log('ты  НЕ ОТПРАВИЛ запрос')
      }
      //else we send Post request
    }

  return (
    <>
      <section className='signUp'>

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
                onChange={event => handleChangeForm(event, 'nickNameValue', 'nickNameError')}
                onBlur ={event => handleCheckForm(event, 'nickNameValue', 'nickNameError')}
            />

            { 
              nickNameError === 'empty' && <span className='signUp_error'>Enter nickname</span> 
            }
            { 
              nickNameError === 'notValid' && <span className='signUp_error'>Incorrect nickname. Min 5 symbols, min 3 letters</span> 
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
                onChange={event => handleChangeForm(event, 'emailValue', 'emailError')} 
                onBlur ={event => handleCheckForm(event, 'emailValue', 'emailError')}
            />

            { 
              emailError === 'empty' && <span className='signUp_error'>Enter email</span> 
            }
            { 
              emailError === 'notValid' && <span className='signUp_error'>The e-mail you entered is not in the correct format. Please try again.</span> 
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
                onChange={event => handleChangeForm(event, 'passwordValue', 'passwordError')}  
                onBlur ={event => handleCheckForm(event, 'passwordValue', 'passwordError')}
            />

            { 
              passwordError === 'empty' && <span className='signUp_error'>Enter password</span> 
            }
            { 
              passwordError === 'notValid' && <span className='signUp_error'>Incorrect password. Min. 5 symbols. Min. 1 letters and min. 1 digit </span> 
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
                onChange={event => handleChangeForm(event, 'passwordRepeatValue', 'passwordRepeatError')}   
                onBlur ={event => handleCheckForm(event, 'passwordRepeatValue', 'passwordRepeatError')}
            />

            { 
              passwordRepeatError === 'empty' && <span className='signUp_error'>Repeat password please</span> 
            }
            { 
              passwordRepeatError === 'notValid' && <span className='signUp_error'>Passwords must match</span> 
            }

            <select
              className='signUp_select'
              name="select-role"
              value={roleValue} 
              onChange={event => handleChangeForm(event, 'roleValue', 'roleError')}
              onBlur ={event => handleCheckForm(event, 'roleValue', 'roleError')}   
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
              onChange={event => handleChangeForm(event, 'adminIdValue', 'adminIdError')}
              onBlur ={event => handleCheckForm(event, 'adminIdValue', 'adminIdError')}   
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
                // className={nickNameValue ==='' ? 'signUp_log-button-disabled' : 'signUp_log-button'}
                className={'signUp_log-button'}
                type='submit'
                value='Sign Up'
                // disabled={!nickNameValue}
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
      </section>
    </>
  )
}

export default SignUp;