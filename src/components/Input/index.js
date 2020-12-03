import React, { useCallback } from 'react';
import { StyledLabel, StyledInput } from './styles';

function Input({value, placeholder, label, disabled = false, type = 'text', onChange}) {
    const onChangeHandler = useCallback(({ currentTarget: { value } }) => onChange(value), [value]);

    return (
        <StyledLabel>
            {label && <span>{label}</span>}
            <StyledInput autoFocus={true} {...{ value, placeholder, type, disabled, onChange: onChangeHandler }} />
        </StyledLabel>
    );
}

export default Input;