import React  from 'react';

import '../Auth.scss';



function AuthButtonSubmit (props) {

  return(
    <input  
                className={'auth_log-button'}
                type='submit'
                value={props.value}
    />
  )
}

export default AuthButtonSubmit;