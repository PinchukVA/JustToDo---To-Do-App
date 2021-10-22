import React,{useState}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import './MoreButton.scss';


function MoreButton  ({textButton, clickFunction}) {
  const [rotate, setRotate] = useState (false)

  const onClick = () =>{
    clickFunction()
    setRotate(!rotate)
  }

  return (
    <>
      <button className='moreButton' onClick={onClick}> 
        {textButton} <FontAwesomeIcon className={rotate ?'moreButton__icon' : 'moreButton__icon-rotate'}icon={faSync} />
      </button>
    </>
  )
}

export default MoreButton;