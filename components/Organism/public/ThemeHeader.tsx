import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import Section from "components/Molecule/Section";
import { Roboto_Slab } from '@next/font/google'
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay, FreeMode } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const roboto = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })
const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

interface HeaderItem {
    title: string;
    subtitle?: string;
    type?: string;
    link: string;
    image: string;
    }

interface HeaderItems {
    items: HeaderItem[];
    value: number;
    onClick: (selected: number) => void;
    }



const HeaderImage = styled.div`
    width: 100%;
    height: 600px;
    background: var(--MALDIVES);
    border-radius: 0px 0px 70px 70px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    backdrop-filter: blur(28px);
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    padding: 0 20px;
    width: 100%;
    color: #ffffff;
`;

const HeaderWrapper = styled.div`
    margin-top: -570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
`;

const ImageWrapper= styled.div`
    width: 100%;
    background: linear-gradient(24.77deg, rgba(0, 0, 0, 0.551) 24.62%, rgba(0, 0, 0, 0.0001) 65.47%), url(${props => props.theme.i});
    filter: drop-shadow(55px 40px 50px rgba(0, 0, 0, 0.1));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
    border-radius: 3em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px 40px;
    @media only screen and (max-width: 500px) {
        padding: 40px 20px;
    }
`;

const Topics = styled.div`
    background: #DAF1E2;
    mix-blend-mode: normal;
    opacity: 0.7;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.0320422);
    border-radius: 8px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    margin: 30px 0;
    @media only screen and (max-width: 650px) {
        display: none;
    }
`;

const Subline = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 23px;
    text-align: left;
    color: #ffffff;
    width: 100%;
`;

const Button = styled.button`
    background: transparent;
    border:0px;
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 32px;
    cursor: pointer;
    color: ${props => props.theme.s ? "#6BC690" : "#2F513C"};
    margin: 0 20px;
    @media only screen and (max-width: 650px) {
        margin: 5px 0;
    }
`;

const Topic = styled.div`
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
    padding: 2px 10px;

`;

const Overflow = styled.div`
    overflow: hidden;
`;

const DotsWrapper = styled.div`
    display: flex;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: ${props => props.theme.s ? "#6BC690" : "#D8D8D8"};
`;

const MoreInfo = styled(Link)`
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    text-align: right;
    color: var(--WHITE);
    transition: bottom 0.3s ease-in-out;
    display:flex;
    align-items:center;
    display: flex;
    justify-content: flex-end;
`;

const Headline = styled.h2`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: #FFFFFF;
    @media only screen and (max-width: 700px) {
        font-size: 22px;
        line-height: 30px;
    }

`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const SliderContainer = styled.div`
    max-width:100%;
    width: 100%;
    > .swiper{
        width: 100%;
        border-radius: 3em;
    }
`;

const SelectTopics = styled.div`
    background: #DAF1E2;
    mix-blend-mode: normal;
    opacity: 0.7;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.0320422);
    border-radius: 8px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    margin: 30px 0;
    @media only screen and (min-width: 650px) {
        display: none;
    }
`;

const Select = styled.select`
    background: transparent;
    color: #2F513C;
    border: 0px;
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 32px;
    cursor: pointer;
    width: 290px;
`;


const ThemeHeader = ({ items, onClick, value }:HeaderItems) => {

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onClick(parseInt(event.target.value));
      };


    return (
        <>
            <Overflow>
            <HeaderImage/>
            </Overflow>
            <HeaderWrapper>
                <HeaderContent>
        <SliderContainer>
            <Swiper
                // install Swiper modules
                modules={[  A11y, Mousewheel, Autoplay]}
                slidesPerView={1}
                autoplay={{delay: 7500}}
                direction="horizontal"
                allowTouchMove
                normalizeSlideIndex={false}
                >
                    {items.map((item, index) => {
                    return (
                    <SwiperSlide key={`ImageSlider-${index}`}>
                        <ImageWrapper theme={{i:item.image}} >
                            <Headline className={roboto.className}>{item.title}</Headline>
                            {item.subtitle && <Subline>{item.subtitle}</Subline>}
                            <Space height={3}/>
                            <Row alignItems="center" breakMobilePx={480} distanceMobile={3} sizeEvenly justifyContent="space-between">
                            <Left>
                                <Topic>Finanzthemen</Topic>
                                <Space width={5}/>
                                <DotsWrapper>
                                    <Dot theme={{s:0==index}}/>
                                    <Space width={2}/>
                                    <Dot theme={{s:1==index}}/>
                                    <Space width={2}/>
                                    <Dot theme={{s:2==index}}/>
                                </DotsWrapper>
                            </Left>
                            <MoreInfo href={`/blog/${item.link}`} className={nunito.className}>mehr erfahren <Space width={3}/><ResponsiveImage sizes='20px' alt='Arrow Icon' src='/icons/public/arrowW.svg' width='20px' height='20px'/></MoreInfo>
                            </Row>
                            
                        </ImageWrapper>
                    </SwiperSlide>
                    )})}
            </Swiper>
        </SliderContainer>
        </HeaderContent>
                <Topics>
                    <Button onClick={() => onClick(0)} theme={{s:value==0}}>Alle</Button>
                    <Button onClick={() => onClick(1)} theme={{s:value==1}}>Wissen</Button>
                    <Button onClick={() => onClick(2)} theme={{s:value==2}}>Ratgeber</Button>
                    <Button onClick={() => onClick(3)} theme={{s:value==3}}>Projektinformationen</Button>
                </Topics>
                <SelectTopics>
                    <Select value={value} onChange={handleSelectChange}>
                        <option key={0} value={0}>Alle</option>
                        <option key={1} value={1}>Wissen</option>
                        <option key={2} value={2}>Ratgeber</option>
                        <option key={3} value={3}>Projektinformationen</option>
                    </Select>
                </SelectTopics>
            </HeaderWrapper>
        </>
        
        );
};

export default ThemeHeader;
