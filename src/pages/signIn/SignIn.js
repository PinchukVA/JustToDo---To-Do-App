import React, { useState } from 'react';
import { Link} from 'react-router-dom';

import './SignIn.scss';

import { Routes } from '../../utils/routes.js'
import { authApi } from '../../api/AuthApi'
import { 
    Preview,
    AuthInput, 
    AuthButtonSubmit 
} from '../../components'

function SignIn () {

    const [loginForm, setLoginForm] = useState({nickNameValue:'', passwordValue:''})
    // Types form Errors 'empty', 'notValid', 'Exist'
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

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const loginFormCopy = {...loginForm};

        // if form is empty - return
        if (  handleCheckEmptyForm() ){
            console.log('request not send')
            return;
        }

        const authUser = {
            userName: loginFormCopy.nickNameValue,
            password: loginFormCopy.passwordValue
        }
        //else we send Post request
        console.log('request send now')
        try{
            const res = await authApi.signInAuth(authUser)
            console.log('get OK request', res)
            const token = res.data.token
            console.log('get OK request', token)
        }catch(error){
            const loginFormErrorCopy = {...loginFormError};
            const errorMessage = error.response.data.message;

            if ( errorMessage === 'No user with such userName'){
                loginFormErrorCopy['nickNameError'] = 'exist'
            }else if ( errorMessage === 'Passwords did not match' ){
                loginFormErrorCopy['passwordError'] = 'notValid'
            }

            setLoginFormError(loginFormErrorCopy)
        }
        
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

                    < AuthInput 
                        labelText = 'Nickname'
                        inputName = 'nickname'
                        inputType ='text'
                        inputValue = {nickNameValue}  
                        idInput = '1'
                        onChange ={event => handleChangeLoginForm(event, 'nickNameValue', 'nickNameError')}
                        onBlur = {event => handleCheckEmptyForm(event, 'nickNameValue', 'nickNameError')}
                        inputNameError = {nickNameError}
                        inputTextErrorEmpty = 'Enter nickname'
                        inputTextErrorNotValid = ''
                        inputTextErrorExist = 'User is not found'
                        disabledValue = {false}
                    />

                    < AuthInput 
                        labelText = 'Password'
                        inputName = 'password'
                        inputType ='password'
                        inputValue = {passwordValue}  
                        idInput = '2'
                        onChange ={event => handleChangeLoginForm(event, 'passwordValue', 'passwordError')}
                        onBlur = {event => handleCheckEmptyForm(event, 'passwordValue', 'passwordError')}
                        inputNameError = {passwordError}
                        inputTextErrorEmpty = 'Enter password'
                        inputTextErrorNotValid = 'Your password uncorrect. Please try again.'
                        inputTextErrorExist = ''
                        disabledValue = {false}
                    />

                    <AuthButtonSubmit 
                        value = 'Log In'
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