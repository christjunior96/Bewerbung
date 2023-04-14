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

interface NumberItems {
    number: string;
    text: string;
  }
  
  interface NumberListe {
    items: NumberItems[];
  }


const SliderContainer = styled.div`
    max-width:100%;
    color: white;
    display: flex;
    align-items: center;
    padding: 2em 0em;
    background: transparent;
    mix-blend-mode: normal;
    opacity: 0.7;
    max-height: 90px;
    border-radius: 8px;
    .swiper-slide.swiper-slide-active {
        border-right: 1px solid black;
    }
    .swiper-slide.swiper-slide-next {
        border-right: 1px solid black;
    }
    @media only screen and (max-width: 660px) {
        flex-direction: column;
        max-height: unset;
        padding: 2em 1em;
    }
    @media only screen and (max-width: 700px) {
        flex-direction: column;
        max-height: unset;
        padding: 2em 1em;
        .swiper-slide.swiper-slide-active {
            border-right: 1px solid black;
        }
        .swiper-slide.swiper-slide-next {
            border-right: 0px solid black;
        }
    }
    @media only screen and (max-width: 700px) {
        .swiper-slide.swiper-slide-active {
            border-right: 0px solid black;
        }
    }
    > .swiper{
        width: 100%;
    }
`;

const TopText = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    color: #506262;
`;

const BottomText = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #506262;
`;







const NumberSlider = ({ items }: NumberListe) => {

    const [active, setActive] = useState(0);

    return (
        <>
        
        <SliderContainer>
            <Swiper
                // install Swiper modules
                modules={[  A11y, Mousewheel, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={
                    {delay: 7500}
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
                    280: {
                        slidesPerView: 1,
                    },
                    550: {
                        slidesPerView: 1,
                    },
                    700: {
                        slidesPerView: 3,
                    },
                }}
                >
                {items.map((item,index) => {
                    return (
                        <SwiperSlide key={`NumberSliderItem-${index}`}>
                            <Column>
                                <TopText>{item.number}</TopText>
                                <BottomText>{item.text}</BottomText>
                            </Column>
                        </SwiperSlide>
                    )
                }
                )}
                </Swiper>
        </SliderContainer>
        </>
        
        );
};

export default NumberSlider;
