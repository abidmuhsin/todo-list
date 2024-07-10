import { CgCalendarDates } from "react-icons/cg"; 
import { TodoItems } from "./TodoItems";
import React, { useRef, useEffect, useState } from "react";

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();
    const add = () => {
        const inputText = inputRef.current.value.trim();

        if (inputText === ""){
            return null;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=> [...prev, newTodo])
        inputRef.current.value = "";
}

const deleteTodo = (id)=> {
    setTodoList((prvTodos)=> {
       return prvTodos.filter((todo)=> todo.id !== id)
    })
}

const toggle = (id) => {
    setTodoList ((prevTodos)=>{
        return prevTodos.map((todo)=>{
            if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
}

useEffect (()=> {
    localStorage.setItem("todos", JSON.stringify(todoList));
},[todoList])

const completeTodos = todoList.filter(todo => todo.isComplete);
const incompleteTodos = todoList.filter (todo => !todo.isComplete);

  return (
    <div className="flex items-center justify-center bg-slate-400">
        <div className="flex">
                <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
                    <div className="flex items-center mt-7 gap-2">
                        <CgCalendarDates className="text-3xl" />
                        <h1 className="text-3xl font-semibold">To-Do List</h1>
                    </div>
                    <div className="flex items-center my-7 bg-gray-200 rounded-full">
                        <input ref={inputRef} type="text" placeholder="Add your task" className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"/>
                        <button  onClick={add} className="border-none bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">ADD +</button>
                    </div>
                    <div>
                        <div className="mt-6">
                            <h2 className="text-2xl">Incomplete Task</h2>
                            {incompleteTodos.map((item, index)=>{
                                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
                            })}
                        </div>
                    </div>
                </div>
                <div className="bg-white w-[60vh] p-10 mx-10 rounded-xl">
                    <h1 className="text-3xl mb-10">Completed Task</h1>
                    {completeTodos.map((item, index)=>{
                        return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
                    })}
                </div>
            </div>    
    </div>
  )
}

export default Todo;