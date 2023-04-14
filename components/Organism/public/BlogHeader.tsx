import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import Section from "components/Molecule/Section";
import { Roboto_Slab } from '@next/font/google'
import Headline from "components/Atom/Headline";

const roboto = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })
const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

interface HeaderItems {
    headline: string;
    image: string;
    subline?: string;
    time: number;
    imageAlt: string;
    }


const HeaderImage = styled.div`
    width: 100%;
    height: 500px;
    background: url(${props => props.theme.i});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    filter: blur(8px);
    backdrop-filter: blur(28px);
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media only screen and (max-width: 700px) {
        height: 400px;
    }
    @media only screen and (max-width: 550px) {
        height: 250px;
    }
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 700px;
    padding: 0 10px;
    width: 100%;
`;

const HeaderWrapper = styled.div`
    margin-top: -400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 700px) {
        margin-top: -300px;
    }
    @media only screen and (max-width: 550px) {
        margin-top: -200px;
    }
`;

const TopBar = styled.div`
    width: 100%;
    max-width: 680px;
    border-bottom: 1px solid var(--WHITE);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 35px;
`;

const Time = styled.div`
    background: #F0F0F0;
    border-radius: 5px;
    font-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
    padding: 2px 12px;
`;

const Media = styled(Link)`
    font-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
    color: #FFFFFF;
`;

const ImageWrapper= styled.div`
    width: 100%;
    @media only screen and (max-width: 700px) {}
`;


const Subline = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    text-align: left;
    color: #000000;
    width: 100%;
`;

const Overflow = styled.div`
    overflow: hidden;
`;


const BlogHeader = ({ image, headline, subline, imageAlt, time }: HeaderItems) => {

    return (
        <>
            <Overflow>
            <HeaderImage theme={{i:image}}/>
            </Overflow>
            <HeaderWrapper>
            <HeaderContent>
                <TopBar>
                    <Time>{time} min</Time>
                    <Media href={'/'}>zur Mediathek</Media>
                </TopBar>
                <ImageWrapper>
                    <ResponsiveImage height='400px' objectFit='cover' sizes="600px" src={image} alt={imageAlt} width='100%'/>
                </ImageWrapper>
                <Space height={10}/>
                <Headline h={1} small text={headline} textAlign="left"/>
                {subline && <Subline>{subline}</Subline>}
            </HeaderContent>
            </HeaderWrapper>
        </>
        
        );
};

export default BlogHeader;
