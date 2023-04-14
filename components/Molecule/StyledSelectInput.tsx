import styled from "styled-components";
import React, { ChangeEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface SelectInputProps {
    options: string[];
    onChange: (value: string) => void;
    description: string;
    value?: string;
    error?: boolean;
    required?: boolean;
}

const Input = styled.select`
    padding: 10px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.er ? "red" : "#c6c6c6"};
    outline-color: var(--FELT_GREEN);
    margin-top:8px;
`;

const Option =styled.option`
    background: white;
    border-radius: 5px;
`;

const DescBox = styled.div`
    font-weight: 400;
    font-size: 16.5px;
    color: #696969;
    line-height: 140%;
`;

const Req = styled.span`
    color: red;
    display: ${props => props.theme.req ? 'unset' : 'none'};
`;


const StyledSelectInput: React.FC<SelectInputProps> = ({ value, onChange ,description, options, error, required }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        newValue == 'Jannuar' ? onChange("1") :  newValue == 'Februar' ? onChange("2") :  newValue == 'März' ? onChange("3") :  newValue == 'April' ? onChange("4") :  newValue == 'Mai' ? onChange("5") :  newValue == 'Juni' ? onChange("6") :  newValue == 'Juli' ? onChange("7") :  newValue == 'August' ? onChange("8") :  newValue == 'September' ? onChange("9") : newValue == 'Oktober' ? onChange("10") :  newValue == 'November' ? onChange("11") :  newValue == 'Dezember' ? onChange("12") : onChange(newValue);
      };

    return (
        <>
            <DescBox className={nunito.className}>{description} <Req theme={{req:required}}>*</Req></DescBox>
            <Input theme={{er:error}} onChange={handleSelectChange} value={value}>
            {options.map((option) => (
                <Option key={option} value={option}>
                {option}
                </Option>
            ))}
            </Input>
        </>
        );
};

export default StyledSelectInput;
