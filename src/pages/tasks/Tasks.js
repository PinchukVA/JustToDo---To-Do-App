import React, { useState } from 'react';

import './Tasks.scss';

import { 
  Search,
  TaskUser,
  AddTaskForm 
} from '../../components'

function Tasks () {

  const [searchText, setSearchText] = useState('')
  const [text, setText] = useState('')
  const [searchError, setSearchError] = useState(false)
  const [searchErrorText, setSearchErrorText] = useState('')


  const handleChange = (e) => {

    if (e.target.name === 'addTaskForm') {
      setText(e.target.value);
      console.log("handleChange - text", text);
    }

    if (e.target.name === 'searchTaskForm') {
      setSearchText(e.target.value);
      console.log("handleChange - searchText", searchText);
    }
  }

  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log('handleSearchSubmit')
  }
  
  const handleChangeText = (e) => {
    setText(e.target.value);
    console.log("handleChangeText", e);
  };

  const checkInput = () => {

  }

  const handleTaskSubmit = e => {
    e.preventDefault();
    console.log('handleTaskSubmit', e.target.name)
  }

  const tasks = [
    {
      id: 110,
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      completed: false
    },
    {
      id: 111,
      name:
        'mco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pari',
      completed: true
    },
    {
      id: 112,
      name:
        'ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, s',
      completed: false
    },
    {
      id: 113,
      name: 'ure  architecto beatae vitae dicta sunt explicabo. Nemo',
      completed: false
    },
    {
      id: 114,
      name: 's mistaken idea of denouncing pleasure and praising pain was b',
      completed: true
    }
  ];

  const renderTasks = (arr) => {
    let result;

    result = arr.map((item) => (
      < TaskUser
        key={item.id}
        taskName = {item.name}
        taskId = {arr.indexOf(item)+1}
      />
    ));
    return result;
  };

  return (
    <>
      <section className='tasks__section'>

        <AddTaskForm 
          onSubmit = {handleTaskSubmit}
          onChange = {handleChange}
          nameInput = 'addTaskForm' 
          value={text}
        />

        <Search
          placeholder = 'Find Task'
          onChange={handleChange}
          onSubmit={handleSearchSubmit}
          value={searchText}
          nameInput = 'searchTaskForm' 
          searchError = {searchError}
          searchErrorText = {searchErrorText}
        />

        <div className='tasks__wraper'>
            <ul className='tasks-list'>{renderTasks(tasks)}</ul>
        </div>

      </section>
    </>
  )
}

export default Tasks;