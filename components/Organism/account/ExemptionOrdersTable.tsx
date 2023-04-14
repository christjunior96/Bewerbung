import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import Button from "components/Molecule/Button";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Space from "components/Atom/Space";
import Link from "next/link";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface ExemptionOrdersProps {
    
}

const TableWrapper = styled.div`
    width: 100%;
    border-radius: 1em;
    border: 2px solid #F3F5FA;
    text-align: left;
    display: block;
    white-space: nowrap;
    overflow-x: auto;
`;


const Th = styled.th`
    color: #555;
    font-weight: 700;
    padding: 9px 24px;
    font-size: 15px;
    height: 60px;
`;

const ContentWrapper = styled.div`
    margin-top: 3em;
`;

const Table = styled.table`
    border: 1px solid #eee;
    margin: 0 0 15px;
    text-align: left;
    width: 100%;
    font-size: 15px;
    border-collapse: collapse;
    border-spacing: 0;
    white-space: nowrap;
`;

const Td = styled.td`
    color: #24243a;
    font-weight: 400;
    border-top: 1px solid #eee;
    padding: 6px 24px;
    font-size: 14px;
    height: 60px;
`;

const LightTd = styled(Td)`
    font-weight: 300;
    font-size: 14px;
    color: #91919c;
`;

const StyledLink = styled(Link)`
    color: #5ea378;
    font-weight: 400;
    text-decoration: none;
`;



const ExemptionOrders = ({  }: ExemptionOrdersProps) => {


    return (
        <>
            <ContentWrapper>
                <TableWrapper>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Projekt</Th>
                                <Th>Investitionsdatum</Th>
                                <Th>Investitionsbetrag</Th>
                                <Th>Verzinsung</Th>
                                <Th>Laufzeit Vermögensangalge</Th>
                                <Th>Freistellungsauftrag erteilt bis</Th>
                                <Th>Freistellungsbetrag</Th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Td>Windpark Bad Nauheim</Td>
                                <Td>23. Jannuar 2023</Td>
                                <LightTd>5.000 €</LightTd>
                                <LightTd>5,0%</LightTd>
                                <LightTd>30. Dezember 2030</LightTd>
                                <LightTd></LightTd>
                                <LightTd><StyledLink href="/account/exemptionorders/1">Freistellungsauftrag erteilen</StyledLink></LightTd>
                            </tr>
                        </tbody>
                    </Table>
                </TableWrapper>
            </ContentWrapper>
        </>
        );
};

export default ExemptionOrders;
