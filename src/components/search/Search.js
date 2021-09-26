import React from 'react';

import './Search.scss';

function Search (props) {

  const  {
    placeholder,
    obSubmit ={}, 
    onChange ={}
  } = props

  return (
    <div className='search-wraper'>

      <form 
      className='search-form'
      onSubmit = {obSubmit}
      >

      <input 
        className='search-input'
        type='text'
        placeholder={placeholder}
        onChange={onChange}
      />

      <input
        className='search-button'
        type='submit'
        value='>'
      />
      
      </form>

    </div>
  )
}

export default Search;