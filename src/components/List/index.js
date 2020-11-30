import React, { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { TaskListContext } from 'context/taskList.context';
import Task from 'components/Task';

import { StyledHeight, StyledList } from './styles';

function List() {
    const [height, setHeight] = useState(0);
    const listRef = useRef();
    const ctx = useContext(TaskListContext);
    const {taskList = []} = ctx;
    useEffect(() => {
        const newHeight =  listRef.current && listRef.current.offsetHeight;
        if (newHeight && height !== newHeight) {
            setHeight(newHeight);
        }
    }, [taskList.length]);

    const list = useMemo(() =>{
        return taskList.sort((a,b) => a.isCompleted - b.isCompleted).map(({ text, id, isCompleted }) => (
            <Task 
                key={id} 
                onDelete={ctx.removeTask}
                onSave={ctx.addTask}
                id={id}
                isCompleted={isCompleted}
            >
                {text}
            </Task>
        ))
    }, [taskList.length]); 

    return (
        <StyledList ref={listRef}>
            {list}

            <StyledHeight>
                List height: {height} px
            </StyledHeight>
        </StyledList>
    );
}

export default List;