import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import Button from "components/Molecule/Button";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Space from "components/Atom/Space";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface InterestPlanProps {
    investDate: Date;
    projectName: string;
    investSum: number;
    endDate: Date;
    interest: number;
}

const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const TableButtonWrapper = styled.div`
    width:100%;
`;

const BoxWrapper = styled.div`
    width: 28%;
    min-width: 230px;
    background-color: #f9f9f9;
    margin-left: 2em;
    padding: 2em;
    max-height: 210px;
    @media only screen and (max-width: 1100px){
        width: 100%;
        margin-left: 0px;
        margin-top: 2em;
        margin-bottom: 4em;
    }
    @media only screen and (max-width:1220px){
        width: 100%;
        margin-left: 0px;
        margin-bottom: 2em;
    }

`;

const BoxtextWrapper = styled.div`
    @media only screen and (max-width:1220px){
        display: flex;
        justify-content: space-between;
    }
    @media only screen and (max-width:440px){
        flex-direction: column;
    }
`;

const Text = styled.h3`
    font-size: 16px;
    font-weight: 300;
`;

const BoxRow = styled.div`
    font-size: 14px;
    color: #666666;
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
`;

const BoxGreen = styled(BoxRow)`
    color: var(--FELT_GREEN);
`;

const TableBoxWrapper = styled.div`
    display: flex;
    @media only screen and (max-width:1220px){
        flex-direction: column-reverse;
    }
`;

const Th = styled.th`
    color: #555;
    font-weight: 700;
    padding: 9px 24px;
    text-align: left;
    background-color: white !important;
    border-bottom: 1px solid #d3d7e0;
    height: 30px;
`;

const ContentWrapper = styled.div`
    margin-bottom: 3em;
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

const FirstTd = styled.td`
    font-weight: 600;
    background-color: white !important;
    height: 60px;
    border-top: 1px solid #eee;
    padding: 6px 24px;
    font-weight: 600;
    background-color: white !important;
    height: 60px;
    color: #242833;
    font-size: 15px;
    border-bottom: 1px solid #d3d7e0;
    td:nth-child(odd) {
        background: #f9f9f9;
    }
`;

const Tr = styled.tr`
   display: ${props => props.theme.en ? 'table-row' : 'none'};
`;

const Td = styled.td`
    border-top: 1px solid #eee;
    padding: 6px 24px;
    height: 40px;
    color: #242833;
    font-size: 15px;
    font-weight: 300;
    border-bottom: 1px solid #d3d7e0;
    :nth-child(odd) {
        background: #f9f9f9;
    }
`;

const InterestPlan = ({ investDate, investSum, projectName, endDate, interest }: InterestPlanProps) => {

    
    const endFirstYear = new Date(investDate.getFullYear(),12,31);
    var diff = Math.abs(endFirstYear.getTime() - investDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    const actual = new Date();
    const reward = (investSum/100)*interest
    const [enabled, setEnabled] = useState(false);



    function toggleButton(){
        setEnabled(enabled ? false : true)
    }


    return (
        <>
            <ContentWrapper>
                <AccountHeadline text={projectName}/>
                <TableBoxWrapper>
                    <TableButtonWrapper>
                        <TableWrapper>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>Datum</Th>
                                        <Th>Zinsen</Th>
                                        <Th>Tilgung</Th>
                                        <Th>Auszahlung</Th>
                                        <Th>Investitionsbetrag/Rest</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <FirstTd>{investDate.getDate()}.{investDate.getMonth() < 10 ? '0' : ''}{investDate.getMonth()}.{investDate.getFullYear()}</FirstTd>
                                        <FirstTd></FirstTd>
                                        <FirstTd></FirstTd>
                                        <FirstTd></FirstTd>
                                        <FirstTd>{investSum} €</FirstTd>
                                    </tr>
                                    <Tr theme={{en:enabled}}>
                                        <Td>31.12.{investDate.getFullYear()}</Td>
                                        <Td>{reward} €</Td>
                                        <Td></Td>
                                        <Td></Td>
                                        <Td>{investSum} €</Td>
                                    </Tr>
                                    {range(investDate.getFullYear()+1,endDate.getFullYear()-1).map((index) => {
                                        return (
                                            <Tr  key={`InterestPlan-${index}`} theme={{en:enabled}}>
                                                <Td>31.12.{index}</Td>
                                                <Td>{reward} €</Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td>{investSum} €</Td>
                                            </Tr>
                                            );
                                    })}
                                    <Tr theme={{en:enabled}}>
                                        <Td>{endDate.getDate() < 10 ? '0' : ''}{endDate.getDate()}.{endDate.getMonth() < 10 ? '0' : ''}{endDate.getMonth()}.{endDate.getFullYear()}</Td>
                                        <Td>{reward} €</Td>
                                        <Td>{investSum} €</Td>
                                        <Td>{investSum+reward} €</Td>
                                        <Td>0,00 €</Td>
                                    </Tr>
                                    <tr>
                                        <FirstTd>Summe</FirstTd>
                                        <FirstTd>xxx</FirstTd>
                                        <FirstTd>{investSum} €</FirstTd>
                                        <FirstTd>xxx €</FirstTd>
                                        <FirstTd>-</FirstTd>
                                    </tr>
                                </tbody>
                            </Table>
                        </TableWrapper>
                        <Space height={5}/>
                        <Button onClick={toggleButton} text="Vorschau anzeigen"></Button>
                    </TableButtonWrapper>
                    <BoxWrapper>
                        <Text className={nunito.className}>Nächste Fälligkeit</Text>
                        <BoxtextWrapper>
                            <BoxRow>
                                <ResponsiveImage width="17px" alt="clock Icon" src="/icons/interestPlan/icon-time.svg"/>
                                <Space width={4}/>
                                <span>31.12.{actual.getFullYear()}</span>
                            </BoxRow>
                            <BoxGreen>
                                <ResponsiveImage width="17px" alt="clock Icon" src="/icons/interestPlan/icon-money.svg"/>
                                <Space width={4}/>
                                + 2222 €
                            </BoxGreen>
                            <BoxRow>
                                <ResponsiveImage width="17px" alt="clock Icon" src="/icons/interestPlan/icon-money-transfer.svg"/>
                                <Space width={4}/>
                                Fehlt
                            </BoxRow>
                        </BoxtextWrapper>
                    </BoxWrapper>
                </TableBoxWrapper>
            </ContentWrapper>
        </>
        );
};

export default InterestPlan;
