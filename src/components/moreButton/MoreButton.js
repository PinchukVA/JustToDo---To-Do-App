import React,{useState}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import './MoreButton.scss';


function MoreButton  () {
  const [rotate, setRotate] = useState (false)

  const onClick = () =>{
    setRotate(!rotate)
  }

  return (
    <>
      <button className='moreButton' onClick={onClick}> 
        more tasks <FontAwesomeIcon className={rotate ?'moreButton__icon' : 'moreButton__icon-rotate'}icon={faSync} />
      </button>
    </>
  )
}

export default MoreButton;