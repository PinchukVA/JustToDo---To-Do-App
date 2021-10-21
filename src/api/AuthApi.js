import axios from 'axios'

export const authApi = {

  signUpPostNewPerson:  async (body) =>{
    return  axios.post('http://localhost:3001/signUp' , body)
  },

  signInAuth:  async (body) =>{
    return  axios.post('http://localhost:3001/signIn' , body)
  },

  logOut: async (token) => {
    return axios.get('http://localhost:3001/logout', {
      headers:{
        authorization:`Bearer ${token}`
      }
    })
  }
}