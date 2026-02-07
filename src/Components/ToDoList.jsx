import { useContext,useMemo,useState } from 'react';
import { TaskContext } from '../Context/TaskContext.jsx';


function ToDoList() {
  
  const {state,dispatch} = useContext(TaskContext);
  const{tasks,filter,searchQuery}=state;

  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");


  function handleInputChange(event) {
    setNewTask(event.target.value)
  }
  function addTask() {
    if(newTask.trim()==="") return;
    dispatch({ 
    type: "ADD_TASK", 
    payload: newTask 
  
  });

    setNewTask("");
  }

  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id
    });
  }

  function toggleTask(id){
    dispatch({
      type:"TOGGLE_TASK",
      payload: id
    });
  }

  function setFilter(filterType){
    dispatch({
      type:"SET_FILTER",
      payload: filterType
    });
  }

  function startEditing(task){
    setEditingTaskId(task.id);
    setEditedText(task.text);
  }

  function saveEdit(){
    if(editedText.trim()==='') return;
    dispatch({
      type:"EDIT_TASK",
      payload: {id: editingTaskId, text: editedText}
    });
    setEditingTaskId(null);
    setEditedText("");
  }

  function cancelEdit(){
    setEditingTaskId(null);
    setEditedText("");
  }

const visibleTasks = useMemo(() => {
  let result = tasks;
  if (filter === "COMPLETED") {
    result = result.filter(task => task.completed);
  } else if (filter === "PENDING") {
    result = result.filter(task => !task.completed);
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    result = result.filter(task =>
      task.text.toLowerCase().includes(query)
    );
  }

  return result;
}, [tasks, filter, searchQuery]);


  return (
    <div className='to-do-list'>
      <h2>My list</h2>
      <div className='filters'>
         <button
          onClick={() => setFilter("ALL")}
          disabled={filter === "ALL"}
        >
          All
        </button>

        <button
          onClick={() => setFilter("COMPLETED")}
          disabled={filter === "COMPLETED"}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("PENDING")}
          disabled={filter === "PENDING"}
        >
          Pending
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder='Enter a task'
          value={newTask}
          onChange={handleInputChange}

        />

        <button className='add-button'
          onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {visibleTasks.map((task) => (
    <li key={task.id}>
        

      {editingTaskId === task.id ? (
        <>
          
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />

          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span className="text" style={{textDecoration: task.completed? "line-through":"none"}}>{task.text}</span>
          <input 
          type="checkbox"
          checked={task.completed}
          onChange={()=>toggleTask(task.id)} />

          <button onClick={() => startEditing(task)}>
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
      </ol>
    </div>
  )
}

export default ToDoList
