import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Roboto_Slab } from '@next/font/google'

const interregular = Roboto_Slab({weight:"400", subsets: ['latin'] })
const interbold = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })

const rubberBandAnimation = keyframes`
  0% {
    transform: translateY(0px) scale(1);
  }

  50% {
    transform: translateY(-10px) scale(1.1);
  }

  100% {
    transform: translateY(0px) scale(1);
  }
`;

const StyledLetter = styled.span`
  display: inline-block;
  transition: transform 0.2s;
  
  font-size: 39px;
  &:hover {
    animation: ${rubberBandAnimation} 0.5s;
    animation-fill-mode: forwards;
  }
`;

const StyledContent = styled.span`
  white-space: pre-wrap;
  font-family: 'Roboto Slab';
`;

const H1 = styled.h1`
text-align: center;
font-family: 'Roboto Slab';
`;

type AnimatedHeadlineProps = {
  text: string;
};

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text }) => {
  const letters = text.split('').map((letter, index) => (
    <StyledLetter key={index}>
      <StyledContent className={interbold.className}>{letter}</StyledContent>
    </StyledLetter>
  ));

  return <H1 className={interbold.className}>{letters}</H1>;
};

export default AnimatedHeadline;
