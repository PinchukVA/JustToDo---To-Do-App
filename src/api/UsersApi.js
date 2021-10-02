import axios from 'axios'

export const usersApi = {

  signUpGetAdmins:  () =>{
    return  axios.get('http://localhost:3001/admins')
  },

  checkUserExists:  (body) =>{
    return  axios.post('http://localhost:3001/user/exists', body)
  }
}