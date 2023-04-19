import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";



interface ImageProps {
    src: string;
    alt: string;
    width?: string;
    height?:string;
    borderRadius?:string;
    maxWidth?:string;
    maxHeight?:string;
    objectFit?:string;
    sizes?:string;
    priority?:boolean;
    blendMode?:string;
    opacity?:string;
}

const ImageWrapper = styled.div`
    width: ${props => props.theme.w};
    height: ${props => props.theme.h};
    max-width: ${props => props.theme.mW};
    max-height: ${props => props.theme.mH};
    display: flex;
    align-items: center;
    position: relative;
    opacity: ${props => props.theme.op};
    mix-blend-mode: ${props => props.theme.bM};
    img{
        object-fit: ${props => props.theme.oF ? props.theme.oF : 'contain'};
        width: 100% !important;
        position: relative !important;
        height: ${props => props.theme.h ? props.theme.h : 'unset'} !important;
        border-radius: ${props => props.theme.br};
    }
`;


interface ImagePropsWithEffect extends ImageProps {
    effect?: boolean;
  }
  
  const ResponsiveImage = ({
    src,
    alt,
    width,
    height,
    borderRadius,
    maxWidth,
    maxHeight,
    objectFit,
    sizes,
    priority,
    blendMode,
    opacity,
    effect,
  }: ImagePropsWithEffect) => {
    priority = priority ? priority : false;
  
    const [ref, inView] = useInView({
      triggerOnce: true,
    });
  
    const animation = {
      hidden: { scale: 0 },
      visible: { scale: 1 },
    };
  
    const transition = {
      type: "spring",
      stiffness: 260,
      damping: 20,
    };
  
    const ImageComponent = (
      <ImageWrapper
        theme={{
          w: width,
          h: height,
          mW: maxWidth,
          mH: maxHeight,
          bM: blendMode,
          op: opacity,
          br: borderRadius,
          oF: objectFit,
        }}
      >
        <Image
          sizes={sizes}
          alt={alt}
          priority={priority}
          fill
          src={src}
        />
      </ImageWrapper>
    );
  
    const MotionImageComponent = (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={transition}
        variants={animation}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
      >
        {ImageComponent}
      </motion.div>
    );
  
    return effect ? MotionImageComponent : ImageComponent;
  };
  
  export default ResponsiveImage;
