import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import Section from "components/Molecule/Section";
import Headline from "components/Atom/Headline";
import Text from "components/Atom/Text";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

const Number = styled.div`
    width: 80px;
    height: 80px;
    background: var(--VENICE_MINT);
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: var(--GOBLIN);
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const NumberWrapper= styled.div`
    position: absolute;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--WHITE);
    border-radius: 999px;
    top: -140px;
    @media only screen and (max-width: 800px) {
        display:none
    }
`;

const NumberMobile = styled.div`
    width: 40px;
    height: 40px;
    background: var(--VENICE_MINT);
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: var(--GOBLIN);
    border-radius: 999px;
    justify-content: center;
    align-items: center;
    display: none;
    @media only screen and (max-width: 800px) {
        display: flex;
    }
`;

const MText = styled.div`
    display: none;
    @media only screen and (max-width: 800px) {
        display: block;
    }
`;

const DText = styled.div`
    display: block;
    @media only screen and (max-width: 800px) {
        display: none;
    }
`;


const ProjectFinanceAdvantages = () => {


    return (
        <>
            <Section backgroundColor='--MALDIVES' sectionSpace={20}>
            <Column>
                <Row sizeEvenly rowSpace={15} breakMobilePx={800}>
                    <Column columnSpace={5}>
                        <NumberWrapper><Number>1</Number></NumberWrapper>
                        <Row alignItems="center">
                            <NumberMobile>1</NumberMobile>
                            <MText><Space width={4}/></MText>
                            <Column>
                            <Headline textAlign='left' text='Zusätzliches Kapital für Ihre Projekte' h={3} color='--SHINY_SHAMROCK' nunito small/>   
                            <MText>
                                <Text>
                                Mezzaninkapital kann für die Entwicklung und den Bau nachhaltiger Projekte verwendet werden. Das entlastet Ihre  
                                </Text>
                            </MText>
                            </Column>
                        </Row>
                        <DText>
                            <Text>
                            Mezzaninkapital kann für die Entwicklung und den Bau nachhaltiger Projekte verwendet werden. Das entlastet Ihre 
                            </Text>
                        </DText>
                    </Column>
                    <Column columnSpace={5} >
                        <NumberWrapper><Number>2</Number></NumberWrapper>
                        <Row alignItems="center">
                            <NumberMobile>2</NumberMobile>
                            <MText><Space width={4}/></MText>
                            <Column>
                            <Headline textAlign='left' text='Refinanzierung Ihrer Bestandsprojekte' h={3} color='--SHINY_SHAMROCK' nunito small/>   
                            <MText>
                                <Text>
                                    Gebundene Eigenmittel in Bestandsprojekten können durch Mezzaninkapital refinanziert werden. So machen 
                                </Text>
                            </MText>
                            </Column>
                        </Row>
                        <DText>
                        <Text>
                        Gebundene Eigenmittel in Bestandsprojekten können durch Mezzaninkapital refinanziert werden. So machen 
                        </Text>
                        </DText>
                    </Column>
                    <Column columnSpace={5}>
                        <NumberWrapper><Number>3</Number></NumberWrapper>
                        <Row alignItems="center">
                            <NumberMobile>3</NumberMobile>
                            <MText><Space width={4}/></MText>
                            <Column>
                            <Headline textAlign='left' text='Steigerung der Akzeptanz' h={3} color='--SHINY_SHAMROCK' nunito small/>   
                            <MText>
                                <Text>
                                Durch die Beteiligung von Privatanlegerinnen und Privatanlegern werden Sie der Forderung einer bürgernahen 
                                </Text>
                            </MText>
                            </Column>
                        </Row>
                        <DText><Text>
                        Durch die Beteiligung von Privatanlegerinnen und Privatanlegern werden Sie der Forderung einer bürgernahen 
                        </Text></DText>
                    </Column>
                </Row>
            </Column>
        </Section>
        </>
            
        );
};

export default ProjectFinanceAdvantages;
