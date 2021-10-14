import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

import './SignUp.scss';

import { authApi } from '../../api/AuthApi'
import { usersApi } from '../../api/UsersApi'
import { Routes } from '../../utils/routes.js'
import { 
  Preview, 
  PopUpLink, 
  AuthInput, 
  AuthSelect, 
  AuthButtonSubmit 
} from '../../components'

function SignUp () {

  const [signUpForm, setSignUpForm] = useState({
      nickNameValue:'',
      emailValue:'', 
      passwordValue:'', 
      passwordRepeatValue:'',  
      roleValue:'',
      adminIdValue:''
    })
    // Types form Errors 'empty', 'notValid', 'exist', 'notRepeat'
    const [signUpFormError, setSignUpFormError] = useState({
      nickNameError:'',
      emailError:'', 
      passwordError:'', 
      passwordRepeatError:'',  
      roleError:'',
      adminIdError:''
    })

    const [adminsList, setAdminsList] = useState([])
    const [linkText, setLinkText] = useState('')
    const [okSignUp, setOkSignUp] = useState(false)

    const optionSelect = [
      {
        _id:1,
        option: 'user'
      },
      {
        _id:2,
        option: 'admin'
      }
    ]

    const { nickNameValue, emailValue, passwordValue, passwordRepeatValue, roleValue, adminIdValue  } = signUpForm;

    const { nickNameError, emailError, passwordError, passwordRepeatError, roleError, adminIdError } = signUpFormError;


    async function getAdmins() {
      try {
        const response = await usersApi.signUpGetAdmins();
        if (response.statusText === 'OK') {
          let result = await response.data;
          let resultArray = await result
          console.log('getAdmins',result )
          console.log('getAdmins',resultArray )
          setAdminsList(resultArray)
        } else {
          throw new Error('Error. Uncorect HTTP request ');
        }
      } catch (error) {
        console.error(error);
      }
    }


    useEffect(() => { 
      getAdmins()
    }, [])

    const createAdmin = () => {
      const signUpFormCopy = {...signUpForm};

      const newAdmin = {
        userName: signUpFormCopy.nickNameValue,
        login: signUpFormCopy.emailValue,
        password: signUpFormCopy.passwordValue,
        role: signUpFormCopy.roleValue
     }
     console.log('createAdmin object is -  ',newAdmin)
     return newAdmin
    }

    const createUser = () => {
      const signUpFormCopy = {...signUpForm};
      const adminsListCopy = [...adminsList];
      const idAdmin = adminsListCopy.find(item => item.userName === signUpFormCopy.adminIdValue);

      const newUser = {
        userName: signUpFormCopy.nickNameValue,
        login: signUpFormCopy.emailValue,
        password: signUpFormCopy.passwordValue,
        role: signUpFormCopy.roleValue,
        adminId: idAdmin._id
     }

     return newUser
    }

    const sendRequest = async (user) =>{

      const signUpFormCopy = {...signUpForm};
      let createNewUser 
      const clearState = {
        nickNameValue:'',
        emailValue:'', 
        passwordValue:'', 
        passwordRepeatValue:'',  
        roleValue:'',
        adminIdValue:''
      }
      const userNick = signUpFormCopy.nickNameValue

      if ( user === 'admin') {
        createNewUser = createAdmin()
      }

      if ( user === 'user') {
        createNewUser = createUser()
      } 

      const res = await authApi.signUpPostNewPerson(createNewUser)
      console.log(res)
      console.log('new person is created', createNewUser)

      if ( res.statusText === 'Created'){
        setOkSignUp(true)
        setLinkText(` ${userNick}'' is successfully registered. Please log in ` )
        setSignUpForm(clearState)
      }

    }

    const handleChangeForm = (event, inputName, errorName) => {
      const { value } = event.target
      const signUpFormCopy = {...signUpForm};
      const signUpFormErrorCopy = {...signUpFormError};

      signUpFormErrorCopy[errorName] = '';
      setSignUpFormError(signUpFormErrorCopy)
      
      if ( value === 'admin') {
        signUpFormCopy.adminIdValue = ''
        signUpFormErrorCopy.adminIdError = '';
        setSignUpFormError(signUpFormErrorCopy)
      }

      if (inputName === 'passwordValue') {
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
        }
      }

      if ( signUpForm[inputName] === ''){
          signUpFormError[errorName] = 'empty'
      }
    }

    const handleCheckPasswordValidation = (signUpFormError) =>{
      const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

      const result = re.test(String(signUpForm.passwordValue).toLowerCase());
      if ( !result ){
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

    const handleCheckUserExist = async (  fieldname, fieldValue  ) =>{
      const body = {}
      body[fieldname] = fieldValue
      return usersApi.checkUserExists(body)
    } 
    
    const handleCheckDifficultNickName = async (signUpFormError) =>{
      const re = /(?=(?:.*[a-zA-Z]){3,})/;
      const result = re.test(String(signUpForm.nickNameValue).toLowerCase());

        if ( !result || !(signUpForm.nickNameValue.length >= 5 )){
          signUpFormError.nickNameError = 'notValid';
        } else {
           const result = await handleCheckUserExist ( 'userName', nickNameValue)
           if(result.data.exists){
                signUpFormError.nickNameError = 'exist'
                console.log('signUpFormError', signUpFormError)
              }  
        }
    }

    const handleCheckEmailValidation = async ( signUpFormError ) =>{
      const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const result = re.test(String(signUpForm.emailValue).toLowerCase());

      if ( !result){
        signUpFormError.emailError = 'notValid';
      }else {
        const result = await handleCheckUserExist ( 'login', emailValue )
        if(result.data.exists){
          signUpFormError.emailError = 'exist'
        }
      }
    }

    const handleCheckValidInput = async (inputName, signUpFormErrorCopy) => {

      if (inputName !== ''){
        console.log('handleCheckValidInput - deep cheeck', inputName, signUpFormErrorCopy)
        switch (inputName){
          case 'nickNameValue':
            await handleCheckDifficultNickName(signUpFormErrorCopy)
            break
          case 'emailValue':
            await handleCheckEmailValidation(signUpFormErrorCopy)
            break
          case 'passwordValue':
            handleCheckPasswordValidation(signUpFormErrorCopy)
            break
          case 'passwordRepeatValue':
            handleCheckPasswordRepeat(signUpFormErrorCopy)
            break
          default:
            console.log('Input is not defined or all input are full')
        }
      }
    }

    const handleCheckForm = async ( event = {}, inputName = '', errorName = '') => {
      let signUpFormCopy = {...signUpForm};
      let signUpFormErrorCopy = {...signUpFormError};

      let valuesNameForm = Object.keys (signUpFormCopy)
      let valueErrorForm = Object.keys (signUpFormErrorCopy)

     await handleCheckValidInput(inputName,signUpFormErrorCopy)

      if ( inputName !== '' && errorName !== '' ) {

          handleCheckEmptyInput ( 
          signUpFormCopy, 
          signUpFormErrorCopy,
          inputName, 
          errorName
        )

        setSignUpFormError(signUpFormErrorCopy)
      } 

      if ( roleValue === 'admin' || roleValue === '' ){
        valuesNameForm.pop()
        valueErrorForm.pop()
      }

      if ( inputName === '' && errorName === '' ) {
        for ( let i = 0; i < valuesNameForm.length; i++ ){
            handleCheckEmptyInput ( 
              signUpFormCopy, 
              signUpFormErrorCopy, 
              valuesNameForm[i], 
              valueErrorForm[i]
            )

        }
        setSignUpFormError(signUpFormErrorCopy)
      }

      let valueErrorArray = Object.values (signUpFormErrorCopy)
      let result =  valueErrorArray.every(item => item === '' )

      return result
    }

    const handleSubmitForm = async (event) => {
      event.preventDefault();

      const canSubmit = await handleCheckForm();
      let signUpFormCopy = {...signUpForm};

      if ( !canSubmit){
        console.log('ты  НЕ ОТПРАВИЛ запрос')
        return
      }
      
       await sendRequest(signUpFormCopy.roleValue)
        
    }
  
  return (
    <>
      <section className='signUp'>

        <Preview />
        {okSignUp && <PopUpLink 
          text = {linkText}
          buttonText = 'Sign in'
        />}
        
        <div className='signUp-form_main'>

          <div className='signUp-form_block' >

          <h2 className='signUp_logo-text'>Just ToDo It</h2>

            <form 
                className='signUp_form' 
                noValidate
                onSubmit = {handleSubmitForm}
            >

              < AuthInput 
                labelText = 'Nickname'
                inputName = 'nickname'
                inputType ='text'
                inputValue = {nickNameValue}  
                idInput = '1'
                onChange ={event => handleChangeForm(event, 'nickNameValue', 'nickNameError')}
                onBlur = {event => handleCheckForm(event, 'nickNameValue', 'nickNameError')}
                inputNameError = {nickNameError}
                inputTextErrorEmpty = 'Enter nickname'
                inputTextErrorNotValid = 'Incorrect nickname. Min 5 symbols, min 3 letters'
                inputTextErrorExist = 'User is already registered'
                disabledValue = {false}
              />

             < AuthInput 
                labelText = 'e-mail'
                inputName = 'login'
                inputType ='email'
                inputValue = {emailValue}  
                idInput = '2'
                onChange ={event => handleChangeForm(event, 'emailValue', 'emailError')}
                onBlur = {event => handleCheckForm(event, 'emailValue', 'emailError')}
                inputNameError = {emailError}
                inputTextErrorEmpty = 'Enter email'
                inputTextErrorNotValid = 'The e-mail you entered is not in the correct format. Please try again'
                inputTextErrorExist = 'Email is already registered'
                disabledValue ={false}
              />

            < AuthInput 
                labelText = 'Password'
                inputName = 'password'
                inputType ='password'
                inputValue = {passwordValue}  
                idInput = '3'
                onChange ={event => handleChangeForm(event, 'passwordValue', 'passwordError')}
                onBlur = {event => handleCheckForm(event, 'passwordValue', 'passwordError')}
                inputNameError = {passwordError}
                inputTextErrorEmpty = 'Enter password'
                inputTextErrorNotValid = 'Incorrect password. Min. 5 symbols. Min. 1 letters and min. 1 digit '
                inputTextErrorExist = ''
                disabledValue = {false}
              />

            < AuthInput 
                labelText = 'Repeat password'
                inputName = 'password-repeat'
                inputType ='password'
                inputValue = {passwordRepeatValue}  
                idInput = '4'
                onChange ={event => handleChangeForm(event, 'passwordRepeatValue', 'passwordRepeatError')}
                onBlur = {event => handleCheckForm(event, 'passwordRepeatValue', 'passwordRepeatError')}
                inputNameError = {passwordRepeatError}
                inputTextErrorEmpty = 'Repeat password please'
                inputTextErrorNotValid = 'Passwords must match '
                inputTextErrorExist = ''
                disabledValue = {!passwordValue}
              />

              < AuthSelect 
                selectName = 'select-role'
                selectValue = {roleValue}
                onChange ={event => handleChangeForm(event, 'roleValue', 'roleError')}
                onBlur = {event => handleCheckForm(event, 'roleValue', 'roleError')}
                selectErrorName = {roleError}
                selectDefaultText = 'Select a role'
                optionList = {optionSelect}
                selectErrorText = 'Chose role please'
                disabledValue = {true}
              />

              < AuthSelect 
                selectName = 'select-admin'
                selectValue = {adminIdValue}
                onChange ={event => handleChangeForm(event, 'adminIdValue', 'adminIdError')}
                onBlur = {event => handleCheckForm(event, 'adminIdValue', 'adminIdError')}
                selectErrorName = {adminIdError}
                selectDefaultText = 'Chose admin'
                optionList = {adminsList}
                selectErrorText = 'Chose admin please'
                disabledValue = {roleValue === 'user' }
              />
            
            <AuthButtonSubmit 
              value = 'Sign Up'
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