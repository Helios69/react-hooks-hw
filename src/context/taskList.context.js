import React, { useState, useEffect, createContext } from 'react';
import { v4 } from 'uuid';
import { saveState } from '../utils/localStorage';

export const TaskListContext = createContext({});

const { Provider } = TaskListContext;

function TaskListProvider({defaultState, children}) {
    const [list, setList] = useState([]);
    
    useEffect(() => {
        if (Array.isArray(defaultState)) setList([...defaultState]);
    }, []);
    const addTask = ({ text, id, isCompleted }) => {
        let task = id ? list.find(({ id: taskId }) => taskId === id) || { id: v4() } : { id: v4() };
        
        task = {
            ...task,
            text,
            isCompleted
        };

        const state = [
            task,
            ...list.filter(({ id }) => id !== task.id),
        ];

        saveState(state);

        return setList(state);
    };

    const removeTask = (taskId) => {
        const state = [
            ...list.filter(({ id }) => id !== taskId),
        ];

        saveState(state);

        return setList(state);
    };

    return (
        <Provider value={{
            taskList: list,
            addTask,
            removeTask,
        }}>
            {children}
        </Provider>
    );
}

export default TaskListProvider;