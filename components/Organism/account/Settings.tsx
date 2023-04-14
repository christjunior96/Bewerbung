import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import AccountHeadline from "components/Atom/AccountHeadline";
import StyledTextInput from "components/Molecule/StyledTextInput";
import Button from "components/Molecule/Button";
import Space from "components/Atom/Space";
import Column from "components/Molecule/Column";
import ResponsiveImage from "components/Atom/ResponsiveImage";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })



const RowWrapper = styled.div`
    padding: 1.5em;
    border: 2px solid #F3F5FA;
    border-radius: 1em;
    margin-bottom: 2em;
`;

const Half = styled.div`

`;

const Text = styled.div`
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #696969;
`;


const Settings = () => {

    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [sf, setSf] = useState("");
    const [aw, setAw] = useState("");

    return (
        <>
            <Column>
                <RowWrapper>
                <AccountHeadline text="Passwort ändern"/>
                    <Row sizeEvenly rowSpace={10} breakMobilePx={580} distanceMobile={5}>
                        <Half>
                            <Text>Bitte hinterlegen Sie eine Sicherheitsfrage um sich bei persönlichem Kontakt oder telefonischer Beratung zu identifizieren.</Text>
                        </Half>
                        <Half>
                            <StyledTextInput placeholder="Neues Passwort vergeben" value={pw} onChange={setPw}/>
                            <StyledTextInput placeholder="Passwort erneut eingeben" value={pw2} onChange={setPw2}/>
                            <Space height={5}/>
                            <Button text="Daten aktualisieren"/>
                        </Half>
                    </Row>
                </RowWrapper>
                <RowWrapper>
                <AccountHeadline text="Sicherheitsfrage"/>
                    <Row sizeEvenly rowSpace={10}  breakMobilePx={580} distanceMobile={5}>
                        <Half>
                            <Text>Bitte hinterlegen Sie eine Sicherheitsfrage um sich bei persönlichem Kontakt oder telefonischer Beratung zu identifizieren.</Text>
                        </Half>
                        <Half>
                            <StyledTextInput placeholder="Der Geburtsname ihrer Mutter?" value={sf} onChange={setSf}/>
                            <StyledTextInput placeholder="Marta Musterfrau" value={aw} onChange={setAw}/>
                            <Space height={5}/>
                            <Button text="Daten aktualisieren"/>
                        </Half>
                    </Row>
                </RowWrapper>
            </Column>
        </>
        );
};

export default Settings;
