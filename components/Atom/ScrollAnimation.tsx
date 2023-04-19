import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  left?: boolean;
  right?: boolean;
}

const ScrollAnimationWrapper = styled(motion.div)`
  
`;

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  left,
  right,
}) => {
  const controls = useAnimation();
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          controls.start("visible");
        }
      },
      { threshold: [0.1] }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, element]);

  return (
    <ScrollAnimationWrapper
      ref={setElement}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { x: 0, opacity: 1 },
        hidden: { x: left ? -100 : right ? 100 : 0, opacity: 0 },
      }}
      transition={{ duration: 1 }}
    >
      {children}
    </ScrollAnimationWrapper>
  );
};

export default ScrollAnimation;
