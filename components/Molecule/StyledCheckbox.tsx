import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    onChange: (checked: boolean) => void;
    label: string;
    checked?: boolean;
    required?: boolean;
}

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    > input:checked {
        accent-color: var(--FELT_GREEN);
    }
`;

const CheckboxInput = styled.input`
    margin-right: 10px;
    margin-top: 3px;
`;

const CheckboxLabel = styled.label`
    font-size: 16px;
    color: #696969;
    font-family: 'Nunito Sans', sans-serif;
`;

const RequiredIndicator = styled.span`
    color: red;
    margin-left: 5px;
`;

const StyledCheckbox: React.FC<CheckboxProps> = ({label, checked, onChange, required }) => {
    const handleChange = () => {
        onChange(!checked);
    };

return (
    <CheckboxWrapper>
    <CheckboxInput type="checkbox" checked={checked} onChange={handleChange} />
    <CheckboxLabel>
        {label}
        {required && <RequiredIndicator>*</RequiredIndicator>}
    </CheckboxLabel>
    </CheckboxWrapper>
);
};

export default StyledCheckbox;