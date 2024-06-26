import { useState, useEffect } from 'react'
// import './App.css'
import { TodoProvider } from './context';
import {TodoForm, TodoItem} from './components'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodoItem) => (prevTodoItem.id === id ? todo : prevTodoItem)))
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter( (todoItem) => (todoItem.id !== id) ))
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map( (todoItem) => (todoItem.id === id ? {...todoItem, completed: !todoItem.completed} : todoItem) ))
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []) // to fetch the todos stored from previous sessions

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  
  

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#0d1b30] min-h-screen p-6">
              <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form */}
            < TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            { todos.map((todoItem) => { 
                return (
                  <div key= {todoItem.id} className='w-full'> 
                    <TodoItem todo={todoItem}/> 
                  </div>
                )}
              )
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
