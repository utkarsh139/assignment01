import { createContext,useReducer } from "react";
import { taskReducer,initialState } from "../TaskReducer/TaskReducer.jsx";


export const TaskContext=createContext(null);

export function TaskProvider({children}){
  const [state, dispatch] = useReducer(taskReducer, initialState);
    return (
        <TaskContext.Provider value={{state,dispatch}}>
            {children}
        </TaskContext.Provider>
    );
}

