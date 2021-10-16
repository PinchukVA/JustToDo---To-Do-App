import jwt from 'jsonwebtoken';

import { getCookie } from '../../utils/Cookies'

const token = getCookie('authorization') 
const decodeData = jwt.decode(token) || {role: '', id: ''}
const {role, id:userId} = decodeData

const initialState = {
  token:token,
  role:role,
  userId:userId,
  usersList: [],
  usersSearchList: [],
  isUserSearch:false,
};

export const Reducer = (state = initialState, action) => {
  const {payload} = action;
  switch(action.type){
    case 'SIGN_IN':
      // console.log('SIGN_IN', action.payload)
      return {...state, ...payload}

      case 'ADD_USERS_LIST':
      // console.log('ADD_USERS_LIST', action.payload)
      return {...state, usersList:payload}

      case 'ADD_USERS_SEARCH_LIST':
      // console.log('ADD_USERS_SEARCH_LIST', action.payload)
      return {...state, usersSearchList:payload}

      case 'ADD_USER_SEARCH':
      // console.log('ADD_USER_SEARCH', action.payload)
      return {...state, isUserSearch:payload}
      
    default:
      // console.log('Reducer 2 -initialState2',initialState)
      return {...state}
  }
}