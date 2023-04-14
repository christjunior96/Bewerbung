import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import { Roboto_Slab } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay, FreeMode } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Section from "components/Molecule/Section";


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })
const roboto = Roboto_Slab({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['normal'] })

interface LogoItems {
    logoUrl: string;
  }
  
  interface LogoListe {
    items: LogoItems[];
  }


const SliderContainer = styled.div`
    max-width:100%;
    color: white;
    display: flex;
    align-items: center;
    padding: 2em 0em;
    filter: grayscale(100%);
    background: #FFFFFF;
    mix-blend-mode: normal;
    opacity: 0.7;
    max-height: 90px;
    border-radius: 8px;
    @media only screen and (max-width: 660px) {
        flex-direction: column;
        max-height: unset;
        padding: 2em 1em;
    }
    > .swiper{
        width: 100%;
    }
`;

const TextContainer = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
    white-space: nowrap;
`;

const Line = styled.div`
    width: 2px;
    background: #d6d6d6;
    height: 60px;
    margin-right: 1.5em;
    margin-left: 2.5em;
    @media only screen and (max-width: 660px) {
        height: 2px;
        width: 90%;
        margin-right: 0em;
        margin-left: 0em;
        margin-top: 1em;
        margin-bottom: 1em;
        padding: 0em 2em;
    }
`;

const MText = styled.div`
    display: none;
    @media only screen and (max-width: 660px) {
        display: block;
    }
`;

const DText = styled.div`
    display: block;
    @media only screen and (max-width: 660px) {
        display: none;
    }
`;



const LogoSliderProjects = ({ items }: LogoListe) => {

    const [active, setActive] = useState(0);

    return (
        <>
        
        <SliderContainer>
            <MText>
                <TextContainer className={roboto.className}>
                    {items.length} finanzierte Projekte
                </TextContainer>
            </MText>
            <DText>
                <TextContainer className={roboto.className}>
                    {items.length} finanzierte <br/> Projekte
                </TextContainer>
            </DText>
            <Line/>
            <Swiper
                // install Swiper modules
                modules={[  A11y, Mousewheel, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={
                    {delay: 3500}
                }
                direction="horizontal"
                onSwiper={(swiper) => {
                    console.log(swiper)
                }}
                onSlideChange={(id) => {
                    setActive(id.realIndex), 
                    console.log(id.realIndex)
                }
                }
                allowTouchMove
                normalizeSlideIndex={false}
                breakpoints={{
                    380: {
                        slidesPerView: 2,
                    },
                    550: {
                        slidesPerView: 2,
                    },
                    700: {
                        slidesPerView: 3,
                    },
                }}
                >
                {items.map((item,index) => {
                    if(item.logoUrl != null){
                        return (
                            <SwiperSlide key={`LogoSliderItem-${index}`}>
                                <ResponsiveImage alt="Logo" height="40px" src={item.logoUrl}/>
                            </SwiperSlide>
                        )
                    }
                })}
                </Swiper>
        </SliderContainer>
        </>
        
        );
};

export default LogoSliderProjects;
