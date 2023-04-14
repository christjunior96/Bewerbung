import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Text from "components/Atom/Text";
import Section from "components/Molecule/Section";
import Space from "components/Atom/Space";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface CarrierSticky {
    name: string;
    image: string;
    title: string;
  }

  const Wrapper = styled.div`
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #ffffff;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        @media only screen and (max-width: 750px) {
            display: none;
        }
  `;

  const Left = styled.div`
        display:flex;
        flex-direction: column;
        > a{
            text-decoration:underline;
            margin-bottom: 5px;
            font-weight: 200;
        }
  `;

  const TopText = styled.div`
        font-style:italic;
        font-weight: 800;
        font-size: 26px;
        margin-bottom: 12px;
  `;

  const GreenBox = styled.div`
        background: #D2E5D8;
        border-radius: 25px;
        position: relative;
        padding: 1em;
        margin-right:3em;
  `;

  const WorkerImage = styled.div`
        position: absolute;
        width: 80px;
        height: 80px;
        max-height:80px;
        max-width:80px;
        border-radius: 25px;
        top: -50px;
        right: -35px;
  `;


const CarrierSticky = ({ name, image, title}: CarrierSticky) => {


    return (
        <>
            <Space height={42} disableMobile={750}/>
            <Wrapper>
                <Section sectionSpace={5}>
                    <Row justifyContent="space-between" alignItems="flex-end">
                        <Row rowSpace={10} >
                            <ResponsiveImage alt="Arrow Down" width="60px" src="/icons/public/Down_Arrow.svg" />
                            <Left className={nunito.className}>
                                <TopText>Scrolle weiter nach unten</TopText>
                                <Link href="#collegues">...und erfahre mehr über deine künftigen Arbeitskollegen</Link>
                                <Link href="#offers">...um zu den offenen Stellen zu gelangen</Link>
                                <Link href="#pictures">...und durchstöbere Schnappschüsse der Kollegen</Link>
                            </Left>
                        </Row>
                        <GreenBox>
                            <Text color="--GOBLIN">{name}</Text>
                            <Text color="--GOBLIN" size="M">{title}</Text>
                            <WorkerImage><ResponsiveImage objectFit="cover" alt="Mitarbeiterfoto" borderRadius="25px" width="80px" height="80px" src={image}/></WorkerImage>
                        </GreenBox>
                    </Row>
                </Section>
            </Wrapper>
        </>
        
        );
};

export default CarrierSticky;
