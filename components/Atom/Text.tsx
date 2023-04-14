import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], style:['italic','normal'] })

interface TextProps {
    children: ReactNode;
    size?: string;
    color?: string;
    textAlign?: string;
    italic?: boolean;
}



const TextC = styled.p`
    color: var(${props => props.theme.c ? props.theme.c : '--TEXT_STANDARD'});
    font-size: ${props => props.theme.s == 'M' ? '16' : props.theme.s == 'S' ? '14.22' : props.theme.s == 'Cite' ? '27' : '18'}px;
    line-height: ${props => props.theme.s == 'M' ? '21.82' : props.theme.s == 'S' ? '19.4' : props.theme.s == 'Cite' ? '38' : '28.55'}px;
    text-align: ${props => props.theme.t};
    font-weight: ${props => props.theme.s == 'Cite' ? 300 : 400};
    font-style: ${props => props.theme.i ? 'italic' : 'normal'};
    width:100%;
    a{
        text-decoration:underline;
    }
    strong {
        font-weight: 900;
    }
`;

const Text = ({ children, size, color, textAlign, italic }: TextProps) => {
    return (
        <TextC className={nunito.className} theme={{ s:size, c:color, t:textAlign, i:italic }}>
            {children}
        </TextC>
        );
};

export default Text;
