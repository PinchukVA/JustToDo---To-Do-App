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
  const { token,role,userId} = appState;

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
  const [isSearch, setIsSearch] = useState(false)
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
      if (res.status === 200){
        const taskListCopy = [...tasksList]
        const tasksListNew = [...taskListCopy, ...res.data]
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
      const id = role === 'admin' ? user_Id : userId
      let body ={}
      if (patchType === 'checked'){
         body = {
            id: taskID,
            userId: id, 
            checked: changeObj.checked
            ? (changeObj.checked = false)
            : (changeObj.checked = true)
         }
      }else{
        body = {
          id: taskID,
          userId: id, 
          name: textFieldCopy.editTask.trim()
       }
      }
      const response = await usersApi.PatchTasksForUser(body, token)
      if (response.data === 'OK'){
        setTasksList(taskListCopy)
        if (patchType === 'name'){
          changeObj.name = textFieldCopy.editTask
          setTasksList(taskListCopy)
          setIsEdit(!isEdit)
        }
      }
      setIsRequest(false)
    }catch(error){
      console.log(error)
      const  res  = {...error.response.data}
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
    getCounts()
    getLists()
  }, [tasksCount]);

  const handleChange = (e) => {
    const textFieldCopy = {...textField}
    textFieldCopy[e.target.name] = e.target.value
    setTextField(textFieldCopy)
    setHelpFieldText({})
  }

  const searchTask = async (e) => {
    e.preventDefault();
    const {searchText} = {...textField}
    setIsSearch(true)
    setTasksList([])
    setPage(0)
    await getCounts();
    if (searchText === '' ){
      setIsSearch(false)
    }
  }

  const handleDeleteTask = async (id) => {
    try{
      const response = await adminApi.deleteUserTask(id, user_Id, token)
      if (response.status === 204){
        const tasksListCopy = [...tasksList]
        const delId = tasksListCopy.findIndex((item) => item._id === id);
        tasksListCopy.splice(delId, 1);
        setTasksList(tasksListCopy)
        getCounts()
        }
    }catch(error){
      console.log(error)
    }
  }

  const createTask = async () =>{
    try{
      const textFieldCopy ={...textField}
      const copyText = textField.text.trim();
      const response = await adminApi.createUserTask(copyText,user_Id, token)
  
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

  const handleOpenEditTask = (id,name) => {
    const textFieldCopy = { ...textField}
    textFieldCopy.editTask=name
    setEditTaskId(id)
    setTextField(textFieldCopy)
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

      result = arr.map((item,index) => (
        < TaskUser
          key={item._id}
          item={item}
          taskId = {index+1}
          onChange={() => patchTask(item._id, 'checked')}
          role={role}
          onClick={() => handleDeleteTask(item._id)}
          handleClick={() => handleOpenEditTask(item._id,item.name)}
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
          onClick={()=>setIsEdit(!isEdit)}
          onChange = {handleChange}
          value={textField.editTask}
          nameInput='editTask'
          formName = 'editTask'  
          nameButton='editTaskButton'
          helpEditText={helpFieldText.editTask}
          onSubmit = {handleTaskSubmit}
        /> }

        {role==='admin' && !isSearch && < AddTaskForm 
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

          <div className='task__header'> 

            { tasksList.length !== 0  && <div className ='tasks__count' >
              <span> show tasks: {tasksList.length}</span > 
              <span> all task: {tasksCount}</span>
            </div>}

            <ul className ='lists__header'>
              <li className ='lists__num'>#</li>
              <li className ='lists__name'>task name</li>
              <li className ='lists__item' >create by</li>
              <li className ='lists__item'>create at</li>
              <li className ='lists__item'>update by</li>
              <li className ='lists__item'>update at</li>
              <li className ='lists__del'>done</li>
            </ul>

          </div>

          <ul className='tasks-list'>
          {isRequest &&<img src={preloader_L}/>}
          {renderTasks(tasksList)}
          </ul>

          {tasksCount !== 0 && tasksCount !== tasksList.length && !isRequest && <MoreButton 
          textButton = 'more tasks'
          clickFunction={getLists}
          />}

        </div>

      </section>
    </>
  )
}

export default Tasks;