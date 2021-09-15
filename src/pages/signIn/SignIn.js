import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom';

import './SignIn.scss';

import { Routes } from '../../utils/routes.js'
import { Preview } from '../../components'

function SignIn () {

  const [textPasword, setTextPasword] = useState('');
  const [textMail, setTextMail] = useState('');
  // const [helpMessageMail, setTextMai] = useState('');
  // const [helpMessagePass, setTextMai] = useState('');

  const handleChangePaswordText = e => {
    setTextPasword(e.target.value);
    console.log('textPasword',textPasword);
  }
  const handleChangeMailText = e => {
    setTextMail(e.target.value);
    console.log('textMail',textMail);
  }

  return (
    <>
      <section className="signIn">
        <Preview />
        <div className="signIn-form_main">
          <div className="signIn-form_block" >
            <h2 className="signIn_logo-text">Just ToDo It</h2>
            <form className="signIn_form" >
            <label className="signIn-label" htmlFor="signIn-e-mail">e-mail</label>
            <input
              className="signIn_input"
              id="signIn-e-mail"
              onChange={handleChangeMailText}
            />
             <label className="signIn-label" htmlFor="signIn-password">Password</label>
            <input
              className="signIn_input"
              id="signIn-password"
              onChange={handleChangePaswordText}
            />
            <input  className="signIn_logIn-button"
              type="button"
              value="Log In"
            />
            </form>
          </div>
          <div className="signIn-form_link" >
            <p  className="signIn_text" >Don't have an account?</p>
            <Link to={Routes.SignUpRoute} style={{ textDecoration: 'none' }} ><p  className="signIn_link-text" >Sign Up</p></Link>
          </div>

        </div>

      </section>
    </>
  )
}

export default SignIn;