import React, {useContext,useEffect,useState} from 'react';
import { TaskContext } from '../Context/TaskContext.jsx';

import { useDebounce } from '../hooks/useDebounce.jsx';


function Navbar(){

    const{dispatch}=useContext(TaskContext);
    const[searchText,setSearchText]=useState("");
    const debouncedSearchText=useDebounce(searchText,300);

    

    function handleSearchChange(e){
        setSearchText(e.target.value);
    }

    useEffect(()=>{
        dispatch({
            type:"SET_SEARCH_QUERY",
            payload: debouncedSearchText
        });
    },[debouncedSearchText,dispatch]);
    return(
        <nav className='flex items-center justify-between p-4 bg-gray-800 text-white shadow-md'>
            <div className="app-name">
            <h1 className="text-white text-2xl font-bold">Task Manager</h1>
            </div>
            <div className="border border-gray-600 rounded-md px-2 py-1">
                <input 
                type="text" 
                value={searchText} 
                onChange={handleSearchChange} 
                placeholder='Search Tasks' 
                className="px-4 py-2
                        rounded-lg
                        outline-none
                        focus:ring-2 focus:ring-white
                        text-gray-700"  
                />
            </div>
        </nav>

    );
}
export default React.memo(Navbar);