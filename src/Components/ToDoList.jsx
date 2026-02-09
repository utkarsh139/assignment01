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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg gap-6">
      <h2 className="text-2xl font-bold text-center mb-4">My list</h2>
      <div className="flex justify-center gap-2 mb-4">
         <button
          onClick={() => setFilter("ALL")}
          disabled={filter === "ALL"}
          className={`px-3 py-1 rounded-md text-sm
    ${filter === "ALL"
      ? "bg-red-600 text-white cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300"}
  `}
        >
          All
        </button>

        <button
          onClick={() => setFilter("COMPLETED")}
          disabled={filter === "COMPLETED"}
          className={`px-3 py-1 rounded-md text-sm
    ${filter === "COMPLETED"
      ? "bg-red-600 text-white cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300"}
  `}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("PENDING")}
          disabled={filter === "PENDING"}
          className={`px-3 py-1 rounded-md text-sm
    ${filter === "PENDING"
      ? "bg-red-600 text-white cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300"}
  `}
        >
          Pending
        </button>
      </div>

      <div className='flex gap-2 mb-4'>
        <input
          type="text"
          placeholder='Enter a task'
          value={newTask}
          onChange={handleInputChange}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"

        />

        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={addTask}>
          Add
        </button>
      </div>

      <ol className="space-y-3">
        {visibleTasks.map((task) => (
    <li key={task.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
        

      {editingTaskId === task.id ? (
        <>
          
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="px-2 py-1 border rounded-md mr-2"
          />

          <button 
          onClick={saveEdit}
          className="px-2 py-1 bg-blue-500 text-white rounded-md mr-1"
          >
            Save
          </button>
          <button 
          onClick={cancelEdit}
          className="px-2 py-1 bg-red-500 text-white rounded-md mr-1"
          >Cancel
          </button>
        </>
      ) : (
        <>
          <span className={`flex-1 ${
    task.completed ? "line-through text-gray-400" : ""
  }`}>{task.text}</span>
          <input 
          type="checkbox"
          checked={task.completed}
          onChange={()=>toggleTask(task.id)} />

          <button 
          onClick={() => startEditing(task)}
          className="text-blue-600 hover:underline mr-2">
            Edit
          </button>

          <button
            className="text-red-600 hover:underline"
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
