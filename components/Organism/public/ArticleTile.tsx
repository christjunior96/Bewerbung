// Tile.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Nunito_Sans } from '@next/font/google'
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Space from 'components/Atom/Space';
import Link from 'next/link';
import Row from 'components/Molecule/Row';
import Column from 'components/Molecule/Column';
import { read } from 'fs';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface TileProps {
  title: string;
  image: string;
  subtext: string;
  link: string;
  readMinutes: string;
  imageAlt: string;
}

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    background: #FFFFFF;
    border-radius: 2em;
`;

const Min = styled.div`
    font-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-align: right;
    color: #000000;
    background: #F0F0F0;
    border-radius: 5px;
    padding: 1px 8px;
    white-space: nowrap;
    height: 24px;
`;

const TextContainer = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
    width: 100%;
    height: 52px;
    max-height: 52px; /* begrenzt den Text auf zwei Zeilen */
    display: -webkit-box; /* Erstellen eines flexiblen Behälters */
    -webkit-box-orient: vertical; /* Anordnen der Boxen vertikal */
    -webkit-line-clamp: 2; /* Begrenzen auf maximal zwei Zeilen */
    overflow: hidden; /* Verstecken des Textes, der über die Grenze hinausgeht */
    text-overflow: ellipsis; /* Auspunkten am Ende des Textes */ /* verhindert das automatische Umbrechen des Textes */
`;

const MaxWidth = styled(Link)`
    max-width: 600px;
    width: 100%;
    cursor: pointer;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const SubtextContainer = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
    max-height: 40px; /* begrenzt den Text auf zwei Zeilen */
    display: -webkit-box; /* Erstellen eines flexiblen Behälters */
    -webkit-box-orient: vertical; /* Anordnen der Boxen vertikal */
    -webkit-line-clamp: 2; /* Begrenzen auf maximal zwei Zeilen */
    overflow: hidden; /* Verstecken des Textes, der über die Grenze hinausgeht */
    text-overflow: ellipsis; /* Auspunkten am Ende des Textes */ /* verhindert das automatische Umbrechen des Textes */
    `;



const ArticleTile: React.FC<TileProps> = ({ image, link, title, imageAlt, readMinutes, subtext }) => {
  return (
    <MaxWidth href={`/blog/${link}`}>
      <Top>
        <ImageWrapper><ResponsiveImage alt={imageAlt} src={image} sizes='100px' blendMode='luminosity' opacity='0.8' width='100px' height='100px' objectFit='cover' borderRadius='2em'/></ImageWrapper>
        <Space width={5}/>
        <Column>
            <Top>
                <TextContainer>{title}</TextContainer>
                <Space width={5}/>
                <Min>{readMinutes} min</Min>
            </Top>
            <Row sizeEvenly>
                <SubtextContainer>{subtext}</SubtextContainer>
            </Row>
        </Column>
      </Top>
    </MaxWidth>
    
   
  );
};

export default ArticleTile;
