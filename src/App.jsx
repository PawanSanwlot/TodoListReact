import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])

  const [todoData, setTodoData] = useState({
    id: "",
    todo: "",
    isFinished: false
  })

 function addTodo() {
  if (todoData.todo !== "") {
      setTodos(prevTodos => {
      return [...prevTodos, todoData]
    })
    setTodoData({...todoData, todo: ""})
  }
 }

 function deleteTodo(id) {
  setTodos((prevTodos) => {
    return prevTodos.filter(item => item.id !== id)
  })
 }

 function toggleIsFinished(id) {
  setTodos((prevTodos => {
    return prevTodos.map(item => {
      if (item.id === id) {
        return {...item, isFinished: !item.isFinished}
      }
      return item
    })
  }))
 }

  const todosElements = todos.map((item) => {
     return <li key={item.id} className='list-group-item' style={{display: 'flex', justifyContent: "space-between"}}>
        <span style={{cursor: "pointer", textDecoration: item.isFinished ? "line-through" : "none"}}
          onClick={() => toggleIsFinished(item.id)}
        >
          {item.todo}</span>
        <span><button onClick={() => deleteTodo(item.id)} className='btn btn-outline-danger btn-sm'>Delete</button></span>
      </li>
  })

  return (
    <div className='app-container container'>
      <h1>My Todo List</h1>
      <input value={todoData.todo} type="text" placeholder='todo' className='form-control todoInput' onChange={(e) => setTodoData({id: uuidv4(), todo: e.target.value, isFinished: false})}/>
      <button onClick={addTodo} className='btn btn-success btn-sm' style={{marginTop: "10px"}}>Enter</button>
      <ul className='list-group' style={{marginTop: "20px"}}>
       {todosElements}
      </ul>
    </div>
  )
}

export default App
