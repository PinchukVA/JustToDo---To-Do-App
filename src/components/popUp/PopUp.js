import React from 'react';

import './PopUp.scss';

function PopUp () {
  return (
    <>
    <div className='popUp_wraper'>

      <div className='popUp_block'>

            <p className='popUp_text'>Some Text must type here and print to view</p>
            <button className='popUp_button'>Click me before you go out</button>

        </div>

    </div>
   
    <div  className='popUp_back'></div>
   </> 
  )
}

export default PopUp;