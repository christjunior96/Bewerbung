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

interface PageItems {
    image: string;
    text: string;
    url: string;
  }
  
  interface PageListe {
    items: PageItems[];
  }

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })
const roboto = Roboto_Slab({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['normal'] })


const SliderContainer = styled.div`
    max-width:100%;
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    padding: 2em 0em;
    mix-blend-mode: normal;
    > .swiper{
        width: 100%;
        height: 250px;
    }
`;



const StyledLink = styled(Link)`
    font-size: 16px;
    text-align: center;
    color: var(--GOBLIN);
    border: 2px solid var(--BUTTON_BORDER2);
    white-space: nowrap;
    padding: '12px 24px';
    background: var(--VENICE_MINT2);
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 20px;
    font-family: ${nunito};
`;



const PageSlider = ({ items }: PageListe) => {

    const [active, setActive] = useState(0);

    return (
        <>
        
        <SliderContainer>
            <Swiper
                // install Swiper modules
                modules={[  A11y, Mousewheel, Autoplay, Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                autoplay={
                    {delay: 10000}
                }
                navigation
                pagination={{ clickable: true }}
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
                        slidesPerView: 1,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    820: {
                        slidesPerView: 3,
                    },
                }}
                >
                {items.map((item, index) => {
                    return (
                        <SwiperSlide key={`PageSlide-${index}`}>
                            <Column alignItems='center' columnSpace={7}>
                            <ResponsiveImage alt={'FAQ'} src={item.image} width="250px" height="180px" objectFit="cover" borderRadius="2em" />
                            <StyledLink className={nunito.className} href={item.url}>{item.text}</StyledLink>
                            </Column>
                        </SwiperSlide>
                    )
                })}
                </Swiper>
        </SliderContainer>
     
       
        </>
        
        );
};

export default PageSlider;
