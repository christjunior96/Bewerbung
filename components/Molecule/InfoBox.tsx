import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "./Row";
import Image from "next/image";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface InfoboxProps {
    children: ReactNode;
    icon?: boolean;
    yellow?: boolean;
    topText?: string;
}


const BoxWrapper = styled.div`
    background: ${props => props.theme.y ? "var(--PURE_EGG)" : "var(--SOFT_PEALS)"};
    border-radius: 2px;
    padding: 40px;
    width: 100%;
`;

const TopText = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 20px;
    color: ${props => props.theme.y ? "black" : "var(--GOBLIN)"};
    margin-bottom: 8px;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    > a{
        color: ${props => props.theme.y ? "black" : "var(--FELT_GREEN)"};
        text-decoration: underline;
    }
`;

const InfoBox = ({ children, icon, yellow, topText }: InfoboxProps) => {
    return (
        <BoxWrapper theme={{y:yellow}}>
            <Row alignItems="center" rowSpace={5} breakMobilePx={500} distanceMobile={5}>
                {icon && <Image src="/icons/public/info.svg" width={35} height={35} alt="Info Icon" />}
                <Div theme={{y: yellow}}>
                    {topText && <TopText theme={{y:yellow}}>{topText}</TopText>}
                    {children}
                </Div>  
            </Row>
        </BoxWrapper>
        );
};

export default InfoBox;
