export const reducer = (state, action) => {
  switch (action.type) {
    case 'setIsSearch':
      console.log('reducer - setIsSearch-state', state)
      console.log('reducer - setIsSearch-action.payload',  action.payload)
      return { isSearch: action.payload};
    default: 
      return state
  }
}