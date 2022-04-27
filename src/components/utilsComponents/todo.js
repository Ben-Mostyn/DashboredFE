import React, { useState } from 'react';
import Draggable from "react-draggable";

const ToDoTemplate = () => {  //two features
    const [currentTodo, setCurrentTodo] = useState('');  //the one you are typing
    const [todos, setTodos] = useState([   //the ones you have already written
    {
        todo: 'Add new todo',
        isCompleted: true
    }
]);
    const createNewTodo = (currentTodo) => {
        let todosArray = [...todos];
        todosArray.push({todo: currentTodo,
        isCompleted: false});
        setTodos(todosArray);
    }
    const completeTodo = (index) => {
        let todosArray = [...todos];
        todosArray[index].isCompleted = !todosArray[index].isCompleted;
        setTodos(todosArray);
      }
    
      const  deleteTodo = (index) => {
        let todosArray = [...todos];
        todosArray.splice(index, 1);
        setTodos(todosArray);
      }
    return(
        <Draggable><div>
            <h1>ToDo List!</h1>
            <input
            className = "todo-input"
            value = {currentTodo}
            onChange = {e => {setCurrentTodo(e.target.value);
            }}
            onKeyPress = {e => {
                if (e.key === "Enter") {createNewTodo(currentTodo);
                setCurrentTodo(" ");
            }
            }}
            placeholder = "What do you need ToDo?"
            />
            
            {todos.map((todo, index) => (
                <div key = {todo} className = "todo" >
                    <div className = "checkbox" onClick = {() =>
                    completeTodo(index)}>{todo.isCompleted && <span>&#x2714;</span>}
                    </div>
                <div className = {todo.isCompleted ? "done" : " "}> {todo.todo}</div>
                <div className="delete" onClick={() => deleteTodo(index)}>
            &#128465;
          </div>
        </div>
      ))}
      {todos.length > 0 && `${todos.length} items`}
    </div></Draggable>
  );
}


export default ToDoTemplate;