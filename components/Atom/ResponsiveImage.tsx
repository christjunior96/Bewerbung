import styled from "styled-components";
import Image from "next/image";


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


const ResponsiveImage = ({ src, alt, width, height, borderRadius, maxWidth, maxHeight, objectFit,sizes, priority, blendMode,opacity }: ImageProps) => {
    priority = priority ? priority : false;

return (
    <ImageWrapper theme={{w:width, h:height, mW:maxWidth, mH:maxHeight, bM:blendMode, op:opacity , br:borderRadius, oF:objectFit }}>
        <Image sizes={sizes} alt={alt} priority={priority} fill src={src}/>
    </ImageWrapper>
    
);
};

export default ResponsiveImage;
