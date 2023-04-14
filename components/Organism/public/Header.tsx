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

const roboto = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })
const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

interface HeaderItems {
    children: ReactNode;
    image: string;
    headline: string;
    subtext?: string;
    imageAlt: string;
    }



const HeaderWarpper = styled.div`
    background: var(--HEADER_BACKGROUND);
    min-height: 300px;
`;

const Dots =styled.div`
    background: url("/patterns/pattern.svg");
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    @media only screen and (max-width: 850px) {
        align-items: center;
    }
`;

const Text = styled.div`
    color: var(--WHITE);
    font-size: 18px;
    line-height: 24.55px;
    font-weight: 400;
    font-style: normal;
    width: 100%;
    @media only screen and (max-width: 850px) {
        text-align: center;
    }
`;

const Headline = styled.h1`
    color: var(--BUTTON_BORDER);
    font-weight: 900;
    font-size: 50px;
    line-height: 66px;
    font-family: "Roboto Slab";
`;

const Right = styled.div`
    position: relative;
    display:flex;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    margin-bottom:-80px;
    display: flex; 
    align-items: center;
    justify-content: center;
    mix-blend-mode: luminosity;
    filter: grayscale(100%);
`;

const Header = ({ children, image, headline, subtext, imageAlt }: HeaderItems) => {

    return (
        <>
            <HeaderWarpper>
                <Dots>
                    <Section backgroundColor="--TRANSPARENT">
                        <Space height={25}/>
                    <Row sizeEvenly alignItems="center"  breakMobilePx={850} distanceMobile={10}>
                        <Left>
                            <Headline className={roboto.className}>{headline}</Headline>
                            <Text className={nunito.className}>{subtext}</Text>
                            <Space height={4}/>
                            {children}
                        </Left>
                        <Right>
                            <ImageWrapper>
                                <ResponsiveImage alt={imageAlt} width="90%" maxWidth="420px" src={image} />
                            </ImageWrapper>
                        </Right>
                    </Row>
                    </Section>
                </Dots>
            </HeaderWarpper>
            <Space height={20}/>
        </>
        
        );
};

export default Header;
