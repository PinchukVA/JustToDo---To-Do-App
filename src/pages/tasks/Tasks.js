import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import './Tasks.scss';
import preloader_L from '../../static/images/svg/preloader_L.svg';

import { usersApi } from '../../api/UsersApi'
import { adminApi } from '../../api/AdminApi'
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

  const appState = useSelector( state => state.Reducer)
  const { token,role} = appState;

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
  const [tasksList, setTasksList] = useState([])

  const getLists = async () =>{
    try{
      const {searchText} = {...textField}
      let res;
      if ( role === 'user'){
        res= await usersApi.GetTasksForUser(token,page,searchText)
      } else {
        res = await adminApi.GetTasksUserForAdmin(user_Id,token,page,searchText)
      }
      console.log('getLists -res', res.status)
      if (res.status === 200){
        const tasksListNew = [...tasksList, ...res.data]
        setPage(prevPage => prevPage + 1)
        setTasksList(tasksListNew)
        setIsRequest(false)
      }
    }catch(error){
      if (error.response.status === 401){
        setSessionFault(true)
      }
      console.log(error)
    }
  }

  const patchTask = async (taskID, patchType) =>{
    try{
      const textFieldCopy = { ...textField}
      const taskListCopy = [...tasksList];
      const changeObj = taskListCopy.find((item) => item._id === taskID);
      let body ={}
      if (patchType === 'checked'){
         body = {
            id: taskID,
            userId: user_Id, 
            checked: changeObj.checked
            ? (changeObj.checked = false)
            : (changeObj.checked = true)
         }
      }else{
        body = {
          id: taskID,
          userId: user_Id, 
          name: textFieldCopy.editTask.trim()
       }
      }
      const response = await usersApi.PatchTasksForUser(body, token)
      if (response.data === 'OK'){
        setTasksList(taskListCopy)
        if (patchType === 'name'){
          changeObj.name = textFieldCopy.editTask
          setTasksList(taskListCopy)
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
      const {searchText} = {...textField}
      let response;
      if ( role === 'user'){
        response = await usersApi.GetCountForUser(token,searchText)
      }else{
        response = await adminApi.GetCountForAdmin(user_Id,token,searchText)
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
    let copyText = textField.searchText;
    const textFieldCopy = {...textField}
    
    setTasksList([])

    getCounts()
    getLists()

    if (copyText === '' ){
      textFieldCopy.searchText = ''
      setTasksList([])
      setTextField(textFieldCopy)
    }

  }

  const handleDeleteTask = async (id) => {
    try{
      let user_Id_Copy = user_Id;
      let tasksListCopy = [...tasksList]

      let delId = tasksListCopy.findIndex((item) => item._id === id);

      tasksListCopy.splice(delId, 1);

      const response = await adminApi.deleteUserTask(id, user_Id_Copy, token)
      if (response.status === 204){
        setTasksList(tasksListCopy)

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
      const copyText = textField.text.trim();
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
      patchTask(editTaskId, 'name')
    }
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
          onChange={() => patchTask(item._id, 'checked')}
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

        {role==='admin' && < AddTaskForm 
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
          {renderTasks(tasksList)}
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