import React, { useEffect, useState } from "react" ;
import gsap from 'gsap';
import './App.css' ;
import { TodoContextProvider } from "./Contexts/TodoContexts";
import TodoForm from "./Components/TodoForm/TodoForm";
import TodoItem from "./Components/TodoItem/TodoItem";

export default function App() {

  // Its hold the all task
  const [ MainTaskContainer, setMainTaskContainer ] = useState([]) ;

  const AddTask = ( taskObject ) => {

    setMainTaskContainer( ( previousTaskContainer ) => {
      return (
        [ { id: Date.now() , ...taskObject } , ...previousTaskContainer ] 
      ) ;
    } ) ;
  } ;

  const DeleteTask = ( id ) => {
    // setMainTaskContainer( (prev) => prev.filter((eachTask) => eachTask.id !== id ))
    setMainTaskContainer( (previousTodos) => previousTodos.filter((eachTodo) => eachTodo.id !== id ) ) ;

  } ;


  const UpdateTask = ( id , taskObject ) => {

    setMainTaskContainer( ( previousTaskContainer ) => {
      return (
        previousTaskContainer.map( (eachTask) => {
          return (
            eachTask.id === id ? taskObject : eachTask 
          ) ;
        })
      ) ;
    } ) ;
  }  ;


  const ToggleTask = ( id ) => {
    
    setMainTaskContainer( ( previousTaskContainer ) => {
      return (
        previousTaskContainer.map( (eachTask) => eachTask.id === id ? { ...eachTask, Completed: !eachTask.Completed} : eachTask) 
      ) ;
    } ) ;
  }  ;


  useEffect( () => {
    const tasks = JSON.parse(localStorage.getItem('works'));

    if( tasks && tasks.length > 0) {
      setMainTaskContainer(tasks) ;
    }
  } , [] )

  useEffect( () => {
    localStorage.setItem('works', JSON.stringify(MainTaskContainer)) ;
  } , [MainTaskContainer] )
  
  return (
    <TodoContextProvider value={{ MainTaskContainer, AddTask, DeleteTask, UpdateTask , ToggleTask }}>
      <div className=" w-screen h-screen bg-teal-950 py-5 px-10">
        <div className=" px-6 py-2 border-2 rounded-xl shadow-lg shadow-green-800 border-transparent pb-5">

          <div className=" space-y-5 mb-10">
            <h1 className=" text-5xl text-green-300">Manage Your Todo</h1>
            <TodoForm />
          </div>
          
          <div>
            { MainTaskContainer.map( (task) => {
              return (
                <div key={ task.id } className="px-5 py-3 border-2 shadow-lg shadow-blue-900 border-transparent rounded-xl mb-4">
                  <TodoItem task={task}/>
                </div>
              ) ;
            } )}
          </div>
        
        </div>
      </div>
    </TodoContextProvider>
  )
}