import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Column from "components/Molecule/Column";




const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

interface Item {
    text: string[];
    color?: string;
  }

  const Text = styled.div`
    color: var(${props => props.theme.c ? props.theme.c : "--GOBLIN"});
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
  `;



const ListItem = ({ text, color }: Item) => {


    return (
        <Column columnSpace={5}>
            {text.map((item, index) => {
              if(item != null && item != ""){
                return(
                  <React.Fragment key={`ListItem-${index}`}>
                    <Row rowSpace={3} alignItems="center">
                        <ResponsiveImage src="/icons/public/list.svg" alt="illustration" width="18px" />
                        <Text className={nunito.className} color={color}>{item}</Text>
                      </Row>
                  </React.Fragment>
            )
              }else{
                return null;
              }
              })}
            
        </Column>
        
            
        );
};

export default ListItem;
