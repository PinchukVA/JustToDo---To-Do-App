import axios from 'axios'

export const usersApi = {

  signUpGetAdmins:  () =>{
    return  axios.get('http://localhost:3001/admins')
  },

  checkUserExists:  (body) =>{
    return  axios.post('http://localhost:3001/user/exists', body)
  },

  GetTasksForUser:  (token) =>{
    return   axios.get('http://localhost:3001/tasks', {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  PatchTasksForUser:  (body, token) =>{
    return   axios.patch('http://localhost:3001/tasks',body, {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  }

}