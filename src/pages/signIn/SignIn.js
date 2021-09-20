import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import './SignIn.scss';

import { Routes } from '../../utils/routes.js'
import { Preview } from '../../components'

function SignIn () {

    const [loginForm, setLoginForm] = useState({nickNameValue:'', passwordValue:''})
    // Types form Errors 'empty', 'notValid', 'notExists'
    const [loginFormError, setLoginFormError] = useState({nickNameError:'', passwordError:''}) 

    const handleCheckEmptyInput = (loginForm, loginFormError, inputName, errorName ) => {
        if ( loginForm[inputName] === ''){
            loginFormError[errorName] = 'empty'
            return true
        }
        
        return false
    }
    
    const handleCheckEmptyForm = (event = {}, inputName = '', errorName = '') =>{
        const loginFormCopy = {...loginForm};
        const loginFormErrorCopy = {...loginFormError};
        let resultCheckEmpty = false;
        let resultCheckEmptyLogin = false;
        let resultCheckEmptyPassword = false;
    
        if ( inputName !== '' && errorName !== ''){

            resultCheckEmpty = handleCheckEmptyInput (loginFormCopy, loginFormErrorCopy, inputName, errorName)
            setLoginFormError(loginFormErrorCopy)
        } else {
            resultCheckEmptyLogin = handleCheckEmptyInput (loginFormCopy, loginFormErrorCopy, 'nickNameValue', 'nickNameError')
            resultCheckEmptyPassword = handleCheckEmptyInput (loginFormCopy, loginFormErrorCopy, 'passwordValue', 'passwordError')
            resultCheckEmpty = resultCheckEmptyLogin || resultCheckEmptyPassword

            setLoginFormError(loginFormErrorCopy)
        }
        return resultCheckEmpty
    }

    const handleChangeLoginForm = (event, inputName, errorName) => {
        const loginFormCopy = {...loginForm};
        const loginFormErrorCopy = {...loginFormError};
        loginFormErrorCopy[errorName] = '';
        setLoginForm(loginFormCopy);
        loginFormCopy[inputName] = event.target.value;
        setLoginFormError(loginFormErrorCopy)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        
        // if form is empty - return
        if (  handleCheckEmptyForm() ){
            console.log('РЕТУРНУЛИСЬ')
            return;
        }
        
        //else we send Post request
    }

    const { nickNameValue,passwordValue } = loginForm;
    const { nickNameError,passwordError } = loginFormError;

    return (
        <>
        <section className='signIn'>
            
            <Preview />

            <div className='signIn-form_main'>
            
                <div className='signIn-form_block' >
                    <h2 className='signIn_logo-text'>Just ToDo It</h2>

                    <form 
                        className='signIn_form' 
                        onSubmit={handleSubmitForm}
                        noValidate
                    >

                    <label 
                        className='signIn-label' 
                        htmlFor='signIn-e-mail'
                    >
                        Nickname
                    </label>

                    <input
                        className='signIn_input'
                        id='signIn-e-mail'
                        name='login'
                        type='text' 
                        value={nickNameValue}
                        onChange={event => handleChangeLoginForm(event, 'nickNameValue', 'nickNameError')}
                        onBlur ={event => handleCheckEmptyForm(event, 'nickNameValue', 'nickNameError')}
                    />

                    { 
                        nickNameError === 'empty' && <span className='signIn_error'>Enter nickname</span> 
                    }
                    { 
                        nickNameError === 'notExists' && <span className='signIn_error'>User is not found</span>
                    }

                    <label 
                        className='signIn-label' 
                        htmlFor='signIn-password'
                    >
                        Password
                    </label>

                    <input
                        className='signIn_input'
                        id='signIn-password'
                        type='password'
                        name='password'
                        value={passwordValue}
                        onChange={event => handleChangeLoginForm(event, 'passwordValue', 'passwordError')}
                        onBlur ={event => handleCheckEmptyForm(event, 'passwordValue', 'passwordError')}
                    />

                    { 
                        passwordError === 'empty' && <span className='signIn_error'>Enter password</span> 
                    }
                    { 
                        passwordError === 'notExists' && <span className='signIn_error'>Your password does not match. Please try again.</span>
                    }

                    <input  
                        className='signIn_logIn-button'
                        type='submit'
                        value='Log In'
                    />
                    </form>

                </div>

                <div className='signIn-form_link' >

                    <p  className='signIn_text' >
                        Don't have an account?
                    </p>

                    <Link to={Routes.SignUpRoute} style={{ textDecoration: 'none' }} >
                        <p  className='signIn_link-text' >Sign Up</p>
                    </Link>

                </div>

            </div>
        </section>
        </>
    )
}

export default SignIn;