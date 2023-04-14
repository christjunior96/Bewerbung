import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface OfferItems {
    link: string;
    name: string;
  }
  
  interface GridListe {
    items: OfferItems[];
  }


  

const ImageWrapper = styled.div`
    width:35px;
    max-width:35px;
    max-height:35px;
    height:35px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BigImageWrapper = styled(ImageWrapper)`
    width: 68px;
    height:68px;
    max-width: 68px;
    max-height: 68px;
    background: white;
    border-radius: 999px;
`;

const ItemWrapper = styled(Link)`
    display: flex;
    justify-content: space-between;;
    align-items:center;
    margin-bottom: 2em;
    width: 100%;
    background: var(--MALDIVES);
    border-radius: 10px;
    border: 1px solid #68FFB0;
    padding: 15px 20px;
`;

const Text = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
`;

const BottomBox = styled.div`
    background: var(--SOFT_PEALS);
    padding: 1em 2em;
    border-radius: 10px;
`;

const TopText = styled.div`
    font-weight: 900;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
`;

const MiddleText = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
`;

const BottomText = styled(Link)`
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    color: var(--FELT_GREEN);
`;

const JobOffers = ({ items }: GridListe) => {


    return (
        <>
            {items.map((item,index) => {
                return(
                <ItemWrapper key={`JobOffers-${index}`} href={item.link} className={nunito.className}>
                    <Text>{item.name}</Text>
                    <Space width={3}/>
                    <ImageWrapper><ResponsiveImage alt="Attach Icon" src="/icons/public/attach-file.svg"/></ImageWrapper>
                </ItemWrapper>
                )
            })}
            <BottomBox>
                <Row alignItems="center" rowSpace={5} breakMobilePx={810} distanceMobile={5}>
                    <BigImageWrapper><ResponsiveImage alt="Send Icon" width="35px" height="35px" src="/icons/public/direct.svg"/></BigImageWrapper>
                    <Column>
                        <TopText className={nunito.className}>Nichts passendes gefunden?</TopText>
                        <MiddleText className={nunito.className}>Schick uns deine Initiativbewerbung mit Lebenslauf und Motivationsschreiben an</MiddleText>
                        <BottomText className={nunito.className} href="mailto:bewerbung@auditcapital.de?subject=Bewerbung&body=Vorname%20%3A%0D%0ANachname%20%3A%0D%0A%0D%0ABitte hängen Sie noch folgende Dokumente an: Lebenslauf,....">bewerbung@auditcapital.de</BottomText>
                    </Column>
                </Row>
            </BottomBox>
        </>
            
        );
};

export default JobOffers;
