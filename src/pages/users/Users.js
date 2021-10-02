import React, { useState, useEffect } from 'react';

import './Users.scss';
import axios from 'axios'

import { 
  Search,
  UserItem,
} from '../../components'

function Users () {

  const [searchText, setSearchText] = useState('')
  const [searchError, setSearchError] = useState(false)
  const [searchErrorText, setSearchErrorText] = useState('')


  const getUsers = async () => {
    let accsesstoken = getCookie('authorization')

    console.log(accsesstoken)

    axios.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${accsesstoken}`;
        return config;
      },
      error => {
        return Promise.reject(error)
      }
    )

    try {
      const response = await axios.get('http://localhost:3001/users')
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }

  // useEffect(() => {
  //   loadToDoList();
  // }, []);

  const handleChangeSearchText = (e) => {
    setSearchError(false)
    setSearchErrorText('')
    setSearchText(e.target.value);
    console.log("handleChangeSearchText", e);
  };

  const checkInput = () => {
    const searchTextCopy = searchText

    if (searchTextCopy.trim().length === 0) {
      setSearchError(true);
      setSearchErrorText('Enter a nickname to search')
      return true
    }
    return false
  }

  // const searchUser = () => {

  // }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const handleSearchSubmit = e => {
    e.preventDefault();

    if ( checkInput() ) {
      return;
    }

    getUsers();

    console.log('handleSearchSubmit', e.target.name)
  }

  const users = [
    {
      id: "112550",
      nickname: "user_test_0",
      login: "user_test_0@yandex.ru"
    },
    {
      id: "112551",
      nickname: "user_test_1",
      login: "user_test_1@yandex.ru"
    },
    {
      id: "112552",
      nickname: "user_test_2",
      login: "user_test_2@yandex.ru"
    },
    {
      id: "112553",
      nickname: "user_test_3",
      login: "user_test_3@yandex.ru"
    },
    {
      id: "112554",
      nickname: "user_test_4",
      login: "user_test_4@yandex.ru"
    }
  ];

  const renderUsers = (arr) => {
    let result;

    result = arr.map((item) => (
      < UserItem
        key={item.id}
        nickname = {item.nickname}
        taskId = {arr.indexOf(item)+1}
        login = {item.login}
      />
    ));
    return result;
  };


  return (
    <>
      <section className='users'>

        <Search
          placeholder = 'Enter nickname'
          onChange ={handleChangeSearchText}
          onSubmit = {handleSearchSubmit}
          value = {searchText}
          nameInput = 'searchUserForm' 
          searchError = {searchError}
          searchErrorText = {searchErrorText}
          />

        <div className="users-wraper">

          <ul className="users-list">
            {renderUsers(users)}
          </ul>

        </div>

      </section>
    </>
  )
}

export default Users;