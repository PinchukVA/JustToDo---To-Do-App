import axios from 'axios'

export const usersApi = {

  signUpGetAdmins:  () =>{
    return  axios.get('http://localhost:3001/admins')
  },

  checkUserExists:  (body) =>{
    return  axios.post('http://localhost:3001/user/exists', body)
  },

  GetTasksForUser:  async (token,pageNumber,searchName) =>{
    return   axios.get('http://localhost:3001/tasks', {
      headers:{
        authorization:`Bearer ${token}`
      },
      params:{
        pageSize:1,
        pageNumber: pageNumber,
        searchName:searchName
      }
    })
  },

  PatchTasksForUser:  async (body, token) =>{
    return   axios.patch('http://localhost:3001/tasks',body, {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  GetCountForUser:  async (token,searchName) =>{
    return   axios.get('http://localhost:3001/tasks/count', {
      headers:{
        authorization:`Bearer ${token}`
      },
      params:{
        searchName:searchName
      }
    })
  }
}