import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import './Tasks.scss';
import preloader_L from '../../static/images/svg/preloader_L.svg';

import {  
  addTasksList,
  addTasksSearchList,
  addTaskSearch 
} from '../../redux/actions/Actions';
import { usersApi } from '../../api/UsersApi'
import { adminApi } from '../../api/AdminApi'
import { 
  Search,
  TaskUser,
  AddTaskForm,
  PopUpLink, 
  EditForm
} from '../../components'

function Tasks () {

  const {user_Id } = useParams();

  const dispatch = useDispatch();

  const appState = useSelector( state => state.Reducer)
  const { token,role,tasksList, tasksSearchList, isTaskSearch} = appState;

  const [searchText, setSearchText] = useState('')
  const [text, setText] = useState('')
  const [helpText, setHelpText] = useState('')
  const [isRequest, setIsRequest] = useState(true)
  const [sessionFault, setSessionFault] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const getLists = () =>{

    const accsesstoken = token;
 
    const url = `http://localhost:3001/tasks/${user_Id}`

    if ( role === 'user'){
      usersApi.GetTasksForUser(accsesstoken)
      .then((response)=>{
        dispatch(addTasksList(response.data))
        setIsRequest(false)
      },(error)=>{
        if (error.response.status === 401){
                setSessionFault(true)
              }
        console.log(error)
      })
    } else {
      adminApi.GetTasksUserForAdmin(url,accsesstoken)
      .then((response)=>{
        dispatch(addTasksList(response.data))
        setIsRequest(false)
      },(error)=>{
        if (error.response.status === 401){
                setSessionFault(true)
              }
        console.log(error)
      })
    }
    
  }

  const patchTask = (taskID, IDchecked, taskListCopy, userId) =>{
    
    const accsesstoken = token;

    const body = 
      {
        id: taskID,
        userId: userId, 
        checked: IDchecked
    }

    usersApi.PatchTasksForUser(body, accsesstoken)
      .then((response)=>{
        console.log('Ответ - на патч', response)
        if (response.data === 'OK'){
          dispatch(addTasksList(taskListCopy))
        }
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
    getLists()
  }, []);

  const handleChange = (e) => {

    if (e.target.name === 'addTaskForm') {
      setText(e.target.value);
      setHelpText('')
    }

    if (e.target.name === 'searchTaskForm') {
      setSearchText(e.target.value);
    }
  }

  const searchTask = (e) => {
    e.preventDefault();
    let taskListCopy = [...tasksList]
    let copyText = searchText;
    let searchArray = [];

    copyText = copyText.replace(/\s/g, '').toUpperCase();
    searchArray = taskListCopy.filter(item => item.name.replace(/\s/g, '').toUpperCase().includes(copyText) === true);

    dispatch(addTasksSearchList([...searchArray]));
    dispatch(addTaskSearch(!isTaskSearch));

    if (copyText === '' ){
      dispatch(addTaskSearch(false));
      dispatch(addTasksSearchList([]));
    }

  }

  const handleDeleteTask = id => {

    const accsesstoken = token;

    let user_Id_Copy = user_Id;
    let tasksListCopy = [...tasksList]
    let tasksSearchListCopy = [...tasksSearchList]


    let delId = tasksListCopy.findIndex((item) => item._id === id);
    let delIdSearch = tasksSearchListCopy.findIndex((item) => item._id === id);

    tasksListCopy.splice(delId, 1);
    tasksSearchListCopy.splice(delIdSearch, 1);

    adminApi.deleteUserTask(id, user_Id_Copy, accsesstoken)
    .then((response)=>{
      if (response.status === 204){
      dispatch(addTasksList(tasksListCopy))
      dispatch(addTasksSearchList(tasksSearchListCopy))
      }
    },(error)=>{
      console.log(error.response.status)
      console.log(error)
    })
  }

  const checkInput = () => {
    
    let result = true;
    let arrayCopy = [...tasksList]
    let copyText = text;

    copyText = copyText.replace(/\s/g, '');

    let index = arrayCopy.findIndex(item => item.name.replace(/\s/g, '') === copyText);

    if (index === -1){
      result = false
    }
    return result;
  }

  const createTask = () =>{

    let taskListCopy = [...tasksList]
    let copyText = text;
    let user_Id_Copy = user_Id;

    const options = {
      headers:{
        authorization:`Bearer ${token}`
      }
    }

    const body = 
    {
      checked:false,
      name: copyText,
      userId:user_Id_Copy
    }

  console.log('createTask- options--',options,'and body --', body)
    adminApi.createUserTask(copyText, user_Id_Copy, token)
      .then((response)=>{
        if (response.data === 'Created'){
          dispatch(addTasksList(taskListCopy.concat(body)))
          setText('')
        }
      },(error)=>{
        if (error.response.status === 401){
                setSessionFault(true)
              }
        console.log(error)
      })
  }

  const handleTaskSubmit = e => {
    e.preventDefault();
    if ( text.trim().length < 4 ){
      setHelpText('the minimum length of the task is 4 characters')
      return;
    }
    if ( checkInput() ) {
      setHelpText('task is already exist')
      return; 
    }
    createTask()
  }

  const handleChangecheckBox = id => {
    const taskListCopy = [...tasksList];
    const changeObj = taskListCopy.find((item) => item._id === id);

    changeObj.checked
      ? (changeObj.checked = false)
      : (changeObj.checked = true);
    patchTask(id, changeObj.checked, taskListCopy, changeObj.userId)
  }

  const handleOpenEditTask = () => {
    console.log('handleOpenEditTask')
    setIsEdit(!isEdit);
  }

  const renderTasks = (arr) => {
    if (!isRequest){
      let result;

      if (arr.length === 0){
        return(
          <span className='list-empty' >The task list is empty</span>
        )
      }

      result = arr.map((item) => (
        < TaskUser
          key={item._id}
          item={item}
          taskId = {arr.indexOf(item)+1}
          onChange={() => handleChangecheckBox(item._id)}
          role={role}
          onClick={() => handleDeleteTask(item._id)}
          handleClick={() => handleOpenEditTask()}
        />
      ));
      return result;
    }
   return 
  }
  console.log('FindState--', tasksList)

  

  return (
    <>
      <section className='tasks__section'>

        {sessionFault && <PopUpLink 
          text = 'The time of the session has expired. Log in again'
          buttonText = 'Sign in'
          link = 'SignInRoute'
        />}

        {isEdit && role==='admin' && 
        <EditForm
          onClick={()=>handleOpenEditTask()}
        /> }

        {role==='admin' && !isTaskSearch && < AddTaskForm 
          onSubmit = {handleTaskSubmit}
          onChange = {handleChange}
          nameInput = 'addTaskForm' 
          helpText={helpText}
          value={text}
        />}

        

        <Search
          placeholder = 'Find Task'
          onChange={handleChange}
          onSubmit={searchTask}
          value={searchText}
          nameInput = 'searchTaskForm' 
        />

        <div className='tasks__wraper'>
            
            <ul className='tasks-list'>
            {isRequest &&<img src={preloader_L}/>}
            {!isTaskSearch? renderTasks(tasksList) : renderTasks(tasksSearchList)}
            </ul>
        </div>

      </section>
    </>
  )
}

export default Tasks;