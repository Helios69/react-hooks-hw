import React, { useState, Fragment, useContext } from 'react';
import Input from 'components/Input';
import { TaskListContext } from 'context/taskList.context';

import { StyledEdit, StyledTask, StyledDelete, StyledText, StyledButton, StyledEditForm, StyledButtonsWrapper, StyledChecked, StyledUnchecked } from './styles';

function Task({ id, children, isCompleted }){
    const [editValue, setEditValue] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const {addTask, removeTask, checkTask, taskList} = useContext(TaskListContext);

    const onEditChange = (value) => setEditValue(value);

    const onEditPress = () => {
        setEditValue(children);
        setIsEdit(true);
    }

    const onCheck = () => {
        checkTask({ id, text: children, isCompleted });
    };

    const onSaveEdit = (e) => {
        e.preventDefault();
        //bug about repeating task name when editing
        const isTaskExists = taskList.some(({ text }) => editValue === text);
        if (editValue && !isTaskExists) {
            addTask({ id, text: editValue });
            setEditValue('');
            setIsEdit(false);
        }
    };
    
    return (
        <StyledTask>
            {isEdit ? (
                <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit} >
                    <Input 
                        onChange={onEditChange} value={editValue}
                        placeholder="Task must contain title"
                    />
                </StyledEditForm>
            ) : (
                <Fragment>
                    <StyledButton onClick={onCheck}>
                        {
                            isCompleted ? 
                            <StyledChecked />
                            :
                            <StyledUnchecked />
                        }
                    </StyledButton>
                    <StyledText style={{textDecoration: isCompleted ? 'line-through' : 'none'}}>{children}</StyledText>

                    <StyledButtonsWrapper>
                        <StyledButton onClick={onEditPress}>
                            <StyledEdit />
                        </StyledButton>
                        <StyledButton onClick={() => removeTask(id)}>
                            <StyledDelete />
                        </StyledButton>
                    </StyledButtonsWrapper>
                </Fragment>
            )}
        </StyledTask>
    );
}


export default Task;