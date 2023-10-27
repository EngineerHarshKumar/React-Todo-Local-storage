import React, { Fragment, useState } from "react";
import { useTodo } from "../../Contexts/TodoContexts";

export default function TodoForm() {

    const { AddTask } = useTodo() ;
    const [ justWork, setJustWork ] = useState('') ;

    const handleSubmission = (e) => {

        e.preventDefault() ;
        
        if( !justWork) return ;
        
        AddTask({work: justWork, Completed: false})
        console.log(justWork) ;
        
        setJustWork('') ;
    }

    return (
        <Fragment>

            <form onSubmit={ handleSubmission } className=" mb-7" >
                <input 
                    type="text" 
                    value={justWork}
                    onChange={(e) => { setJustWork(e.target.value) }}
                    className=" outline-none px-5 py-2 w-3/6 rounded-tl-xl rounded-bl-xl "
                />

                <button
                    type="submit"
                    className=" hover:bg-green-800 outline-none border-none rounded-tr-xl rounded-br-xl px-3 py-2 bg-green-700 Hover:bg-blue-900"
                >
                    Add Task
                </button>
            </form>
            
        </Fragment>
    ) ;
}