import axios from 'axios'

export const adminApi = {

  getUsersForAdmin:  (token) =>{
    return  axios.get('http://localhost:3001/users', {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  GetTasksUserForAdmin: async (url, token,pageNumber) =>{
    return   axios.get(url, {
      headers:{
        authorization:`Bearer ${token}`
      },
      params:{
        pageSize:2,
        pageNumber: pageNumber
      }
    })
  },

  deleteUserTask:  (id,user_Id,token) =>{
    return   axios.delete('http://localhost:3001/tasks',{
      data:{
          id: id,
          userId: user_Id
      },
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  createUserTask:  (name,userId,token) =>{
    return   axios.post('http://localhost:3001/tasks',
    {
      name: name,
      userId:userId
    },
    {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  GetCountForAdmin:  (url, token) =>{
    return   axios.get(url, {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  }
}