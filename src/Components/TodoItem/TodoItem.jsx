import React, { Fragment, useState } from "react";
import { useTodo } from "../../Contexts/TodoContexts";

export default function TodoItem({ task }) {

    const [ isEditable, setIsEditable ] = useState(false) ;
    const { UpdateTask, DeleteTask, ToggleTask } = useTodo() ;
    const [ todoMessage , SetTodoMessage ] = useState(task.work)

    const toggling = () => {
        ToggleTask( task.id ) ;
    } 

    const editTodo = () => {
        UpdateTask( task.id , {...task , work: todoMessage })
        // The below line take 1.5 hours to solve in debuging processing
        setIsEditable(false) ;
    }

    return (
        <Fragment>
                <div className=" flex items-center justify-between">

                    
                    <input 
                        type = "checkbox" 
                        checked = {task.Completed}
                        onChange = {toggling}
                        className=" cursor-pointer w-5 h-5"

                    />
                    
                    <input 
                        type = "text"
                        className = {` w-5/6 px-4 py-2 rounded-xl outline-none border-none bg-green-900  text-xl ${task.Completed ? "bg-blue-700" : "bg-green-700"} ${ isEditable ? "border-2 border-black" : " border-transparent"} ${task.Completed ? "line-through" : ""} `}
                        value ={todoMessage}
                        onChange = {(event) => { SetTodoMessage(event.target.value) }}
                        readOnly = {!isEditable} 
                    />
                    
                    
                    <div>
                        <button
                            className={`${task.Completed ? "" : "hover:-translate-y-1 transition"}  rounded-tl-xl rounded-bl-xl cursor-pointer bg-red-500 disabled:bg-violet-700 disabled:opacity-50 disabled:cursor-default` }
                            onClick={ () => { 
                                if (task.Completed) return;

                                if (isEditable) {
                                    editTodo();
                                    // hall program is not work because setIdEditable is not able to se value of it
                                } else setIsEditable((prev) => !prev);  
                            }}
                            disabled = {task.Completed} 
                        >
                            {isEditable ? "save" : "edit"}                        
                        </button>
                    
                        <button
                            className={`rounded-tr-xl outline-none rounded-br-xl ${task.Completed ? "" : "hover:-translate-y-1 transition"}`}
                            onClick={() => {DeleteTask(task.id)}}
                        >❌</button>
                    </div>

                </div>
        </Fragment>
    ) ;
}