import React, { useContext } from "react";

export const TodoContext = React.createContext({
    MainTaskContainer: [] ,
    AddTask: ( taskObject ) => {} ,
    UpdateTask: ( id, taskObject ) => {} ,
    DeleteTask: ( id ) => {} ,
    ToggleTask: ( id ) => {} 
}) ;

export const TodoContextProvider = TodoContext.Provider ;

export const useTodo = () => {
    return useContext(TodoContext) ;
}