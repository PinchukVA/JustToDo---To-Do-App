export const signIn = data => {
  console.log('signIn', data)
  return {
    type: 'SIGN_IN',
    payload: data
  }
}
export const addUsersList = data => {
  console.log('addUsersList', data)
  return {
    type: 'ADD_USERS_LIST',
    payload: data
  }
}
export const addUsersSearchList = data => {
  console.log('addUsersList', data)
  return {
    type: 'ADD_USERS_SEARCH_LIST',
    payload: data
  }
}
export const addTasksList = data => {
  console.log('addTasksList', data)
  return {
    type: 'ADD_TASKS_LIST',
    payload: data
  }
}
export const addUserTasksList = data => {
  console.log('addUserTasksList', data)
  return {
    type: 'ADD_USER_TASKS_LIST',
    payload: data
  }
}
export const addUserSearch = data => {
  console.log('addUserSearch', data)
  return {
    type: 'ADD_USER_SEARCH',
    payload: data
  }
}