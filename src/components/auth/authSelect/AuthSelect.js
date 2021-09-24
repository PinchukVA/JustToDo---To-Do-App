import React  from 'react';

import '../Auth.scss';


function AuthSelect  (props) {

  const {
    selectName,
    selectValue,
    onChange,
    onBlur,
    selectDefaultText,
    selectErrorName,
    optionList,
    selectErrorText,
    disabledValue
  } = props;

  console.log('disabledValue', disabledValue)
  const renderOptionList =  (list) => {
      
    const listCopy = [...list];

    return(
      listCopy.map((item) => (
        <option
          key={item._id}
        >
          {item.userName || item.option}
        </option> 
      ))
    ) 
  }

    const status = (selectErrorName) => {

      switch (selectErrorName){
        case 'empty':
          return(
            <span className='auth_error'>{selectErrorText}</span> 
          )
        default:
          return
      }
    }

  return (
    <>

      <select
        className={ disabledValue ? 'auth_select': 'none-active'}
        name={selectName}
        value={selectValue}
        onChange={onChange}
        onBlur ={onBlur} 
      >

      <option value='' disabled>
        {selectDefaultText}
      </option>

      {renderOptionList(optionList)}

      </select>

      {status(selectErrorName)}

    </>
  )
}

export default AuthSelect;