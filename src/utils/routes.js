export const Routes = {
  HomeRoute: '/',
  SignInRoute: '/signIn', 
  SignUpRoute: '/signUp',
  UsersRoute: '/users',
  TasksRoute: '/tasks' 
}

export const linkToRoute = (history, route) => {
  history.push(route)
}