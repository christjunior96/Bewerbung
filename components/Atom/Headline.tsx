import styled, { keyframes } from 'styled-components';
import React from "react";
import { Roboto_Slab } from '@next/font/google'
import { Nunito_Sans } from '@next/font/google'
import ResponsiveImage from "./ResponsiveImage";

const interbold = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })
const interregular = Roboto_Slab({weight:"400", subsets: ['latin'] })
const nunitoF = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })

interface HeadlineProps {
  h: number;
  small?: boolean;
  text: string;
  color?: string;
  regular?: boolean;
  textAlign?: string;
  underline?: boolean;
  nunito?: boolean;
  logo?: boolean;
  rubberBand?: boolean;
}

const rubberBandAnimation = keyframes`
  from {
    transform: scaleX(1) scaleY(1);
  }

  30% {
    transform: scaleX(1.25) scaleY(0.75);
  }

  40% {
    transform: scaleX(0.75) scaleY(1.25);
  }

  50% {
    transform: scaleX(1.15) scaleY(0.85);
  }

  65% {
    transform: scaleX(0.95) scaleY(1.05);
  }

  75% {
    transform: scaleX(1.05) scaleY(0.95);
  }

  to {
    transform: scaleX(1) scaleY(1);
  }
`;

const colorAnimation = keyframes`
  0% {
    color: inherit;
  }

  50% {
    color: blue;
  }

  100% {
    color: inherit;
  }
`;

const H1 = styled.h1`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '39.8' : '47.8'}px;
    text-align: ${props => props.theme.t ? props.theme.t: 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"}, sans-serif;
`;

const H2 = styled.h2`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '33.2' : '39.8'}px;
    text-align: ${props => props.theme.t ? props.theme.t: 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"}, sans-serif;
`;

const H3 = styled.h3`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '27.6' : '33.2'}px;
    text-align: ${props => props.theme.t ? props.theme.t: 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"}, sans-serif;
`;

const H4 = styled.h4`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '23' : '27.6'}px;
    text-align: ${props => props.theme.t ? props.theme.t : 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"};
`;

const H5 = styled.h5`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '19.2' : '23'}px;
    text-align: ${props => props.theme.t ? props.theme.t: 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"};
`;

const H6 = styled.h6`
    color: var(${props => props.theme.c ? props.theme.c : '--BLACK'});
    font-size: ${props => props.theme.small ? '16' : '19.2'}px;
    text-align: ${props => props.theme.t ? props.theme.t: 'center'};
    font-family: ${props => props.theme.ff ? 'Nunito Sans' : "Roboto Slab"};
`;

const HeadlineWrapper = styled.div`
    width: 100%;
    position: relative;
    border-bottom: ${props => props.theme.u ? '1px solid #C0CBCB' : 'unset'};
    padding-bottom: ${props => props.theme.u ? '15' : '0'}px;
`;

const DisplayLogo = styled.div`
    position: absolute;
    right: 20PX;
    top: -30px;
    @media only screen and (max-width: 750px) {
      display: none;
    }
    `;

const Headline = ({ h, small, text, color, regular, textAlign, underline, nunito, logo, rubberBand }: HeadlineProps) => {
  return (
    <HeadlineWrapper theme={{u:underline}}>
      {logo && <DisplayLogo><ResponsiveImage src="/icons/public/logo.svg" alt="ecozins Logo" /></DisplayLogo>}
      {h == 1 ? <H1 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H1> : h == 2 ? <H2 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H2> : h == 3 ? <H3 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H3> : h == 4 ? <H4 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H4> : h == 5 ? <H5 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H5> : h == 6 ? <H6 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H6> : <H1 className={ regular ? interregular.className : nunito ? nunitoF.className : interbold.className} theme={{ small: small, c:color, t:textAlign, ff:nunito }}>{text}</H1>}
    </HeadlineWrapper>
  );
};

export default Headline;
