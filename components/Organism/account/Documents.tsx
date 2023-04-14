import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import Button from "components/Molecule/Button";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Space from "components/Atom/Space";
import Link from "next/link";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface DocumentsProps {
    name: string;
    date: Date;
    value: number;
    image: string;
    interest: number;
    fundingThreshold: number;
    volume: number;
    projectURL: string;
    documents: string[][];
}

const ComponentWrapper = styled.div`
    margin-bottom: 3em;
`;

const HeaderWrapper = styled.div`
    height: 130px;
    background: var(--MALDIVES_INTENSE);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: 960px) {
        display: block;
        height: unset;
    }
`;

const ImageTextWrapper = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 960px) {
        justify-content: center;
        margin-bottom: 1em;
    }
    @media only screen and (max-width: 480px) {
        flex-direction: column;
    }
`;

const TopText = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
    margin-bottom: 0.5em;
`;

const BottomText = styled.div`
    display: flex;
    align-items: center;
`;

const BottomTextValue = styled.div`
    padding: 0em 0.5em;
`;

const Stroke = styled.div`
    height: 20px;
    width: 2px;
    background: black;
    border-radius: 1em;
    margin: 0em 1em 0em 0.5em;
`;

const BottomStroke = styled.div`
    height: auto;
    width: 2px;
    background: #d2d2d2;
    border-radius: 1em;
    margin: 1.5em 0em;
    @media only screen and (max-width: 1150px) {
        height: 2px;
        width: 100%;
        padding: 0em 0em;
    }
`;

const TextWrapper = styled.div`
    margin-left: 2em;
`;

const BottomBox = styled.div`
    box-shadow: 0px 10px 23px rgba(0, 0, 0, 0.062121);
    width: 100%;
    display: ${props => props.theme.en ? "flex" : "none"};
    @media only screen and (max-width: 1150px) {
        flex-direction: column;
        align-items: center;
        padding: 1em 3em 2.5em;
    }
    @media only screen and (max-width: 430px) {
        padding: 1em 1em 2.5em;
    }
`;

const LeftSide = styled.div`
    min-width: 33%;
    padding: 1em 1em 2em 2em;
    margin-right: 2em;
    @media only screen and (max-width: 1150px) {
        max-width: 350px;
        min-width: 300px;
        margin: 0px;
        padding: 1em 0em;
    }
    @media only screen and (max-width: 500px) {
        padding: 1em 1em;
    }
`;

const LeftSideRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    color: #696969;
`;

const RightSide = styled.div`
    width: 100%;
    padding: 1em 1em 2em 2em;
    @media only screen and (max-width: 1150px) {
        padding: 0em;
    }
`;

const LeftSideHeaderRow = styled(LeftSideRow)`
    color:#24243A;
    font-weight: 300;
    font-size: 16px;
    line-height: 48px;
`;

const StyledLink = styled(Link)`
    text-decoration: underline;
`;

const RightSideHeader = styled.div`
    font-weight: 300;
    font-size: 16px;
    line-height: 48px;
`;

const DokumentBox = styled(Link)`
    border: 1px solid #D2E5D8;  
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    justify-content: space-between;
    color: #24243A;
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 1em;
`;

const TextIcon = styled.div`
    display: flex;
    align-items: center;
`;

const Documents = ({ name, date, value, image, interest, fundingThreshold, volume, projectURL, documents }: DocumentsProps) => {

    const [enabled, setEnabled] = useState(false);

    return (
        <ComponentWrapper>
            <HeaderWrapper>
                <ImageTextWrapper>
                    <ResponsiveImage width="100px" src={image} alt={""}/>
                    <Space height={5}/>
                    <TextWrapper>
                        <TopText>{name}</TopText>
                        <BottomText>
                            <ResponsiveImage width="20px" src="/icons/interestPlan/icon-time.svg" alt="Time Icon"></ResponsiveImage>
                            <BottomTextValue>{date.getDate()}.{date.getMonth() < 10 ? '0' : ''}{date.getMonth()}.{date.getFullYear()}</BottomTextValue>
                            <Stroke/>
                            <ResponsiveImage width="23px" src="/icons/interestPlan/banknotes.svg" alt="Time Icon"></ResponsiveImage>
                            <BottomTextValue>{value} €</BottomTextValue>
                        </BottomText>
                    </TextWrapper>
                </ImageTextWrapper>
                <Button onClick={()=> {setEnabled(enabled ? false : true)}} text={enabled ? "weniger Details" : "Dokumente & Details"} small primaryOutline/>
            </HeaderWrapper>
            <BottomBox theme={{en:enabled}}>
                <LeftSide>
                    <LeftSideHeaderRow>
                        <p>Konditionen</p>
                        <StyledLink href={projectURL}>zum Projekt</StyledLink>
                    </LeftSideHeaderRow>
                    <LeftSideRow>
                        <p>Zins</p>
                        <p>{interest} %</p>
                    </LeftSideRow>
                    <LeftSideRow>
                        <p>Tilgung</p>
                        <p>endfällig</p>
                    </LeftSideRow>
                    <LeftSideRow>
                        <p>Fundingschwelle</p>
                        <p>{fundingThreshold} €</p>
                    </LeftSideRow>
                    <LeftSideRow>
                        <p>Gesamtvolumen</p>
                        <p>{volume} €</p>
                    </LeftSideRow>
                </LeftSide>
                <BottomStroke/>
                <RightSide>
                    <RightSideHeader>Dokumente</RightSideHeader>
                    {documents.map((item, index) => {
                        return(
                            <DokumentBox key={`DocumentBox-${index}`} href={item[1]}>
                                <TextIcon>
                                    <ResponsiveImage width="25px" alt="Documents Icon" src="/icons/interestPlan/documents.svg"/>
                                    <Space width={7}/>
                                    {item[0]}
                                </TextIcon>
                                <ResponsiveImage width="15px" alt="Documents Icon" src="/icons/interestPlan/download-file.svg"/>
                            </DokumentBox>      
                        )
                    })}
                </RightSide>
            </BottomBox>
            </ComponentWrapper>
        );
};

export default Documents;
