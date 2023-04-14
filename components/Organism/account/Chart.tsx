import styled from "styled-components";
import React from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import Row from "components/Molecule/Row";
import dynamic from "next/dynamic";
import Text from "components/Atom/Text"
import Space from "components/Atom/Space";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

const DonutChart = dynamic(() => import('react-donut-chart'), {ssr:false})

function insertDecimal(num:number) {
    return num < 1000 ? num : (num / 1000).toFixed(3);
 }


const HeaderWrapper = styled.div`
    width:100%;
`;


const ContentWrapper = styled.div`
    display: "unset";
`;

const ChartWrapper = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Right = styled.div`
    width:100%;
`;

const TableWrapper = styled.div`
    padding: 20px;
    width: 100%;
    box-shadow: 0 0 1em rgb(0 0 0 / 25%);
    margin: 2em 0em 2em 0em;
    min-width: 300px;
    overflow-x: auto;
`;

const Select = styled.select`
    width: 100%;
    background-color: white;
    border: 0px;
    box-shadow: 0px 0px 12px 0px rgb(0 0 0 / 25%);
    padding: 10px 10px;
`;

const Block = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 0.3em;
    background-color: ${props => props.theme.color};
    margin: auto;
`;

const Table = styled.table`
    border: 1px solid #eee;
    margin: 0 0 15px;
    text-align: left;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    white-space: nowrap;
    &.project-table th:nth-child(odd) {
        background: #f9f9f9;
    }
`;

const Th = styled.th`
    color: #555;
    font-weight: 700;
    padding: 9px 24px;
    font-size: 14px;
    :nth-child(odd) {
        background: #f9f9f9;
    }
`;

const Td = styled.td`
    padding: 6px 10px;
    border-top: 1px solid #eee;
    color: #666666;
    font-size: 14px;
    :nth-child(odd) {
        background: #f9f9f9;
    }
`;

const LegendWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const LegendItem = styled.div`
    flex-direction: column;
    align-items: center;
`;

const Overflow = styled.div`
    overflow-x: auto;
`;

const CustomDonut = styled(DonutChart)`
    path.selected {
        opacity: 1 !important;
    }
`;



const Chart = ({  }) => {

    return (
        <>
            <HeaderWrapper className={nunito.className}>
                <AccountHeadline text="Zinsen" underline/>
            </HeaderWrapper>
            <ContentWrapper>
                <Row key={"fnsionfd"} sizeEvenly rowSpace={20} breakMobilePx={1140} distanceMobile={5}>
                    <ChartWrapper>
                    <CustomDonut
                        clickToggle={false}
                        width={360}
                        height={360}
                        selectedOffset={0.05}
                        innerRadius={0.5}
                        colors={['#5ea378','#ef8606','#FFE522']}
                        interactive={true}
                        legend={false}
                        strokeColor="transparent"
                        data={[
                            {
                            label: 'Louis',
                            value: 25,
                            },
                            {
                            label: 'Marcel',
                            value: 75,
                            },
                            {
                            label: 'Michael',
                            value: 75,
                            }
                        ]}
                        />
                    <Row sizeEvenly rowSpace={4}>
                        <LegendItem>
                            <Block  theme={{color:'#f3d221'}}/>
                            <Space height={2}/>
                            <Text textAlign="center">Status</Text>
                        </LegendItem>
                        <LegendItem>
                            <Block  theme={{color:'#ef8606'}}/>
                            <Space height={2}/>
                            <Text textAlign="center">Zahlung</Text>
                        </LegendItem>
                        <LegendItem>
                            <Block  theme={{color:'#5ea378'}}/>
                            <Space height={2}/>
                            <Text textAlign="center">Ausgezahlt</Text>
                        </LegendItem>
                    </Row>
                    </ChartWrapper>
                    <Right>
                    <TableWrapper>
                        <Select>
                            <option value="all">Alle Projekte</option>
                            <option value="Windpark Bad Nauheim">Windpark Bad Nauheim</option>
                        </Select>
                        <Overflow>
                        <Table>
                            <thead>
                                    <tr>
                                        <Th>Status</Th>
                                        <Th>Zinsahlung</Th>
                                        <Th>Gesamt</Th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <Td>
                                        <Block theme={{color:'#4ac367'}}/>
                                    </Td>
                                    <Td>0 €</Td>
                                    <Td>0 €</Td>
                                </tr>
                                <tr>
                                    <Td>
                                        <Block  theme={{color:'#ef8606'}}/>
                                    </Td>
                                    <Td>1986.30 €</Td>
                                    <Td>17876.7 €</Td>
                                </tr>
                                <tr>
                                    <Td>
                                        <Block  theme={{color:'#f3d221'}}/>
                                    </Td>
                                    <Td>1986.30 €</Td>
                                    <Td>17876.7 €</Td>
                                </tr>
                            </tbody>
                        </Table>
                        </Overflow>
                    </TableWrapper>
                   </Right>
                </Row>
            </ContentWrapper>
        </>
        );
};

export default Chart;
