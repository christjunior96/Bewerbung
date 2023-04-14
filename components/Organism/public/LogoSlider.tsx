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

const logos = [
    {
        "image": "/logos/logo1.svg"
    },
    {
        "image": "/logos/logo2.svg"
    },
    {
        "image": "/logos/logo3.svg"
    },
    {
        "image": "/logos/logo1.svg"
    },
    {
        "image": "/logos/logo2.svg"
    },
    {
        "image": "/logos/logo3.svg"
    },
    {
        "image": "/logos/logo1.svg"
    },
    {
        "image": "/logos/logo2.svg"
    },
]


const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })
const roboto = Roboto_Slab({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['normal'] })


const SliderContainer = styled.div`
    max-width:100%;
    color: white;
    display: flex;
    align-items: center;
    padding: 2em;
    filter: grayscale(100%);
    background: #FFFFFF;
    mix-blend-mode: normal;
    opacity: 0.7;
    max-height: 90px;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.0320422);
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



const LogoSlider = () => {

    const [active, setActive] = useState(0);

    return (
        <>
        
        <SliderContainer>
            <TextContainer className={roboto.className}>
                Bekannt aus
            </TextContainer>
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
                {logos.map((item, index) => {
                    return (
                        <SwiperSlide  key={`logoSlide-${index}`}>
                            <ResponsiveImage alt="Logo" height="40px" src={item.image}/>
                        </SwiperSlide>
                    )
                })}
                </Swiper>
        </SliderContainer>
     
       
        </>
        
        );
};

export default LogoSlider;
