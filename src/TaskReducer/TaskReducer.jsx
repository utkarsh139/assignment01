export const initialState = {
   tasks: [],
   filter:'ALL' ,
   searchQuery:"",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
    ...state, 
    tasks: [
      ...state.tasks,         
      {
        id: Date.now(),
        text: action.payload,
        completed: false,
      },
    ],
  };

    case "DELETE_TASK":
    return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case "EDIT_TASK":
    return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === action.payload.id
        ? { ...task, text: action.payload.text }
        : task
    ),
  };

    case "TOGGLE_TASK":
    return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === action.payload? { ...task, completed: !task.completed } : task
    ),
  };

    case "SET_FILTER":
    return {
      ...state,
      filter: action.payload
    };
  
    case "SET_SEARCH_QUERY":
    return{
    ...state,
    searchQuery: action.payload
    };

    default:
      return state;
  }
}
