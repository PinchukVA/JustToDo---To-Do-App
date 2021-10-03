import axios from 'axios'

export const usersApi = {

  signUpGetAdmins:  () =>{
    return  axios.get('http://localhost:3001/admins')
  },

  checkUserExists:  (body) =>{
    return  axios.post('http://localhost:3001/user/exists', body)
  },

  GetTasksForUser:  (options) =>{
    return   axios.get('http://localhost:3001/tasks', options)
  },

  PatchTasksForUser:  (body, options) =>{
    return   axios.patch('http://localhost:3001/tasks',body, options)
  }

}