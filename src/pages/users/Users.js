import React, { useState } from 'react';

import './Users.scss';

import { 
  Search,
  UserItem,
  AddTaskForm
} from '../../components'

function Users () {

  const [text, setText] = useState('')

  const [searchText, setSearchText] = useState('')

  const handleChangeText = (e) => {
    setText(e.target.value);
    console.log("handleChangeText", text);
  };

  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
    console.log("handleChangeSearchText", searchText);
  };

  const checkInput = () => {

  }
  
  const handleTaskSubmit = e => {
    e.preventDefault();
    console.log('handleTaskSubmit')
  }

  const users = [
    {
      id: "112550",
      nickname: "user_test_0",
      login: "user_test_0@yandex.ru"
    },
    {
      id: "112551",
      nickname: "user_test_1",
      login: "user_test_1@yandex.ru"
    },
    {
      id: "112552",
      nickname: "user_test_2",
      login: "user_test_2@yandex.ru"
    },
    {
      id: "112553",
      nickname: "user_test_3",
      login: "user_test_3@yandex.ru"
    },
    {
      id: "112554",
      nickname: "user_test_4",
      login: "user_test_4@yandex.ru"
    }
  ];

  const renderUsers = (arr) => {
    let result;

    result = arr.map((item) => (
      < UserItem
        key={item.id}
        nickname = {item.nickname}
        taskId = {arr.indexOf(item)+1}
        login = {item.login}
      />
    ));
    return result;
  };


  return (
    <>
      <section className='users'>

        <AddTaskForm 
          onSubmit={handleTaskSubmit}
          onChange={handleChangeText}
          value={text}
        />

        <Search
          placeholder = 'Find User'
          onChange={handleChangeSearchText}
          value={searchText}
          />

        <div className="users-wraper">

          <ul className="users-list">
            {renderUsers(users)}
          </ul>

        </div>

      </section>
    </>
  )
}

export default Users;