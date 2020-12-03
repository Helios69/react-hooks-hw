import React, { useState, useContext, useCallback } from 'react';
import Input from 'components/Input';
import { TaskListContext } from 'context/taskList.context';

import { StyledForm, StyledAddButton } from './styles';

function Form() {
    const [inputValue, setInputValue] = useState('');
    const ctx = useContext(TaskListContext);
    const addTask = useCallback((e) => {
        e.preventDefault();
        if (inputValue) {
            ctx.addTask({ text: inputValue, isCompleted: false });
            setInputValue('');
        }
    }, [inputValue]);

    const isTaskExists = ctx.taskList.some(({ text }) => inputValue === text);

    return (
        <StyledForm onSubmit={addTask}>
            <Input value={inputValue} onChange={setInputValue} />

            <StyledAddButton disabled={isTaskExists || !inputValue}>ADD TASK</StyledAddButton>
        </StyledForm>
    );
}

export default Form;