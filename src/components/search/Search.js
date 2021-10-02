import React from 'react';

import './Search.scss';

function Search (props) {

  const  {
    placeholder,
    onSubmit , 
    onChange,
    value,
    nameInput,
    searchErrorText,
    searchError
  } = props

  return (
    <div className='search-wraper'>

      <form 
      className='search-form'
      onSubmit = {onSubmit}
      >

      <input 
        className='search-input'
        name={nameInput}
        type='text'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      <input
        className='search-button'
        type='submit'
        value={'\u25B6'}
      />
      
      </form>

      {searchError && <p className='search-error'>{searchErrorText}</p>}
    </div>
  )
}

export default Search;