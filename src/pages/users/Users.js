import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Users.scss';
import preloader_L from '../../static/images/svg/preloader_L.svg';

import {  
  addUsersList,
  addUsersSearchList,
  addUserSearch 
} from '../../redux/actions/Actions';
import { adminApi } from '../../api/AdminApi'
import { 
  Search,
  UserItem,
  PopUpLink
} from '../../components'

function Users () {

  const dispatch = useDispatch();
  
  const appState = useSelector( state => state.Reducer)

  const { token,role,usersList, usersSearchList, isUserSearch} = appState;

  const [searchText, setSearchText] = useState('')
  const [isRequest, setIsRequest] = useState(true)
  const [sessionFault, setSessionFault] = useState(false)

  const getUsers = () =>{
    const accsesstoken = token;

    adminApi.getUsersForAdmin(accsesstoken)
      .then((response)=>{
        dispatch(addUsersList(response.data))
        setIsRequest(false)
      },(error)=>{
        if (error.response.status === 401){
                setSessionFault(true)
              }
        console.log(error)
      })
  }

  useEffect(  () => {
    setSessionFault(false)
    getUsers()
  }, []);

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const searchUser = () => {

    let copyItems = [...usersList]
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
  }

  const renderUsers =  (arr) => {
    if (!isRequest){

      if (arr.length === 0){
        return(
          <span className='list-empty' >No users available</span>
        )
      }

      let result;
      result = arr.map((item) => (
        < UserItem
          key={item.id}
          idPath={item._id}
          nickname = {item.userName}
          taskId = {arr.indexOf(item)+1}
          login = {item.login}
        />
      ));
      return result;
    }
    return
  };


  return (
    <>
      <section className='users'>

        {sessionFault && <PopUpLink 
          text = 'The time of the session has expired. Log in again'
          buttonText = 'Sign in'
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
          {isRequest &&<img src={preloader_L}/>}
          {!isUserSearch? renderUsers(usersList) : renderUsers(usersSearchList)}
          
          </ul>

        </div>

      </section>
    </>
  )
}

export default Users;