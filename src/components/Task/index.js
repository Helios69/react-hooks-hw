import React, { useState, Fragment, useContext, useCallback } from 'react';
import Input from 'components/Input';
import { TaskListContext } from 'context/taskList.context';

import { StyledEdit, StyledTask, StyledDelete, StyledText, StyledButton, StyledEditForm, StyledButtonsWrapper, StyledChecked, StyledUnchecked } from './styles';

function Task({ id, children, isCompleted }){
    const [editValue, setEditValue] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const {addTask, removeTask, checkTask, taskList} = useContext(TaskListContext);

    const onEditPress = useCallback(() => {
        setEditValue(children);
        setIsEdit(true);
    }, []);

    const onCheck = useCallback(() => {
        checkTask({ id, text: children, isCompleted });
    }, []);

    const onSaveEdit = (e) => {
        e.preventDefault();
        const isTaskExists = taskList.some(({ text }) => editValue === text);
        if (editValue && !isTaskExists) {
            addTask({ id, text: editValue });
            setIsEdit(false);
            setEditValue('');
        }
    };
    const onRemove = useCallback(() => removeTask(id), []);
    
    return (
        <StyledTask>
            {isEdit ? (
                <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit} >
                    <Input 
                        onChange={setEditValue} value={editValue}
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
                        <StyledButton onClick={onRemove}>
                            <StyledDelete />
                        </StyledButton>
                    </StyledButtonsWrapper>
                </Fragment>
            )}
        </StyledTask>
    );
}


export default Task;