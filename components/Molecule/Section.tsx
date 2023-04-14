import { ReactNode, Children, cloneElement } from 'react';
import styled from "styled-components"
import Space from '../Atom/Space';
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import {v4 as randomUUID} from 'uuid';

interface ColumnProps {
    children: ReactNode;
    backgroundColor?: string;
    sectionSpace?: number;
    id?:string;
    disablePadding?: boolean;
    displayLogo?: boolean;
    blog?: boolean;
}

const SectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    background: var(${props => props.theme.bgColor ? props.theme.bgColor : '--WHITE'});
    padding:${props => props.theme.dP ? '0em' : '0em 1em'};
    @media only screen and (max-width: 800px) {
        padding: 0em 0.5em;
    }
`;

const SectionContent = styled(SectionContainer)`
    max-width: ${props => props.theme.b ? '680px' : '1200px'};
    background-color: transparent;
    padding: 0em 0em;
`;

const LogoInBG = styled.div`
    position: absolute;
    width: 195.19px;
    height: 188px;
    mix-blend-mode: normal;
    opacity: 1;
    top: 60px;
    right: 100px;
    display: ${props => props.theme.dL ? 'block' : 'none'};
    @media only screen and (max-width: 800px) {
        width: 80px;
        top: 20px;
        right: 20px;
    }
`;



const Section = ({ children, backgroundColor, sectionSpace, disablePadding, id, displayLogo, blog}: ColumnProps) => {
    return (
    <SectionContainer id={id} theme={{ bgColor: backgroundColor, dP:disablePadding }}>
        <LogoInBG theme={{ dL:displayLogo }}><ResponsiveImage alt='ecozins Logo' src='/icons/public/ecozinsBG.svg'/></LogoInBG>
        <Space height={sectionSpace}></Space>
        <SectionContent theme={{b:blog}}>
        {children}
        </SectionContent>
        <Space height={sectionSpace}></Space>
    </SectionContainer>
    );
};

export default Section;
