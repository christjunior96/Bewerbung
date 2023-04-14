import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser';


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface Message {
    betreff: string;
    nachrichtentext: string;
    datum: string;
    uhrzeit: string;
    anhaenge: string[][];
  }

  const Headline = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    color: #24243A;
  `;

  const Back = styled(Link)`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    white-space: nowrap;
    display:flex;
    align-items: center;
`;

const BackIcon = styled.div`
    margin-left:10px;
    display:flex;
    align-items: center;
`;

const DateTime = styled.div`
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #24243A;
`;

const MessageBody = styled.div`
    background: #F3F5FA;
    mix-blend-mode: normal;
    color: #24243A;
    padding: 2em;
    > a{
        text-decoration: underline;
    }
`;

const DocumentWrapper = styled.div`
    border: 4px solid #F3F5FA;
    padding: 2em 2em 1em 2em;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
`;

const Attachment = styled(Link)`
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #24243A;
    margin-right: 3em;
    display: flex;
    align-items:center;
    margin-bottom: 1.5em;
`;

const ImageWrapper = styled.div`
    width:30px;
    height:30px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:1em;
`;

const PostboxDetail = ({ betreff, nachrichtentext, datum, uhrzeit, anhaenge }: Message) => {


    return (
        <>
            <Column columnSpace={5}>
                <Row rowSpace={4} alignItems="center" justifyContent="space-between">
                    <Headline>{betreff}</Headline>
                    <Back href={"/account/postbox"}>zurück <BackIcon><Image src={"/icons/account/return.svg"} width={25} height={25} alt={"Back Icon"}/></BackIcon></Back>
                </Row>
                <DateTime>{datum} - {uhrzeit}</DateTime>
                <MessageBody>{parse(nachrichtentext)}</MessageBody>
                {anhaenge[0] && <DocumentWrapper>
                {anhaenge.map((attach, index) => {
                    return (
                        <Attachment key={`AttachmentItem-${index}`} href={attach[0]}>{attach[1]} <ImageWrapper><Image alt="attach icon" width={20} height={20} src={"/icons/account/attachment.svg"}/></ImageWrapper></Attachment>
                    )
                })}
                </DocumentWrapper>}
            </Column>
           
        </>
        );
};

export default PostboxDetail;
