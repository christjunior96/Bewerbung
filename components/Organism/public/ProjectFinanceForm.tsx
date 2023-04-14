import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans, Roboto_Slab } from '@next/font/google'
import Row from "components/Molecule/Row";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Column from "components/Molecule/Column";
import Space from "components/Atom/Space";
import { Range } from 'react-range';
import StyledTextInput from "components/Molecule/StyledTextInput";




const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })
const roboto = Roboto_Slab({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['normal'] })




  const Text = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    font-family: 'Roboto Slab';
  `;

  const TextM = styled(Text)`
    display: ${props => props.theme.s ? 'block' : 'none'};
    text-align: center;
  `;

const NumberWrapper = styled.div`
    border: 1px solid #C9C9C9;
    width: 185px;
    height: 45px;
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    /* identical to box height */
    color: #2F513C;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomRow = styled.div`
    filter: ${props => props.theme.s ? 'blur(0px)' : 'blur(1.5px)'};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    display: flex;
    color: ${props => props.theme.s ? 'black' : '#D6D6D6'};;
`;

const CustomButton = styled.button`
    border: 1px solid #D6D6D6;
    width: 100%;
    background: transparent;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DescriptionText = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #000000;
`;

const MobileWrapper = styled.div`
    width: 100%;
    @media only screen and (min-width: 650px) {
        display: none;
    }
`;

const Conetent = styled.div`
    display: ${props => props.theme.s ? 'block' : 'none'};
`;

const DesktopWrapper = styled.div`  
    width: 100%;
    @media only screen and (max-width: 650px) {
        display: none;
    }
`;

const Progress = styled.div`
    width: 100%;
    height: 5px;
    background: ${props => props.theme.s ? '#5EA378;' : '#D2E5D8;'};;
