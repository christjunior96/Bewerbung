import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'],style:'normal', subsets: ['latin'], })

interface HeadlineProps {
    text:string;
    underline?: boolean;
}


const Headline = styled.h2`
        color: #333333;
        font-size: ${props => props.theme.u ? '21px' : '22px'};
        border-bottom: ${props => props.theme.u ? '1px solid #e4e4e4' : 'unset'};
        width: 100%;
        font-weight: ${props => props.theme.u ? '400' : '200'};
        padding-bottom: ${props => props.theme.u ? '5px' : 'unset'};
        margin-bottom: 0.5em;
    `;

const AccountHeadline = ({ text, underline }: HeadlineProps) => {
    return (
        <Headline theme={{u:underline}} className={nunito.className}>
            {text}
        </Headline>
        );
};

export default AccountHeadline;
