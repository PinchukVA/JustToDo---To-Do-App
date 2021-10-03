import { getCookie } from '../../utils/cookies/Cookies'

const initialState = {
  token:getCookie('authorization') || '',
  role:getCookie('role') || '',
  usersList: [],
  usersSearchList: [],
  tasksList: [],
  tasksSearchList: [],
  userTasksList:[],
  isUserSearch:false,
  isTaskSearch:false
};

export const Reducer = (state = initialState, action) => {
  console.log('Reducer -initialState',state)
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

      case 'ADD_TASKS_LIST':
      // console.log('ADD_TASKS_LIST', action.payload)
      return {...state, tasksList:payload}

      case 'ADD_TASKS_SEARCH_LIST':
      // console.log('ADD_TASKS_SEARCH_LIST', action.payload)
      return {...state, tasksSearchList:payload}

      case 'ADD_USER_TASKS_LIST':
      // console.log('ADD_USER_TASKS_LIST', action.payload)
      return {...state, userTasksList:payload}

      case 'ADD_USER_SEARCH':
      // console.log('ADD_USER_SEARCH', action.payload)
      return {...state, isUserSearch:payload}

      case 'ADD_TASK_SEARCH':
      // console.log('ADD_TASK_SEARCH', action.payload)
      return {...state, isTaskSearch:payload}
      
    default:
      // console.log('Reducer 2 -initialState2',initialState)
      return {...state}
  }
}