`;


const ProjectFinanceForm = () => {

    const [selected, setSelected] = useState(0);
    const [range, setRange] = useState([6000000]);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');

    function forward () {
        if(selected<2){
            setSelected(selected + 1);
        }
    }

    function backward () {
        if(selected>=1){
            setSelected(selected - 1);
        }
    }

    function addThousandSeparators(num: number): string {
        return parseInt(num.toString()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      


    return (
        <>
        <DesktopWrapper>
        <Row rowSpace={20}  sizeEvenly >
                <Column columnSpace={10}>
                    <CustomRow theme={{s: selected == 0}}>
                        <Text className={roboto.className}>Wieviel Kapital benötigen Sie?</Text>
                        <Space width={5}/>
                        <ResponsiveImage src={selected == 0 ? "/icons/public/Triangle.svg" : "/icons/public/TriangleGray.svg"} width="26px" alt={"Dreieck"}/>
                    </CustomRow>
                    <CustomRow  theme={{s: selected == 1}}>
                        <Text className={roboto.className}>Mit wem können wir sprechen?</Text>
                        <Space width={5}/>
                        <ResponsiveImage src={selected == 1 ? "/icons/public/Triangle.svg" : "/icons/public/TriangleGray.svg"} width="26px" alt={"Dreieck"}/>
                    </CustomRow>
                    <CustomRow  theme={{s: selected == 2}}>
                        <Text className={roboto.className}>Telefontermin vereinbaren</Text>
                        <Space width={5}/>
                        <ResponsiveImage src={selected == 2 ? "/icons/public/Triangle.svg" : "/icons/public/TriangleGray.svg"} width="26px" alt={"Dreieck"}/>
                    </CustomRow>
                    <CustomRow  theme={{s: true}}>
                        <CustomButton onClick={backward}>zurück</CustomButton>
                        <CustomButton onClick={forward}>weiter</CustomButton>
                    </CustomRow>
                </Column>
                <Column>
                    <Conetent theme={{s: selected == 0}}>
                        <Column columnSpace={10}>
                        <NumberWrapper>
                        {addThousandSeparators(range[0]) + ' €'}
                    </NumberWrapper>
                    <Range
                        step={0.1}
                        min={50000}
                        max={6000000}
                        values={range}
                        onChange={(values) => setRange( values )}
                        renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '9px',
                            borderRadius: '4.5px',
                            width: '95%',
                            backgroundColor: '#DAF1E2',
                            transform: 'matrix(1, 0, 0, -1, 0, 0)',
                            }}
                        >
                            {children}
                        </div>
                        )}
                        renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '35px',
                            width: '35px',
                            borderRadius: '42px',
                            backgroundColor: '#2F513C'
                            }}
                        />
                        )}
                    />
                    <DescriptionText className={nunito.className}>
                    Schieben Sie den Regler nach rechts, um das benötigte Kapital angeben zu können. Alternativ können Sie den gewünschten Wert auch in das Zahlenfeld eingeben
                    </DescriptionText>
                        </Column>
                    </Conetent>
                    <Conetent theme={{s: selected == 1}}>
                        <Column columnSpace={5}>
                            <StyledTextInput placeholder="Max Mustermann" value={name} description="Name" onChange={(e) => setName(e)}/>
                            <StyledTextInput placeholder="Firma" value={company} description="Firma" onChange={(e) => setCompany(e)}/>
                            <StyledTextInput placeholder="01739409405" value={phone} description="Tel.:" onChange={(e) => setPhone(e)}/>
                        </Column>
                    </Conetent>
                </Column>
            </Row>       
        </DesktopWrapper>
        <MobileWrapper>
            <Column columnSpace={0} backgroundColor="#EDF8F1;">
                <Space height={5}/>
                <Column columnSpace={10} backgroundColor="#EDF8F1;">
                    <Row justifyContent="center">
                        <Space width={3}/>
                        <CustomRow theme={{s:true}}>
                                <TextM theme={{s: selected == 0}} className={roboto.className}>Wieviel Kapital benötigen Sie?</TextM>
                                <TextM theme={{s: selected == 1}} className={roboto.className}>Mit wem können wir sprechen?</TextM>
                                <TextM theme={{s: selected == 2}} className={roboto.className}>Telefontermin vereinbaren</TextM>
                        </CustomRow>
                        <Space width={3}/>
                    </Row>
                    <Row sizeEvenly rowSpace={5}>
                        <Space width={3}/>
                        <Progress theme={{s: selected == 0}}/>
                        <Progress theme={{s: selected == 1}}/>
                        <Progress theme={{s: selected == 2}}/>
                        <Space width={3}/>
                    </Row>
                        
                </Column>
                <Space height={5}/>
            </Column>
            <Space height={10}/>
            <Conetent theme={{s: selected == 0}}>
            <Column columnSpace={10} >
            <NumberWrapper>
                        {addThousandSeparators(range[0])+ ' €'}
                    </NumberWrapper>
                    <Range
                        step={0.1}
                        min={50000}
                        max={6000000}
                        values={range}
                        onChange={(values) => setRange( values )}
                        renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '9px',
                            borderRadius: '4.5px',
                            width: '95%',
                            backgroundColor: '#DAF1E2',
                            transform: 'matrix(1, 0, 0, -1, 0, 0)',
                            }}
                        >
                            {children}
                        </div>
                        )}
                        renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: '35px',
                            width: '35px',
                            borderRadius: '42px',
                            backgroundColor: '#2F513C'
                            }}
                        />
                        )}
                    />
                    <DescriptionText className={nunito.className}>
                    Schieben Sie den Regler nach rechts, um das benötigte Kapital angeben zu können. Alternativ können Sie den gewünschten Wert auch in das Zahlenfeld eingeben
                    </DescriptionText>
                </Column>
            </Conetent>
            <Conetent theme={{s: selected == 1}}>
                <Column columnSpace={5}>
                    <StyledTextInput placeholder="Max Mustermann" value={name} description="Name" onChange={(e) => setName(e)}/>
                    <StyledTextInput placeholder="Firma" value={company} description="Firma" onChange={(e) => setCompany(e)}/>
                    <StyledTextInput placeholder="01739409405" value={phone} description="Tel.:" onChange={(e) => setPhone(e)}/>
                </Column>
            </Conetent>
            
            <Column>
                <Space height={10}/>
                <CustomRow  theme={{s: true}}>
                    <CustomButton onClick={backward}>zurück</CustomButton>
                    <CustomButton onClick={forward}>weiter</CustomButton>
                </CustomRow>
            </Column>
        </MobileWrapper>
        </>
            
        );
};

export default ProjectFinanceForm;
