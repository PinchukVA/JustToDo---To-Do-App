import React from 'react';

import './Tasks.scss';

import { 
  Search,
  TaskUser 
} from '../../components'

function Tasks () {
  
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

    if (arr.length === 0) {
      result = <span> No created users </span>;
    }

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
        <Search
        placeholder = 'Find Task'
        />

        <div className='tasks__wraper'>
            <ul className='tasks-list'>{renderTasks(tasks)}</ul>
        </div>

      </section>
    </>
  )
}

export default Tasks;