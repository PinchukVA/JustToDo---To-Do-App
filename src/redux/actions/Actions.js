export const signIn = data => {
  // console.log('signIn', data)
  return {
    type: 'SIGN_IN',
    payload: data
  }
}

