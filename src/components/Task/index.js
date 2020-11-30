import React, { useReducer, Fragment } from 'react';
import Input from 'components/Input';

import { StyledEdit, StyledTask, StyledDelete, StyledText, StyledButton, StyledEditForm, StyledButtonsWrapper, StyledChecked, StyledUnchecked } from './styles';

const initialState = {
    editValue: '',
    isEdit: false,
};

function reducer(state, action) {
    switch (action.type) {
      case 'EDIT_CHANGE':
        return {...state, editValue: action.payload};
      case 'EDIT_PRESS':
        return {...state, editValue: action.payload.editValue, isEdit: action.payload.isEdit};
      case 'DROP_EDIT':
        return {...state, editValue: '', isEdit: false};
      default:
        throw new Error();
    }
  }

function Task({ id, onDelete, onSave, children, isCompleted }){
    const [state, dispatch] = useReducer(reducer, initialState);

    const onEditChange = (value) => {
        dispatch({type: 'EDIT_CHANGE', payload: value});
    };
    const onCheck = () => {
        onSave({ id, text: children, isCompleted: !isCompleted });
    };

    const onEditPress = () => {
        dispatch({type: 'EDIT_PRESS', payload: {editValue: children, isEdit: true}});
    };

    const onSaveEdit = (e) => {
        e.preventDefault();

        const { editValue } = state;

        if (editValue) {
            onSave({ id, text: editValue });
            dispatch({type: 'DROP_EDIT'})
        }
    };
    return (
        <StyledTask>
            {state.isEdit ? (
                <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit} >
                    <Input 
                        onChange={onEditChange} value={state.editValue}
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
                        <StyledButton onClick={() => onDelete(id)}>
                            <StyledDelete />
                        </StyledButton>
                    </StyledButtonsWrapper>
                </Fragment>
            )}
        </StyledTask>
    );
}


export default Task;