import { useState } from 'react'

function App() {
  // 1. Start with an empty string (no space)
  const [newItem, setNewItem] = useState("") 
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    
    // Prevent adding empty items
    if (newItem.trim() === "") return 

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    // 2. Clear the input after adding
    setNewItem("") 
  }

  function toggleTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        // Just flip the current status
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} 
            type="text" 
            id="item" 
            placeholder="Please type your item" 
          />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">To-Do List</h1>
      
      {/* 3. Helpful message if list is empty */}
      {todos.length === 0 && "No Todo list yet!"}
	  {/* 4. Map through the list of todos and display them */}
	  

      <ul className="list">
        {todos.map(todo => {
          return (
            <li key={todo.id} className="list-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => toggleTodo(todo.id)} 
                />
                {todo.title}
              </label>
              <button 
                className="delete-btn" 
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
