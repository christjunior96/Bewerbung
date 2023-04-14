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
import StyledSelectInput from "components/Molecule/StyledSelectInput";
import StyledCheckbox from "components/Molecule/StyledCheckbox";
import InfoBox from "components/Molecule/InfoBox";
import Link from "next/link";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })


interface ExemptionOrdersProps {
    itemID?: string;
}

const DescBox = styled.div`
    font-weight: 400;
    font-size: 16.5px;
    line-height: 140%;
    color: #696969;
`;

const YearBox = styled.div`
    font-size: 14px;
    color: #666666;
    display: flex;
    align-items: center;
    width: 200px;
`;


const ExemptionOrders = ({ itemID }: ExemptionOrdersProps) => {

    const [project, setProject] = useState("");
    const [order, setOrder] = useState("");
    const [assessment, setAssessment] = useState("");
    const [taxId, setTaxId] = useState("");
    const [value, setValue] = useState("");
    const [endYear, setEndYear] = useState("");
    const [check, setCheck] = useState(false);

 


    return (
        <>
            <StyledSelectInput description="Projekt" value={project} onChange={setProject} options={["Projekt 1","Project 2"]} required/>
            <Space height={10}/>
            <StyledSelectInput description="Auftragsart" onChange={setOrder} value={order} options={["Erstmaliger Antrag","Änderungsauftrag", "Löschung"]} required/>
            <Space height={10}/>
            <StyledSelectInput description="Sind Sie einzeln veranlagt oder gemeinsam veranlagt?" value={assessment} onChange={setAssessment} options={["Einzeln veranlagt","Gemeinsam veranlagt"]} required/>
            <Space height={10}/>
            <StyledTextInput value={taxId} onChange={setTaxId} description="Steuer ID" placeholder="" required/>
            <Space height={10}/>
            <StyledTextInput value={value} onChange={setValue} description="Betrag (entspricht in der Regel der Höhe Ihrer jährlichen Zinszahlungen, maximal 1000 € bzw. 2000 €)" placeholder="" required/>
            <Space height={10}/>
            <DescBox>Ende des Freistellungsauftrags (in der Regel Laufzeitende der Vermögensanlage)</DescBox>
            <YearBox>31.12. <StyledTextInput placeholder="" onChange={setEndYear} value={endYear}/></YearBox>
            <Space height={10}/>
            <StyledCheckbox onChange={setCheck} checked={check} required label="Ich versichere, dass mein Freistellungsauftrag zusammen mit Freistellungsaufträgen an andere Kreditinstitute, Bausparkassen, Emittenten, das BZSt usw. den für mich geltenden Höchstbetrag von insgesamt 1000 € nicht übersteigt. Ich versichere außerdem, dass ich mit allen für das Kalenderjahr erteilten Freistellungsaufträgen für keine höheren Kapitalerträge als insgesamt 1000 € im Kalenderjahr die Freistellung oder Erstattung von Kapitalertragsteuer in Anspruch nehme." />
            <Space height={10}/>
            <InfoBox icon>Bitte beachten Sie, dass der Freistellungsauftrag erst gültig ist, wenn Sie dieses Formular unterschrieben Per E-Mail <Link href="mailto:development@auditcapital.de">development@auditcapital.de</Link> oder per Post an AUDITcapital GmbH, Pilgrimstein 35a, 35037 Marburg gesendet haben.</InfoBox>
            <Space height={10}/>
            <Button text="Freistellungsauftrag generieren"/>
        </>
        );
};

export default ExemptionOrders;
