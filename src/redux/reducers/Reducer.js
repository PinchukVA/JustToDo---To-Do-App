import jwt from 'jsonwebtoken';

import { getCookie } from '../../utils/Cookies'

const token = getCookie('authorization') 
const decodeData = jwt.decode(token) || {role: '', id: ''}
const {role, id:userId} = decodeData

const initialState = {
  token:token,
  role:role,
  userId:userId
};

export const Reducer = (state = initialState, action) => {
  const {payload} = action;
  switch(action.type){
    case 'SIGN_IN':
      // console.log('SIGN_IN', action.payload)
      return {...state, ...payload}
    default:
      // console.log('Reducer 2 -initialState2',initialState)
      return {...state}
  }
}