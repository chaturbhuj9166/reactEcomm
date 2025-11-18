import React, { useReducer } from "react";
import "./Todolist.css";
import { MdEdit } from "react-icons/md";

function Todolist() {
  const initState = {
    input: "",
    tasks: [],
    isEditing: false,
    editId: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "inputChange":
        return { ...state, input: action.payload };

      case "addTask":
        if (state.input.trim() === "") return state;

        if (state.isEditing) {
          return {
            ...state,
            tasks: state.tasks.map((obj) =>
              obj.id === state.editId ? { ...obj, task: state.input } : obj
            ),
            input: "",
            isEditing: false,
            editId: null,
          }; 
        }

        return {
          ...state,
          tasks: [...state.tasks, { id: Date.now(), task: state.input }],
          input: "",
        };

      case "DELETE":
        return {
          ...state,
          tasks: state.tasks.filter((obj) => obj.id !== action.payload),
        };

      case "Edit":
        const item = state.tasks.find((obj) => obj.id === action.payload);
        return {
          ...state,
          isEditing: true,
          editId: action.payload,
          input: item.task,
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addTask" });
        }}
      >
        <input
          type="text"
          placeholder="Enter Task"
          value={state.input}
          onChange={(e) =>
            dispatch({ type: "inputChange", payload: e.target.value })
          }
        />

        <button type="submit">
          {state.isEditing ? "Editng Task" : "Add Task"}
        </button>
      </form>

      <ul>
        {state.tasks.map((obj) => (
          <li key={obj.id}>
            {obj.task}{" "}
            <span onClick={() => dispatch({ type: "DELETE", payload: obj.id })}>
              X
            </span>{" "}
            <span onClick={() => dispatch({ type: "Edit", payload: obj.id })}>
              <MdEdit />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todolist;
