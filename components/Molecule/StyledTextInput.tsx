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
    number?: boolean;
    min?: number;
    max?: number;
    password?: boolean;
}

const Input = styled.input`
    padding: 10px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.er ? "red" : "#c6c6c6"};
    outline-color: var(blue);
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


const StyledTextInput: React.FC<TextInputProps> = ({ value, onChange, password, placeholder,description, error, required, number, min, max }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (number && min && max) {
            if (parseInt(event.target.value) < min) {
                onChange(min.toString());
            }else if(parseInt(event.target.value) > max){
                onChange(max.toString());
            }else{
                const newValue = event.target.value;
                onChange(newValue);
            }
        }
        else{
            const newValue = event.target.value;
            onChange(newValue);
        }
      };

    return (
        <>
            <DescBox className={nunito.className}>{description} <Req theme={{req:required}}>*</Req></DescBox>
            <Input type={number ? 'number' : password ? 'password' : 'text'} placeholder={placeholder} min={min} max={max} theme={{er:error}} onChange={handleInputChange} value={value}/>
        </>
        );
};

export default StyledTextInput;
