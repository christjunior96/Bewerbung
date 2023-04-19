import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Roboto_Slab } from '@next/font/google'

const interregular = Roboto_Slab({weight:"400", subsets: ['latin'] })
const interbold = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })

const StyledLetter = styled(motion.span)`
  display: inline-block;
  font-size: ${props => props.theme.s ? '28px' : '39px'};
`;

const StyledContent = styled.span`
  white-space: pre-wrap;
  font-family: 'Roboto Slab', sans-serif;
`;

const H1 = styled.h1`
  text-align: center;
  font-family: 'Roboto Slab', sans-serif;
`;

type AnimatedHeadlineProps = {
  text: string;
  small?: boolean;
};

const rubberBandAnimation = {
  initial: {
    y: 0,
    scaleY: 1,
    scaleX:1
  },
  hover: {
    y: -10,
    scaleY: 1.1,
    scaleX:1.2,
    transition: {
      duration: 0.25,
      yoyo: Infinity
    }
  }
};

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({ text, small }) => {
  const letters = text.split('').map((letter, index) => (
    <StyledLetter
      key={index}
      className={interbold.className}
      initial="initial"
      whileHover="hover"
      variants={rubberBandAnimation}
      theme={{s:small}}
    >
      <StyledContent>{letter}</StyledContent>
    </StyledLetter>
  ));

  return <H1 className={interbold.className}>{letters}</H1>;
};

export default AnimatedHeadline;
