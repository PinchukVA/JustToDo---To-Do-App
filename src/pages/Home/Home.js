import React, { useEffect }from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';
import { useHistory } from 'react-router-dom';
import { Routes, linkToRoute } from '../../utils/routes.js'

function Home () {

  const history = useHistory();
  const {token, role} = useSelector( data => data.Reducer)

  const linkToStartPage = (role) => {
    if ( role === 'admin'){
        linkToRoute(history, Routes.UsersRoute)
    }else{
        linkToRoute(history, Routes.TasksRoute)
    }
  }

  useEffect (() => {
    if(token){
      linkToStartPage(role)
    }else{
      linkToRoute(history, Routes.SignInRoute)
    }
  },[])

  return (
    <>
      <h1>Main page </h1>
    </>
  )
}

export default Home;