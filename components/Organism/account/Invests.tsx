import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import ProgressBar from "@ramonak/react-progress-bar";
import Space from "components/Atom/Space";
import Row from "components/Molecule/Row";
import VerticalProgressbar from "components/Molecule/VerticalProgressbar";
import Column from "components/Molecule/Column";
import Button from "components/Molecule/Button";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })


function insertDecimal(num:number) {
    return num < 1000 ? num : (num / 1000).toFixed(3);
 }

 const Headline = styled.h2`
        color: #333333;
        font-size: 21px; 
        width: 100%;
        font-weight: 400;
        padding-bottom: 5px;
    `;

const HeaderWrapper = styled.div`
    width:100%;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
    @media only screen and (max-width: 440px){
        flex-direction: column;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const SelectButton = styled.button`
    border-radius: 0.5em 0.5em 0em 0em;
    padding: 4px 8px;
    background: #e4e4e4;
    color: black;
    width:200px;
    border: 0px;
    max-height: 20px;
    max-width: 140px;
    &#${props => props.theme.se}{
        color:  var(--FELT_GREEN);
        background: var(--SOFT_PEALS);
    }
`;

const CustomSelect = styled.select`
    width: 100%;
    background-color: white;
    border: 0px;
    box-shadow: 0px 0px 12px 0px rgb(0 0 0 / 25%);
    padding: 10px 10px;
`;

const H4 = styled.h4`
    margin-top: 2em;
    margin-bottom: 1em;
    margin-left: 0.5em;
    font-weight: 400;
    color: #333;
    font-size:18px;
`;

const Table = styled.table`
    border: 1px solid #eee;
    margin: 0 0 15px;
    text-align: left;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
`;

const Td = styled.td`
    padding: 6px 10px;
    border-top: 1px solid #eee;
    font-weight: 300;
    color: #666666;
`;

const TdNoBreak = styled(Td)`
    white-space: nowrap;
`;

const Invest = styled.div`
    background-color: var(--SOFT_PEALS) !important;
    color: var( --FELT_GREEN) !important;
    width: 100%;
    text-align: center;
    border-radius: 8px;
    margin: 10px 0;
    font-size: 14px;
    &.eins{
        color: var( --FELT_GREEN)!important;
        background-color: var(--SOFT_PEALS) !important;
    }
    &.zwei{
        color: var( --FELT_GREEN) !important;
    }
    &.drei{
        color: var(--BATS_BLOOD_SOUP) !important;
    }
`;

const Side = styled.div`
    width: 100%;
`;


const ContentWrapper = styled.div`
    display: ${props => props.theme.se ? 'unset' : 'none'};
`;


const ActiveCapital = ({  }) => {

    const [invest, setInvest] = useState("item1");
    const invests = [["23.01.2023: Windpark Bad Nauheim 5.000 € investiert",'eins'],["24.01.2023: Windpark Bad Nauheim 5.000 € investiert",'zwei'],["25.01.2023: Windpark Bad Nauheim 5.000 € investiert",'drei'],["26.01.2023: Windpark Bad Nauheim 5.000 € investiert",'eins'],["27.01.2023: Windpark Bad Nauheim 5.000 € investiert",'drei'],["28.01.2023: Windpark Bad Nauheim 5.000 € investiert",'eins'],["29.01.2023: Windpark Bad Nauheim 5.000 € investiert",'eins']];


    return (
        <>
            <HeaderWrapper className={nunito.className}>
                <Headline>Investitionen</Headline>
                <ButtonWrapper>
                    <SelectButton theme={{se:invest}} onClick={() => setInvest('item1')} id="item1">Aktive Investitionen</SelectButton>
                    <Space width={1}/>
                    <SelectButton theme={{se:invest}} onClick={() => setInvest('item2')} id="item2">Alle Investitionen</SelectButton>
                </ButtonWrapper>
            </HeaderWrapper>
            <ContentWrapper theme={{se:invest == 'item1' ? 'item1' : ''}}>
                <Row sizeEvenly rowSpace={20} breakMobilePx={980} distanceMobile={5}>
                    <Row sizeEvenly>
                        <VerticalProgressbar month={1} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={2} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={3} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={4} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={5} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={6} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={7} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={8} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={9} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={10} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={11} amount={150} maxAmount={200}/>
                        <Space width={3}/>
                        <VerticalProgressbar month={12} amount={150} maxAmount={200}/>
                    </Row>
                    <Column key={"fuw49"}>
                        <CustomSelect>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </CustomSelect>
                        <H4>Letzte Investitionen</H4>
                        <Table>
                        <tbody>
                            <tr>
                                <TdNoBreak>23.01.2023</TdNoBreak><Td>Windpark Bad Nauheim</Td> <TdNoBreak>5.000 €</TdNoBreak>
                            </tr>
                            <tr>
                                <TdNoBreak>23.01.2023</TdNoBreak><Td>Windpark Bad Nauheim</Td> <TdNoBreak>5.000 €</TdNoBreak>
                            </tr>
                        </tbody>
                        </Table>
                        <Button text={"Zu den Investitionen"} small/>
                    </Column>
                </Row>
            </ContentWrapper>
            <ContentWrapper theme={{se:invest == 'item2' ? 'item2' : ''}}>
                <Row sizeEvenly breakMobilePx={1150} rowSpace={10}>
                    <Side>
                    {invests.map((child, index) =>{
                        return (
                            index < invests.length/2 ? 
                            <Invest  key={`Invest-${index}`} className={child[1].toString()}>
                                {child[0]}
                            </Invest> : ""
                        );
                    })}
                    </Side>
                    <Side>
                    {invests.map((child, index) =>{
                        return (
                            index >= invests.length/2 ? 
                            <Invest key={`Invest-${index}`} className={child[1].toString()}>
                                {child[0]}
                            </Invest> : ""
                        );
                    })}
                    </Side>
                </Row>
            </ContentWrapper>
        </>
        );
};

export default ActiveCapital;
