import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import './Tasks.scss';
import preloader_L from '../../static/images/svg/preloader_L.svg';

import { setCookie } from '../../utils/Cookies'
import {  
  signIn,
  addTasksList,
  addTasksSearchList,
  addTaskSearch 
} from '../../redux/actions/Actions';
import { usersApi } from '../../api/UsersApi'
import { adminApi } from '../../api/AdminApi'
import { authApi } from '../../api/AuthApi'
import { 
  Search,
  TaskUser,
  AddTaskForm,
  PopUpLink, 
  EditForm,
  MoreButton,
} from '../../components'

function Tasks () {

  const {user_Id } = useParams();

  const dispatch = useDispatch();

  const appState = useSelector( state => state.Reducer)
  const { token,role,tasksList, tasksSearchList, isTaskSearch} = appState;

  const[textField, setTextField]=useState ({
    text:'',
    searchText:'',
    editTask:''
  })

  const [helpFieldText, setHelpFieldText] = useState({
    text:'',
    editTask:''
  })

  const [isRequest, setIsRequest] = useState(true)
  const [sessionFault, setSessionFault] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editTaskId, setEditTaskId] = useState()
  const [tasksCount, setTasksCount] = useState()
  const [page, setPage] = useState(0)

  const getLists = async () =>{
    try{
      const accsesstoken = token;
      const url = `http://localhost:3001/tasks/${user_Id}`
      let response;
      if ( role === 'user'){
        response = await usersApi.GetTasksForUser(accsesstoken,page)
      } else {
        response = await adminApi.GetTasksUserForAdmin(url,accsesstoken,page)
      }
      console.log('getLists --response ---ans user_role', response, role)
      const tasksListNew = [...tasksList, ...response.data]
      setPage(prevPage => prevPage + 1)
      dispatch(addTasksList(tasksListNew))
      setIsRequest(false)
    }catch(error){
      if (error.response.status === 401){
        setSessionFault(true)
      }
      console.log(error)
    }
  }

  const patchTask = async (taskID, taskListCopy, userId, typeBody='', IDchecked='',taskName='') =>{
    try{
      let body ={}
      const accsesstoken = token;
      if (typeBody === 'checked'){
         body = {
            id: taskID,
            userId: userId, 
            checked: IDchecked
         }
      }else{
        body = {
          id: taskID,
          userId: userId, 
          name: taskName
       }
      }
      console.log('patchTask--body', body)
  
      const response = await usersApi.PatchTasksForUser(body, accsesstoken)
      if (response.data === 'OK'){
        console.log('patchTask - checkDispatch',)
        dispatch(addTasksList(taskListCopy))
        if (typeBody === 'name'){
          handleCloseEditTask()
        }
      }
      setIsRequest(false)
    }catch(error){
      console.log(error)
      const  res  = {...error.response.data}
      console.log(res)
      if (error.response.status === 401){
        setSessionFault(true)
      }
      if (res.status === "Fail"){
        const helpFieldTextCopy = {...helpFieldText}
        helpFieldTextCopy.editTask = res.message
        setHelpFieldText(helpFieldTextCopy)
      }
    }
  }

  const getCounts  = async () =>{
    try{
      const accsesstoken = token;
      const url = `http://localhost:3001/tasks/count/${user_Id}`
      let response;
      if ( role === 'user'){
        response = await usersApi.GetCountForUser(accsesstoken)
      }else{
        response = await adminApi.GetCountForAdmin(url,accsesstoken)
      }
      const count = response.data
      setTasksCount(count.tasksCount)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(  () => {
    setSessionFault(false)
    getLists()
    getCounts()
  }, []);

  const handleChange = (e) => {
    const textFieldCopy = {...textField}
    textFieldCopy[e.target.name] = e.target.value
    setTextField(textFieldCopy)
    setHelpFieldText({})
  }

  const searchTask = (e) => {
    e.preventDefault();
    let taskListCopy = [...tasksList]
    let copyText = textField.searchText;
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

  const handleDeleteTask = async (id) => {
    try{
      const accsesstoken = token;
      let user_Id_Copy = user_Id;
      let tasksListCopy = [...tasksList]
      let tasksSearchListCopy = [...tasksSearchList]
      let delId = tasksListCopy.findIndex((item) => item._id === id);
      let delIdSearch = tasksSearchListCopy.findIndex((item) => item._id === id);
      tasksListCopy.splice(delId, 1);
      tasksSearchListCopy.splice(delIdSearch, 1);
      const response = await adminApi.deleteUserTask(id, user_Id_Copy, accsesstoken)
      if (response.status === 204){
        dispatch(addTasksList(tasksListCopy))
        dispatch(addTasksSearchList(tasksSearchListCopy))
        getCounts()
        }
    }catch(error){
      console.log(error.response.status)
      console.log(error)
    }
  }

  const createTask = async () =>{
    try{
      const textFieldCopy ={...textField}
      const copyText = textField.text;
      const user_Id_Copy = user_Id;
      const response = await adminApi.createUserTask(copyText, user_Id_Copy, token)
  
      if (response.statusText === 'Created'){
        textFieldCopy.text = ''
        setTextField(textFieldCopy)
        getCounts()
      }
    }catch(error){
      console.log(error)
      const  res  = {...error.response.data}
      if (error.response.status === 401){
        setSessionFault(true)
      }
      if (res.status === "Fail"){
        const helpFieldTextCopy = {...helpFieldText}
        helpFieldTextCopy.text = res.message
        setHelpFieldText(helpFieldTextCopy)
      }
    }
  }

  const handleTaskSubmit = e => {
    e.preventDefault();

    const helpFieldTextCopy = {...helpFieldText}

    if ( textField[e.target.name].trim().length < 4 ){
      helpFieldTextCopy[e.target.name] = 'the minimum length of the task is 4 characters'
      setHelpFieldText(helpFieldTextCopy)
      return;
    }

    if ( e.target.name === 'text' ){
      createTask()
    }else{
      editTask()
    }
    
  }

  const handleChangecheckBox = id => {
    const taskListCopy = [...tasksList];
    const changeObj = taskListCopy.find((item) => item._id === id);

    changeObj.checked
      ? (changeObj.checked = false)
      : (changeObj.checked = true);
    patchTask(id, taskListCopy, changeObj.userId, 'checked', changeObj.checked)
  }

  const handleOpenEditTask = (id) => {
    const textFieldCopy = { ...textField}
    const taskListCopy = [...tasksList];
    const changeObj = taskListCopy.find((item) => item._id === id);
    textFieldCopy.editTask=changeObj.name
    setEditTaskId(id)
    setTextField(textFieldCopy)
    setIsEdit(!isEdit);
  }

  const editTask = () =>{
    const taskListCopy = [...tasksList];
    const textFieldCopy = { ...textField}
    const changeObj = taskListCopy.find((item) => item._id === editTaskId);

    changeObj.name = textFieldCopy.editTask

    patchTask(editTaskId, taskListCopy, changeObj.userId, 'name','',textFieldCopy.editTask)
  }

  const handleCloseEditTask = () => {
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
          handleClick={() => handleOpenEditTask(item._id)}
        />
      ));
      return result;
    }
   return 
  }
  console.log('count all', tasksCount)

  

  return (
    <>
      <section className='tasks__section'>

        {sessionFault && <PopUpLink 
          text = 'The time of the session has expired. Log in again'
          buttonText = 'Sign in'
        />}

        {isEdit && role==='admin' && 
        <EditForm
          onClick={()=>handleCloseEditTask()}
          onChange = {handleChange}
          value={textField.editTask}
          nameInput='editTask'
          formName = 'editTask'  
          nameButton='editTaskButton'
          helpEditText={helpFieldText.editTask}
          onSubmit = {handleTaskSubmit}
        /> }

        {role==='admin' && !isTaskSearch && < AddTaskForm 
          onSubmit = {handleTaskSubmit}
          onChange = {handleChange}
          nameInput = 'text'
          nameForm = 'text'  
          helpText={helpFieldText.text}
          value={textField.text}
        />}

        

        <Search
          placeholder = 'Find Task'
          onChange={handleChange}
          onSubmit={searchTask}
          value={textField.searchText}
          nameInput = 'searchText' 
        />

        

        <div className='tasks__wraper'>
          
          { tasksList.length !== 0  && <div className ='tasks__count' >
            show <span>{tasksList.length}</span > 
            tasks out of  <span>{tasksCount}</span>
          </div>}

          <ul className='tasks-list'>
          {isRequest &&<img src={preloader_L}/>}
          {!isTaskSearch? renderTasks(tasksList) : renderTasks(tasksSearchList)}
          </ul>

          {tasksCount !== 0 && tasksCount !== tasksList.length && !isRequest && <MoreButton 
          clickFunction={getLists}
          />}

        </div>

      </section>
    </>
  )
}

export default Tasks;