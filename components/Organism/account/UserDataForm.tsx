import styled from "styled-components";
import React, { ChangeEvent, MouseEvent, ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import Button from "components/Molecule/Button";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Space from "components/Atom/Space";
import Link from "next/link";
import Image from 'next/image';
import StyledTextInput from "components/Molecule/StyledTextInput";
import Column from "components/Molecule/Column";
import Row from "components/Molecule/Row";
import StyledSelectInput from "components/Molecule/StyledSelectInput";
import StyledDateInput from "components/Molecule/StyledDate";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface FormProps {
    imageUrl?: string;
    username: string;
    registerDate: string;
    gender?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    plz?: string;
    city?: string;
    country?: string;
    birthDate?: Date;
    birthCity?: string;
    IBAN?: string;
    BIC?: string;
    phone?: string;
    TaxID?: string;
    addressAddition?: string;
}

const GrayBox = styled.div`
    background-color: #f7f7f7;
    color: #696969;
    padding: 1em;
    margin-bottom: 2em;
    font-weight: 300;
    border-radius: 1em;
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 950px) {
        flex-direction: column;
    }
`;

const BoxLeft = styled.div`
    display:flex;
    width: 100%;
    align-items: center;
    @media only screen and (max-width: 950px) {
        justify-content: center;
    }
    @media only screen and (max-width: 800px) {
       flex-direction: column;
    }
`;

const BoxRight = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    @media only screen and (max-width: 950px) {
        margin-top: 2em;
    }
`;

const BoxBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
`;

const BlockDesc = styled.div`
    font-weight: 500;
    width: 100%;
    font-size: 14px;
    color: #696969;
    margin-bottom: 5px;
`;

const Address = styled.div`
    margin-top: 2em;
    color: #696969;
    margin-left: 0.5em;
    font-size: 18px;
    margin-bottom: 1em;
`;

const BlockValue = styled(BlockDesc)`
    font-weight: 300;
`;

const ProfileImage = styled(Image)`
    border-radius: 999px;
    margin: 0em 1em;
    @media only screen and (max-width: 800px) {
       margin-bottom: 2em;
    }
`;



const DataForm = ({ imageUrl, username, registerDate, gender, title, firstName, lastName, street, plz, city, country, birthDate, birthCity, IBAN, BIC, phone, TaxID, addressAddition }: FormProps) => {

    const [newImageUrl, setImageUrl] = useState(imageUrl);
    const [newGender, setGender] = useState(gender);
    const [newTitle, setTitle] = useState(title);
    const [newFirstName, setFirstName] = useState(firstName);
    const [newLastName, setLastName] = useState(lastName);
    const [newStreet, setStreet] = useState(street);
    const [newPLZ, setPLZ] = useState(plz);
    const [newCity, setCity] = useState(city);
    const [newCountry, setCountry] = useState(country);
    const [newBirthDate, setBirthDate] = useState(birthDate);
    const [newBirthCity, setBirthCity] = useState(birthCity);
    const [newIBAN, setIBAN] = useState(IBAN);
    const [newBIC, setBIC] = useState(BIC);
    const [newPhone, setPhone] = useState(phone);
    const [newTaxID, setTaxID] = useState(TaxID);
    const [newAddressAddition, setAddressAddition] = useState(addressAddition);
    const [day, setDay] = useState(birthDate ? birthDate.getDate() : "");
    const [month, setMonth] = useState(birthDate ? birthDate.getMonth() : "");
    const [year, setYear] = useState(birthDate ? birthDate.getFullYear() : "");

    const [file, setFile] = useState<File | null>(null);

    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
    
        if (!fileInput.files) {
          alert("Keine Datei ausgewählt");
          return;
        }
    
        if (!fileInput.files || fileInput.files.length === 0) {
          alert("Die Datei ist leer");
          return;
        }
    
        const file = fileInput.files[0];
    
        /** File validation */
        if (!file.type.startsWith("image")) {
          alert("Bitte wähle ein gültiges Bild");
          return;
        }
    
        /** Setting file state */
        setFile(file); // we will use the file state, to send it later to the server
        setImageUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image
    
        /** Reset file input */
        e.currentTarget.type = "text";
        e.currentTarget.type = "file";
      };
    
      const onUploadFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      };


    return (
        <>
            <GrayBox>
                <BoxLeft>
                    <ProfileImage alt="Profilbild" width={68} height={68} src={newImageUrl ? newImageUrl : "/icons/headerbar/profile-img.svg"}/>
                    <input
                      name="file"
                      type="file"
                      onChange={onFileUploadChange}
                    />    
                </BoxLeft>
                <BoxRight>
                    <BoxBlock>
                        <BlockDesc>Benutzername</BlockDesc>
                        <BlockValue>{username}</BlockValue>
                    </BoxBlock>
                    <Space width={10}/>
                    <BoxBlock>
                        <BlockDesc>Registriert seit</BlockDesc>
                        <BlockValue>{registerDate}</BlockValue>
                    </BoxBlock>
                </BoxRight>
            </GrayBox>
            <Column>
                <Row sizeEvenly rowSpace={5} distanceMobile={5} breakMobilePx={500}>
                    <Row sizeEvenly rowSpace={5} breakMobilePx={950} distanceMobile={5}>
                        <StyledSelectInput description="Herr/Frau" value={newGender} onChange={setGender} options={["Herr","Frau","Firma"]} />
                        <StyledSelectInput description="Titel" value={newTitle} onChange={setTitle} options={["","Dr.","Prof.","Prof. Dr."]} />
                    </Row>
                    <Row sizeEvenly rowSpace={5}  breakMobilePx={950} distanceMobile={5}>
                        <StyledTextInput description="Vorname" placeholder="Vorname" value={newFirstName} onChange={setFirstName} />
                        <StyledTextInput description="Nachname" placeholder="Nachname" value={newLastName} onChange={setLastName} />
                    </Row>
                </Row>
            </Column>
            <Column>
                <Address>Adressdaten</Address>
                <Row sizeEvenly rowSpace={5}  breakMobilePx={950} distanceMobile={5}>
                    <StyledTextInput description="Straße & Hausnummer" placeholder="Musterstraße 12" value={newStreet} onChange={setStreet} />
                    <Row sizeEvenly rowSpace={5} breakMobilePx={500} distanceMobile={5}>
                        <StyledTextInput description="Anschrift Zusatz" placeholder="Anschrift Zusatz" value={newAddressAddition} onChange={setAddressAddition} />
                        <StyledTextInput description="Postleitzahl" placeholder="12345" value={newPLZ} onChange={setPLZ} />
                    </Row>
                </Row>
                <Space height={8}/>
                <Row sizeEvenly rowSpace={5} distanceMobile={5} breakMobilePx={500}>
                    <StyledTextInput description="Stadt" value={newCity} onChange={setCity}  placeholder="Marburg"/>
                    <StyledSelectInput description="Land" value={newCountry} onChange={setCountry} options={["Deutschland", "Österreich", "Schweiz"]} />
                </Row>
                <Space height={8}/>
                <Row sizeEvenly rowSpace={5} distanceMobile={5} breakMobilePx={500}>
                    <Row sizeEvenly rowSpace={5}  breakMobilePx={950} distanceMobile={5}>
                        <StyledTextInput description="IABN" value={newIBAN} onChange={setIBAN}  placeholder="IBAN"/>
                        <StyledTextInput description="BIC" value={newBIC} onChange={setBIC}  placeholder="BIC"/>
                    </Row>
                    <Row sizeEvenly rowSpace={5}  breakMobilePx={950} distanceMobile={5}>
                        <StyledTextInput description="Telefonnummer" placeholder="Telefonnummer" value={newPhone} onChange={setPhone} />
                        <StyledTextInput description="Steuer-ID" placeholder="ID" value={newTaxID} onChange={setTaxID} />
                    </Row>
                </Row>
                <Space height={8}/>
                <Row sizeEvenly rowSpace={5} distanceMobile={5} breakMobilePx={500}>
                    <StyledDateInput description="Geburtsdatum" valueDay={day.toString()} valueMonth={month.toString()} valueYear={year.toString()} onChangeDay={setDay} onChangeMonth={setMonth} onChangeYear={setYear}/>
                    <StyledTextInput description="Geburtsort" placeholder="Marburg" value={newBirthCity} onChange={setBirthCity} />
                </Row>
            </Column>
            <Space height={10}/>
            <Button text={"Aktualisieren"} small onClick={onUploadFile}/>
        </>
        );
};

export default DataForm;
