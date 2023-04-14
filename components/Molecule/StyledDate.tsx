import styled from "styled-components";
import React, { ChangeEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "./Row";
import StyledSelectInput from "components/Molecule/StyledSelectInput";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface SelectInputProps {
    onChangeMonth: (value: string) => void;
    onChangeDay: (value: string) => void;
    onChangeYear: (value: string) => void;
    description: string;
    valueMonth?: string;
    valueDay?: string;
    valueYear?: string;
    required?: boolean;
}


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


const StyledDateInput: React.FC<SelectInputProps> = ({ valueDay, onChangeDay, valueMonth, onChangeMonth, valueYear, onChangeYear ,description, required }) => {
    

    return (
        <>
            <DescBox className={nunito.className}>{description} <Req theme={{req:required}}>*</Req></DescBox>
            <Row rowSpace={2} sizeEvenly>
                <StyledSelectInput description="" value={valueDay} onChange={onChangeDay} options={["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]}/>
                <StyledSelectInput description="" value={valueMonth} onChange={onChangeMonth} options={["Monat","Jannuar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]}/>
                <StyledSelectInput description="" value={valueYear} onChange={onChangeYear} options={["2025","2024","2023","2022"]}/>
            </Row>
        </>
        );
};

export default StyledDateInput;
