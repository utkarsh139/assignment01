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
        <nav className='nav'>
            <div className="app-name">
            <h1>Task Manager</h1>
            </div>
            <div className="search-bar">
                <input type="text" value={searchText} onChange={handleSearchChange} placeholder='Search Tasks' />
            </div>
        </nav>

    );
}
export default React.memo(Navbar);