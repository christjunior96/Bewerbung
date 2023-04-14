import styled from "styled-components";
import React, { ChangeEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface TextInputProps {
    placeholder: string;
    onChange: (value: string) => void;
    description?: string;
    value?: string;
    error?: boolean;
    required?: boolean;
}

const Input = styled.textarea`
    padding: 10px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.er ? "red" : "#c6c6c6"};
    outline-color: var(--FELT_GREEN);
    margin-top:8px;
`;

const DescBox = styled.div`
    font-weight: 400;
    font-size: 16.5px;
    line-height: 140%;
    color: #696969;
`;

const Req = styled.span`
    color: red;
    display: ${props => props.theme.req ? 'unset' : 'none'};
`;


const StyledTextAreaInput: React.FC<TextInputProps> = ({ value, onChange, placeholder,description, error, required }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        onChange(newValue);
      };

    return (
        <>
            <DescBox className={nunito.className}>{description} <Req theme={{req:required}}>*</Req></DescBox>
            <Input placeholder={placeholder} theme={{er:error}} onChange={handleInputChange} value={value}/>
        </>
        );
};

export default StyledTextAreaInput;
