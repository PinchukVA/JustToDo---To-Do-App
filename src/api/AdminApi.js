import axios from 'axios'

export const adminApi = {

  getUsersForAdmin:  (token) =>{
    return  axios.get('http://localhost:3001/users', {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  },

  GetTasksUserForAdmin: async (user_Id, token,pageNumber,searchName) =>{
    return   axios.get(`http://localhost:3001/tasks/${user_Id}`, {
      headers:{
        authorization:`Bearer ${token}`
      },
      params:{
        pageSize:2,
        pageNumber: pageNumber,
        searchName:searchName
      }
    })
  },

  deleteUserTask:  async (id,user_Id,token) =>{
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

  createUserTask: async (name,userId,token) =>{
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

  GetCountForAdmin:  (user_Id, token,searchName) =>{
    return   axios.get(`http://localhost:3001/tasks/count/${user_Id}`, {
      headers:{
        authorization:`Bearer ${token}`
      },
      params:{
        searchName:searchName
      }
    })
  }
}