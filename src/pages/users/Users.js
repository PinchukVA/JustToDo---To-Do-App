import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

import './Users.scss';

import {  
  addUsersList,
  addUsersSearchList,
  addUserSearch 
} from '../../redux/actions/Actions';

import { 
  Search,
  UserItem,
  PopUpLink
} from '../../components'

function Users () {

  const dispatch = useDispatch();
  
  const appState = useSelector( state => state.Reducer)

  const { token,usersList, usersSearchList, isUserSearch} = appState;

  const [searchText, setSearchText] = useState('')

  const [sessionFault, setSessionFault] = useState(false)

  
  const getUsers = async () => {

    const accsesstoken = token

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
      let response = await axios.get('http://localhost:3001/users')
      dispatch(addUsersList(response.data))
    } catch (error) {
      if (error.response.status === 401){
        setSessionFault(true)
      }
    }
  }

  useEffect(  () => {
    setSessionFault(false)
    getUsers()
  }, []);

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
    console.log("handleChangeSearchText", e);
  };

  const searchUser = () => {

    let copyItems = [...usersList]
    console.log('searchUser', copyItems)
    let copyText = searchText;
    let searchArray = [];

    copyText = copyText.replace(/\s/g, '').toUpperCase();
    searchArray = copyItems.filter(item => item.userName.replace(/\s/g, '').toUpperCase().includes(copyText) === true);

    dispatch(addUsersSearchList([...searchArray]));
    dispatch(addUserSearch(!isUserSearch));

    if (copyText === '' ){
      dispatch(addUserSearch(false));
      dispatch(addUsersSearchList([]));
    }

  }

  const handleSearchSubmit = e => {
    e.preventDefault();

    searchUser();
    // console.log('handleSearchSubmit', e.target.name)
  }

  const renderUsers =  (arr) => {
    let result;
    // console.log('renderUsers - выполняюсь')
    result = arr.map((item) => (
      < UserItem
        key={item.id}
        nickname = {item.userName}
        taskId = {arr.indexOf(item)+1}
        login = {item.login}
      />
    ));
    return result;
  };


  return (
    <>
      <section className='users'>

        {sessionFault && <PopUpLink 
          text = 'The time of the session has expired. Log in again'
          buttonText = 'Sign in'
          link = 'SignInRoute'
        />}

        <Search
          placeholder = 'Enter nickname'
          onChange ={handleChangeSearchText}
          onSubmit = {handleSearchSubmit}
          value = {searchText}
          nameInput = 'searchUserForm' 
          />

        <div className="users-wraper">

          <ul className="users-list">
          {!isUserSearch? renderUsers(usersList) : renderUsers(usersSearchList)}
          </ul>

        </div>

      </section>
    </>
  )
}

export default Users;