import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Users.scss';
import preloader_L from '../../static/images/svg/preloader_L.svg';

import { adminApi } from '../../api/AdminApi'
import { 
  Search,
  UserItem,
  PopUpLink,
  MoreButton
} from '../../components'

function Users () {
  const appState = useSelector( state => state.Reducer)

  const { token} = appState;

  const [usersList,setUsersList]=useState([])
  const [userCount, setUserCount] = useState()
  const [searchText, setSearchText] = useState('')
  const [isRequest, setIsRequest] = useState(true)
  const [page, setPage] = useState(0)
  const [sessionFault, setSessionFault] = useState(false)

  const getUsers = async () =>{
    try{
      const searchTextCopy = searchText
      const res = await adminApi.getUsersForAdmin(token,page,searchTextCopy)

      if (res.status === 200){
        const userListCopy = [...usersList]
        const userListNew = [...userListCopy, ...res.data]
        console.log(`get users - ${userListCopy} - and - userListNer - ${userListNew} - and response.status - ${res.status} - and response.data ${res.data}`)
        setPage(prevPage => prevPage + 1)
        setUsersList(userListNew)
        setIsRequest(false)
      }
    }catch(error){
      if (error.response.status === 401){
        setSessionFault(true)
      }
      console.log(error)
    }
  }

  const getCounts  = async () =>{
    try{
      const searchTextCopy = searchText
      const response = await adminApi.GetCountUsers(token,searchTextCopy)
      const count = response.data
      if (response.status === 200){
        setUserCount(count.usersCount)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(  () => {
    console.log('USE_EFFECT_GO')
    setSessionFault(false)
    getCounts()
    getUsers()  
  }, [userCount]);

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async e => {
    e.preventDefault();
    setPage(0)
    setUsersList([])
    await getCounts()
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

  console.log( 'Global params - usersList-', usersList, 'and global - counts -', userCount)
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
          
          { usersList.length !== 0  && <div className ='users__count' >
            show <span>{usersList.length}</span > 
            tasks out of  <span>{userCount}</span>
          </div>}

          <ul className="users-list">
          {isRequest &&<img src={preloader_L}/>}
          {renderUsers(usersList)}
          </ul>
          {usersList !== 0 && userCount !== usersList.length && !isRequest && <MoreButton 
          textButton = 'more users'
          clickFunction={getUsers}
          />}

        </div>

      </section>
    </>
  )
}

export default Users;