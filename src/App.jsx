import React from 'react'
import ToDoList from './Components/ToDoList.jsx';

import { TaskProvider } from './Context/TaskContext.jsx';
import Navbar from './Components/Navbar.jsx';

function App() {
  
  return (

    <TaskProvider>
      <Navbar/>
      <hr />
      <ToDoList/>
    </TaskProvider>

  )
}

export default App
