import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Section from "components/Molecule/Section";


interface StaffItems {
    text: string;
    image: string;
    name: string;
  }
  
  interface StaffListe {
    items: StaffItems[];
  }

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })


const SliderContainer = styled.div`
    max-width:100%;
    color: white;
    > .swiper .swiper-wrapper .swiper-slide{
        filter: brightness(60%);
    }
    > .swiper .swiper-wrapper .swiper-slide .name{
        display: none;
    }
    > .swiper .swiper-wrapper .swiper-slide-next{
        filter: brightness(100%);
    }
    > .swiper .swiper-wrapper .swiper-slide-next .name{
        display: block;
    }
`;

const TextContainer =styled.div`
    width:100%;
    padding: 2em;
    background: var(--WELLINGTON);
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    /* or 167% */

    color: #FFFFFF;
`;

const Name = styled.div`
    background: #DAF1E2;
    mix-blend-mode: normal;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.0320422);
    border-radius: 8px;
    font-family: 'Nunito Sans';
    position: absolute;
    z-index: 101;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #2F513C;
    bottom: 10px;
    left: 20px;
    padding: 3px 5px;
`;


const StaffSlider = ({ items }: StaffListe) => {

    const [active, setActive] = useState(0);

    return (
        <>
        <SliderContainer>
            <Swiper
                // install Swiper modules
                modules={[  A11y, Mousewheel]}
                spaceBetween={0}
                slidesPerView={2}
                direction="horizontal"
                onSwiper={(swiper) => {
                    console.log(swiper)
                }}
                onSlideChange={(id) => {
                    setActive(id.realIndex), 
                    console.log(id.realIndex)
                    if(active == items.length-2) id.mousewheel.disable()
                    else id.mousewheel.enable()
                }
                }
                allowTouchMove
                normalizeSlideIndex={false}
                mousewheel={true}
                breakpoints={{
                    380: {
                        slidesPerView: 2,
                    },
                    550: {
                        slidesPerView: 3,
                    },
                    700: {
                        slidesPerView: 4,
                    },
                }}
                >
                <SwiperSlide>
                        <ResponsiveImage alt="Bild1" src={items[items.length-1].image}/>
                        <Name className="name">{items[0].name}</Name>
                </SwiperSlide>

                {items.map((item, index) => {
                    return (
                        <SwiperSlide key={`staffSlider-${index}`}>
                            <ResponsiveImage alt="Bild1" src={item.image}/>
                            <Name className="name">{item.name}</Name>
                        </SwiperSlide>
                    )
                })}

                 <SwiperSlide>
                        <ResponsiveImage alt="Bild1" src={items[0].image}/>
                        <Name className="name">{items[0].name}</Name>
                </SwiperSlide>
                <SwiperSlide>
                        <ResponsiveImage alt="Bild1" src={items[1].image}/>
                        <Name className={`${nunito.className} name`}>{items[1].name}</Name>
                </SwiperSlide>
                </Swiper>
        </SliderContainer>
        <Section backgroundColor="--WELLINGTON">
            <TextContainer className={nunito.className}>
                {items[active%items.length].text}
            </TextContainer>
        </Section>
        </>
        
        );
};

export default StaffSlider;
