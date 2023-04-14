import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Text from "components/Atom/Text";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface CarrierItems {
    text: string;
    image: string;
  }
  
  interface GridListe {
    items: CarrierItems[];
  }


  

const ImageWrapper = styled.div`
    width:93px;
    max-width:93px;
    max-height:93px;
    height:93px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Grid = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-gap: 30px;
    width: 100%;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin-bottom: 2em;
`;

const CarrierGrid = ({ items }: GridListe) => {


    return (
        <Grid>
            {items.map((item,index) => {
                return(
                <ItemWrapper key={`CarrierItem-${index}`}>
                    <ImageWrapper><ResponsiveImage alt="Event Icon" width="93px" src={item.image}/></ImageWrapper>
                    <Text textAlign="center" color="--BLACK">{item.text}</Text>
                </ItemWrapper>
                )
                })}
            
        </Grid>
        );
};

export default CarrierGrid;
