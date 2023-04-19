import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { Roboto_Slab } from '@next/font/google'

const interregular = Roboto_Slab({weight:"400", subsets: ['latin'] })
const interbold = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })

const StyledLetter = styled(motion.span)`
  display: inline-block;
  font-size: ${props => props.theme.s ? '28px' : '38px'};
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
  loop?: boolean;
};

const rubberBandAnimation: Variants = {
  initial: {
    y: 0,
    scaleY: 1,
    scaleX: 1
  },
  hover: {
    y: -10,
    scaleY: 1.1,
    scaleX: 1.2
  },
  animate: (loop: boolean) => ({
    y: [0, -5, 0],
    scaleY: [1, 1.1, 1],
    scaleX: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      repeat: loop ? Infinity : 0,
      repeatType: 'reverse',
      delay: Math.random()
    }
  })
};

const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  text,
  small,
  loop = false
}) => {
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const letters = text.split('').map((letter, index) => (
    <StyledLetter
      key={index}
      className={interbold.className}
      initial="initial"
      whileHover={loop || initialAnimationDone ? "hover" : undefined}
      animate="animate"
      onAnimationComplete={() => !initialAnimationDone && setInitialAnimationDone(true)}
      variants={rubberBandAnimation}
      theme={{ s: small }}
      custom={loop}
    >
      <StyledContent>{letter}</StyledContent>
    </StyledLetter>
  ));

  return <H1 className={interbold.className}>{letters}</H1>;
};

export default AnimatedHeadline;
