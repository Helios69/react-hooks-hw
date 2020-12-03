import React, { createContext, useReducer } from "react";
import { v4 } from "uuid";
import { getState, saveState } from "../utils/localStorage";
import { ADD_TASK, CHECK_TASK, REMOVE_TASK } from "./types";

const defaultStateValue = getState() || [];

export const TaskListContext = createContext({ taskList: defaultStateValue });
const { Provider } = TaskListContext;

const reducer = (state = defaultStateValue, action) => {
  switch (action.type) {
    case ADD_TASK:
      let task = action.payload.id
        ? state.find(({ id: taskId }) => taskId === action.payload.id) || {
            id: v4(),
          }
        : { id: v4() };
      task = {
        ...task,
        text: action.payload.text,
        isCompleted: action.payload.isCompleted,
      };
      state = [task, ...state.filter(({ id }) => id !== task.id)];
      saveState(state);
      return state;
    case REMOVE_TASK:
      state = state.filter(({ id }) => id !== action.payload);
      saveState(state);
      return state;
    case CHECK_TASK:
      const newTask = {
        ...action.payload,
        isCompleted: !action.payload.isCompleted,
      };
      state = state.map((task) =>
        task.id === action.payload.id ? newTask : task
      );
      saveState(state);
      return state;
    default:
      return state;
  }
};
const TaskListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultStateValue);

  const addTask = (task) => dispatch({ type: ADD_TASK, payload: task });
  const removeTask = (taskId) =>
    dispatch({ type: REMOVE_TASK, payload: taskId });
  const checkTask = (task) => dispatch({ type: CHECK_TASK, payload: task });

  return (
    <Provider
      value={{
        taskList: state,
        addTask,
        removeTask,
        checkTask,
      }}
    >
      {children}
    </Provider>
  );
};

export default TaskListProvider;
