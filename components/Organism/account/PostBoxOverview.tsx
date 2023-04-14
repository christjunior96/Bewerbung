import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Image from "next/image";
import Link from "next/link";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface Nachricht {
    betreff: string;
    nachrichtentext: string;
    datum: string;
    uhrzeit: string;
    read: boolean;
    anhaenge: string[][];
  }
  
  interface NachrichtenListe {
    nachrichten: Nachricht[];
  }


  
  const MessageItem = styled.div`
        background: ${props => props.theme.sec ? 'white' : "#F3F5FA"};
        padding: 1em 2em;
  `;

  const MessageWrapper = styled(Link)`
    
  `;

  const DateTime = styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;  
    margin-bottom: 0.5em;
`;

const BottomRow = styled.div`
    font-weight: ${props => props.theme.r ? 200 : 700};
    font-size: 14px;
    line-height: 16px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical; 
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
`;


const PostboxOverview = ({ nachrichten }: NachrichtenListe) => {

    function removeTags(str:string) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
           
        return str.replace( /(<([^>]+)>)/ig, '');
    }


    return (
        <>
            <Column>
                {nachrichten.map((message,index) => {return (
                    <MessageWrapper href={"/account/message/1"}>
                        <MessageItem theme={{sec:index%2==0}} className={nunito.className}>
                            <Row rowSpace={4} justifyContent="space-between" alignItems="center">
                                <div>
                                    <DateTime className={nunito.className}>{message.datum} - {message.uhrzeit}</DateTime>
                                    <BottomRow className={nunito.className} theme={{r:message.read}}>{removeTags(message.nachrichtentext)}</BottomRow>
                                </div>
                                {message.anhaenge[0] && <ImageWrapper><Image alt="attach icon" width={20} height={20} src={"/icons/account/attachment.svg"}/></ImageWrapper>}
                            </Row>
                        </MessageItem>
                    </MessageWrapper>
                )})
                }
            </Column>
        </>
        );
};

export default PostboxOverview;
