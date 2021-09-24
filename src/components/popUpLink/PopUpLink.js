import React from 'react';
import { Link} from 'react-router-dom';

import './PopUpLink.scss'

import { Routes } from '../../utils/routes.js';

function PopUpLink (props) {

  // const link = props.link
  // console.log('PopUpLink', link)
  // console.log('PopUpLink', typeof link)

  return (
    <>
    <div className='popUp_wraper'>

      <div className='popUp_block slideDown'>

            <p className='popUp_text'>{props.text}</p>
            <Link to={Routes[props.link]}>
            <button className='popUp_button'>{props.buttonText}</button>
            </Link>

        </div>

    </div>
   
    <div  className='popUp_back'></div>
   </> 
  )
}

export default PopUpLink;