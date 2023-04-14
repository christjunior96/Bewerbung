import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface BarProps {
    maxAmount: number;
    amount: number;
    month: number;
}

const BarBG = styled.div`
    background: #edf8f1;
    vertical-align: bottom;
    display: table-cell;
    height: 240px;
    width: 15px;
    border-radius: 1em 1em 0px 0px;
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
`;

const BarCol = styled.div`
    background: #6bc690;
    z-index: 20;
    border-radius: 1em 1em 0px 0px;
    width: 100%;
    height: ${props => props.theme.h}px;
`;

const BarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#666666;
`;





const Progressbar = ({ maxAmount, amount, month }: BarProps) => {

    const height = amount/maxAmount * 240;

    return (
        <BarWrapper className={nunito.className}>
            <BarBG>
                <BarCol theme={{h:height}}></BarCol>
            </BarBG>
            {month}
        </BarWrapper>
        
        );
};

export default Progressbar;
