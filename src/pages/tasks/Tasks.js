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

  const patchTask = (taskID, taskListCopy, userId, typeBody='', IDchecked='',taskName='') =>{
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

    usersApi.PatchTasksForUser(body, accsesstoken)
      .then((response)=>{
        console.log('Ответ - на патч', response)
        if (response.data === 'OK'){
          dispatch(addTasksList(taskListCopy))
          if (typeBody === 'name'){
            handleCloseEditTask()
          }
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

  const checkInput = (e) => {
    let result = true;
    let arrayCopy = [...tasksList]
    let copyText = textField[e.target.name];

    copyText = copyText.replace(/\s/g, '');

    let index = arrayCopy.findIndex(item => item.name.replace(/\s/g, '') === copyText);

    if (index === -1){
      result = false
    }
    return result;
  }

  const createTask = () =>{

    const taskListCopy = [...tasksList]
    const textFieldCopy ={...textField}
    const copyText = textField.text;
    const user_Id_Copy = user_Id;

    adminApi.createUserTask(copyText, user_Id_Copy, token)
      .then((response)=>{
        if (response.statusText === 'Created'){
          dispatch(addTasksList(taskListCopy.concat(response.data)))
          textFieldCopy.text = ''
          setTextField(textFieldCopy)
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

    const helpFieldTextCopy = {...helpFieldText}

    if ( textField[e.target.name].trim().length < 4 ){
      helpFieldTextCopy[e.target.name] = 'the minimum length of the task is 4 characters'
      setHelpFieldText(helpFieldTextCopy)
      return;
    }

    if ( checkInput(e) ) {
      helpFieldTextCopy[e.target.name] = 'task already exists'
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
    console.log('editTask--',changeObj )

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