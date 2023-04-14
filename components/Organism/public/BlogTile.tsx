// Tile.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Nunito_Sans } from '@next/font/google'
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Space from 'components/Atom/Space';
import Link from 'next/link';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


interface TileProps {
  title: string;
  image: string;
  type: string;
  link: string;
  imageAlt: string;
}

const TileWrapper = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 25px;
    background-color: #F9F9F9;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: height 0.3s ease-in-out;
    &:hover {
        height: 330px;
    }
    `;

const Topic = styled.div`
    position: absolute;
    background: #DAF1E2;
    mix-blend-mode: normal;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.0320422);
    border-radius: 8px;
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: var(--WELLINGTON_BLACK);
    z-index: 1;
    top: 165px;
    left: 20px;
    padding: 2px 10px;
`;

const TileContent = styled.div`
    width: 100%;
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const TileText = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: var(--WELLINGTON_BLACK);
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    padding-top: 10px;
`;

const MoreInfo = styled.span`
    position: absolute;
    bottom: -30px;
    right: 20px;
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    text-align: right;
    color: var(--WELLINGTON_BLACK);
    transition: bottom 0.3s ease-in-out;
    display:flex;
    align-items:center;

    .tile:hover & {
        bottom: 10px;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
`;

const Tile: React.FC<TileProps> = ({ image, link, title, type, imageAlt }) => {
  return (
    <StyledLink href={link}>
     <TileWrapper className="tile">
    <Topic>{type}</Topic>
    <ResponsiveImage alt={imageAlt} src={image} width="300px" height="175px" sizes='300px' objectFit='cover'/>
      <TileContent className="tile-content">
        <TileText className={nunito.className}>{title}</TileText>
        <MoreInfo className={nunito.className}>mehr erfahren <Space width={3}/><ResponsiveImage sizes='20px' alt='Arrow Icon' src='/icons/public/arrow.svg' width='20px' height='20px'/></MoreInfo>
      </TileContent>
    </TileWrapper>
    </StyledLink>
   
  );
};

export default Tile;
