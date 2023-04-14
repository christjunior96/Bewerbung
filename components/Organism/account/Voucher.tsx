import styled from "styled-components";
import React, { ReactNode, use, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import AccountHeadline from "components/Atom/AccountHeadline";
import StyledTextInput from "components/Molecule/StyledTextInput";
import Button from "components/Molecule/Button";
import Space from "components/Atom/Space";
import Column from "components/Molecule/Column";
import ResponsiveImage from "components/Atom/ResponsiveImage";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface VoucherProps {
    codes: string[][];
    fav?: string;
}



const RowWrapper = styled.div`
    padding: 1.5em;
    border: 2px solid #F3F5FA;
    border-radius: 1em;
    margin-bottom: 2em;
`;

const TableWrapper = styled.div`
    border: 2px solid #F3F5FA;
    border-radius: 1em;
    overflow-x: auto;
`;

const TopText = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #24243A;
`;

const Line = styled.div`
    background: #E8E8E8;
    height: 2px;
    width: 100%;
    margin: 1.5em 0em;
`;

const Text = styled.div`
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #696969;
`;


const Half = styled.div`

`;

const Th = styled.th`
    font-weight: 400;
    font-size: 14px;
    padding: 6px 24px;
    color: #24243A
    padding: 9px 24px;
    height: 60px;
    background: white;
`;
const Table = styled.table`
    margin: 0 0 15px;
    text-align: left;
    width: 100%;
    font-size: 15px;
    border-collapse: collapse;
    border-spacing: 0;
    white-space: nowrap;
    margin: 0.5em 0em;
    tr:nth-child(odd) {
        background: #F3F5FA;
    }
`;

const Tr = styled.tr`
    color: ${props => props.theme.sel ? 'var(--FELT_GREEN)' :  '#24243a'};
    :hover{
        color: var(--FELT_GREEN);
    }
`;

const Td = styled.td`
    font-weight: 400;
    border-top: 1px solid #eee;
    padding: 6px 24px;
    font-size: 14px;
    height: 60px;
`;

const Star = styled.div`
    display: ${props => props.theme.sel ? 'block' :  'none'};
`;

const Voucher = ({ codes, fav }: VoucherProps) => {

    const [code, setCode] = useState(fav);
    const [date, setDate] = useState("07.06.2020");
    const [selected, setSelected] = useState(fav);

    return (
        <Column>
            <RowWrapper>
                <Row sizeEvenly rowSpace={10} breakMobilePx={640} distanceMobile={15}>
                    <Half>
                        <AccountHeadline text="Gutscheincodes"/>
                        <StyledTextInput placeholder="Gutschein eingeben" onChange={setCode}/>
                        <Space height={5}/>
                        <Button text="überprüfen" small/>
                    </Half>
                    <Half>
                        <AccountHeadline text="Vorgemerkter Code"/>
                        <Row sizeEvenly>
                            <TopText>{code}</TopText>
                            <TopText>{date}</TopText>
                        </Row>
                        <Line/>
                        <Text>Der Gutscheincode ist im Investitionsprozess vorgemerkt. Jetzt Investitionsmöglichkeit auswählen</Text>
                        <Space height={5}/>
                        <Button text="Zu den Investitionsprojekten" small/>
                    </Half>
                </Row>
            </RowWrapper>
            <TableWrapper>
                <Table>
                    <thead>
                        <tr>
                            <Th>Codes</Th>
                            <Th>Ablaufdatum</Th>
                            <Th>Konditionen</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {codes.map((code, index) => {
                            return (
                            <Tr  key={`Voucher-${index}`} onClick={() => {
                                setSelected(code[0])
                                setCode(code[0])
                                setDate(code[1])
                                }} theme={{sel: selected==code[0]}}>
                                <Td>
                                    {code[0]}
                                </Td>
                                <Td>
                                    {code[1]}
                                </Td>
                                <Td>
                                    <Row rowSpace={3}>
                                        <ResponsiveImage alt="Info Icon" width="20px" src="/icons/account/information.svg"/>
                                        <Star theme={{sel: selected==code[0]}}><ResponsiveImage alt="Info Icon" width="20px" src="/icons/account/fav.svg"/></Star>
                                    </Row>
                                </Td>
                            </Tr>
                            );
                        })}
                    </tbody>
                </Table>
            </TableWrapper>
        </Column>
       
        );
};

export default Voucher;
