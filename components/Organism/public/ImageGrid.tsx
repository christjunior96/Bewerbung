import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Image from "next/image";
import ResponsiveImage from "components/Atom/ResponsiveImage"


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


const TextBox = styled.div`
    position:relative;
    width:100%;
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;

const TopText = styled.div`
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    color: var(--WELLINGTON_BLACK);
    text-align: center;
`;

const BottomText = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: var(--WELLINGTON_BLACK);
`;

const Date = styled.div`
    position:absolute;
    z-index:-1;
    width:100%;
`;




const ImageGrid = () => {


    return (
        <>
            <Column>
                <Row sizeEvenly breakMobilePx={700}>
                    <ResponsiveImage  objectFit="cover" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis1.JPG"/>
                    <Column>
                        <Row sizeEvenly>
                            <ResponsiveImage  objectFit="cover"  height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis2.JPG"/>
                            <ResponsiveImage  objectFit="cover"  alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis3.JPG"/>
                        </Row>
                        <Row sizeEvenly alignItems="center">
                            <ResponsiveImage alt="Kenan beim bedrucken eines T-Shirts" width="100%" height="100%" src="/tobedeleted/louis4.JPG"/>
                            <TextBox className={nunito.className}>
                                <TopText>T-Shirt Herstellung</TopText>
                                <BottomText>ecozins in Marburger<br/> Druckerei</BottomText>
                                <Date><ResponsiveImage alt="Date Image" width="100%" src="/dates/032020.svg"/></Date>
                            </TextBox>
                        </Row>
                    </Column>
                </Row>
                <Row sizeEvenly breakMobilePx={700}>
                    <Column>
                        <Row sizeEvenly>
                            <ResponsiveImage objectFit="cover" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis2.JPG"/>
                            <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" width="100%" height="100%" src="/tobedeleted/louis3.JPG"/>
                        </Row>
                        <Row sizeEvenly alignItems="center">
                            <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" width="100%" height="100%" src="/tobedeleted/louis4.JPG"/>
                            <TextBox className={nunito.className}>
                                <TopText>IT-Fortbildung</TopText>
                                <BottomText>Thema Cybersecurity</BottomText>
                                <Date><ResponsiveImage alt="Date Image" width="100%" sizes="375px" src="/dates/122022.svg"/></Date>
                            </TextBox>
                        </Row>
                    </Column>
                    <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" height="100%" width="100%" src="/tobedeleted/louis1.JPG"/>
                </Row>
                <Row sizeEvenly breakMobilePx={700}>
                    <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" height="100%" width="100%" src="/tobedeleted/louis1.JPG"/>
                    <Column>
                        <Row sizeEvenly>
                            <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" height="100%"  width="100%" src="/tobedeleted/louis2.JPG"/>
                            <ResponsiveImage objectFit="cover" alt="Kenan beim bedrucken eines T-Shirts" height="100%"  width="100%" src="/tobedeleted/louis3.JPG"/>
                        </Row>
                        <Row sizeEvenly alignItems="center">
                            <ResponsiveImage objectFit="cover" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" sizes="750px" src="/tobedeleted/louis4.JPG"/>
                            <TextBox className={nunito.className}>
                                <TopText>Kletterwald</TopText>
                                <BottomText>ecozins in den Lüften<br/> bei Marburg</BottomText>
                                <Date><ResponsiveImage alt="Date Image" height="100%" width="100%" sizes="750px" src="/dates/082021.svg"/></Date>
                            </TextBox>
                        </Row>
                    </Column>
                </Row>
                <Row sizeEvenly breakMobilePx={700}>
                    <Column>
                        <Row sizeEvenly alignItems="center">
                            <TextBox className={nunito.className}>
                                <TopText>Weitere</TopText>
                                <BottomText>Schnappschüsse</BottomText>
                                <Date><ResponsiveImage alt="Date Image" height="100%" sizes="750px" width="100%" src="/dates/smile.svg"/></Date>
                            </TextBox>
                            <ResponsiveImage objectFit="cover" sizes="750px" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis3.JPG"/>
                        </Row>
                        <Row sizeEvenly alignItems="center">
                            <ResponsiveImage objectFit="cover" sizes="750px" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis4.JPG"/>
                            <ResponsiveImage objectFit="cover" sizes="750px" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis2.JPG"/>
                        </Row>
                    </Column>
                    <Column>
                        <Row sizeEvenly>
                            <ResponsiveImage objectFit="cover" sizes="750px" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis2.JPG"/>
                            <ResponsiveImage objectFit="cover" sizes="750px" height="100%" alt="Kenan beim bedrucken eines T-Shirts" width="100%" src="/tobedeleted/louis3.JPG"/>
                        </Row>
                        <Row sizeEvenly alignItems="center">
                            <ResponsiveImage alt="Kenan beim bedrucken eines T-Shirts" height="100%" sizes="750px" width="100%" src="/dates/ez.JPG"/>
                            <TextBox className={nunito.className}></TextBox>
                        </Row>
                    </Column>
                </Row>
            </Column>
        </>
        );
};

export default ImageGrid;
