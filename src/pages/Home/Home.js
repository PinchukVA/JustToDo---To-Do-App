import React, { useEffect }from 'react';

import './Home.scss';
import { useHistory } from 'react-router-dom';

function Home () {
  const history = useHistory();
  
  useEffect (() => {
    history.push('/signIn')
  },[])

  return (
    <>
      <h1> Главная Страница</h1>
    </>
  )
}

export default Home;