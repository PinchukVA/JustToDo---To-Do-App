import axios from 'axios'

export const authApi = {

  signUpPostNewPerson:  async (body) =>{
    return  axios.post('http://localhost:3001/signUp' , body)
  },

  signInAuth:  async (body) =>{
    return  axios.post('http://localhost:3001/signIn' , body)
  }

}