import styled from "styled-components";
import React, { ReactNode, useState } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "components/Molecule/Row";
import Column from "components/Molecule/Column";
import Link from "next/link";
import ResponsiveImage from "components/Atom/ResponsiveImage"
import Space from "components/Atom/Space";
import Section from "components/Molecule/Section";
import { Roboto_Slab } from '@next/font/google'
import Logo from "components/Atom/Logo";
import Headline from "components/Atom/Headline";
import MenuDropdown from "./MenuDropdown";

const roboto = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })
const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })



const HeaderWarpper = styled.div`
    background: var(--MALDIVES_INTENSE);
    height: 123px;
    min-height: 123px;
    max-height: 123px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0em 1em;
    @media only screen and (max-width: 800px) {
        padding: 0em 0.5em;
    }
`;

const Header = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    height: 123px;
    min-height: 123px;
    max-height: 123px;
`;

const SectionWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 0em 1em;
`;

const SectionWrapperDesktop = styled(SectionWrapper)`
    @media only screen and (max-width: 1000px) {
        display: none;
    }
`;

const SectionWrapperMobile = styled(SectionWrapper)`
    @media only screen and (min-width: 1000px) {
        display: none;
    }
`;

const MenuItems = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
`;

const MenuItem = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    font-family: ${nunito};
    font-style: normal;
    margin-right: 2em;
`;

const IconWrapper = styled.div`
    filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.0471208));
    border: 1px solid #D5F3E0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #EDF8F1;
`;

const MenuText = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    text-align: right;
    color: #506262;
    margin: 5px 0px 10px 0px;
`;

const MenuText2 = styled(MenuText)`
    margin: 5px 0px 18px 0px;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background: #c0cbcb;
    margin-top: -1px;
`;

const HiddenWrapper = styled.div`
    display: ${props => props.theme.u ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(148.01deg, rgba(239, 249, 243, 0.9) 9.44%, rgba(218, 241, 226, 0.9) 95.01%);
    z-index: 10001;
    backdrop-filter: blur(6.7957px);
    align-items: center;
`;

const SwitcherWrapper = styled.div`
    background: #EDF8F1;
    box-shadow: 0px 13px 20px rgba(0, 0, 0, 0.0312773);
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    padding: 1em 1em;
    height: 69px;
    @media only screen and (max-width: 450px) {
        flex-direction: column;
        align-items: flex-start;
        height: 100px;
    }
`;

const TextButton = styled.button`
    font-family: ${roboto};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    color: ${props => props.theme.s ? "#6BC690" : "#9F9F9F"};;
    background: none;
    border: none;
    border-radius: 8px;
    background: ${props => props.theme.s ? "white" : "none"};
    box-shadow: ${props => props.theme.s ? "0px 13px 20px rgba(0, 0, 0, 0.0312773)" : "none"};
    padding: 0.5em 1em;
    cursor: pointer;
    `;

const HeadingText = styled.div`
    font-family: 'Roboto Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 21px;
    color: #2F513C;
    margin-bottom:1em;
`;

const SupportButton = styled(Link)`
    background: #EDF8F1;
    box-shadow: 0px 13px 20px rgba(0, 0, 0, 0.0312773);
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    padding: 1em 1em;
    height: 69px;
    font-family: ${roboto},Arial;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #2F513C;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0em 2em;
    margin-left: 3em;
    @media only screen and (max-width: 600px) {
        margin-left: 0em;
        margin-top: 2em;
    }
`;

const CustomLink = styled(Link)`
    font-family: 'Nunito', Arial;
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color:  #2F513C;
    &:hover{
        color: #6bc690;
        font-weight: 700;
    }
`;

const CustomLinkUnderline = styled(CustomLink)`
    text-decoration: underline;
    &:hover{
        color: #2F513C;
        font-weight: 300;
    }
`;

const Neu = styled.div`
    background: #EDF8F1;
    box-shadow: 0px 13px 20px rgba(0, 0, 0, 0.0312773);
    border-radius: 8px; 
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin-left: 10px;
    font-family: 'Nunito', Arial;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #6BC690;
`;

const Display = styled.div`
    width: 100%;
    display: ${props => props.theme.d ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
`;

const AlignLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
    `;

const Box = styled(Link)`
    background: #EDF8F1;
    box-shadow: 0px 13px 20px rgba(0, 0, 0, 0.0312773);
    border-radius: 8px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 300px;
    padding: 1em 1em;
`;

const BoxText = styled.div`
    font-family: 'Nunito', Arial;
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 40px;
    text-align: center;
    color: #2F513C;
`;

const Menu = [
    {
      MenuId: '2',
      body: [['Home', '/'], ['Themen', '/'], ['Link', '/']],
      category: 'ecozins Portfolio',
      lastLink: '/faq',
    },
    {
    MenuId: '1',
    body: [['Home', '/'], ['Themen', '/'], ['Link', '/']],
    category: 'Themen',
    lastLink: '/faq',
    },
    {
    MenuId: '3',
    body: [['Home', '/'], ['Themen', '/'], ['Link', '/']],
    category: 'Insights',
    lastLink: '/faq',
    }
  ]

const MainMenu = () => {

    const [active, setActive] = useState(0);
    const [unfold, setUnfold] = useState(false);
    const [openId, setOpenId] = useState("1")

    return (
        <>
            <HiddenWrapper theme={{u:unfold}}>
            <Header>
                    <Logo/>
                    <MenuItems>
                        <MenuItem href='/'>
                            <IconWrapper>
                                <ResponsiveImage alt='Account Icon' width="20px" height="20px" src='/icons/public/account.svg'/>
                            </IconWrapper> 
                            <MenuText2>Konto</MenuText2>
                        </MenuItem>
                        <MenuItem href='' onClick={() => setUnfold(false)}>
                            <IconWrapper>
                                <ResponsiveImage alt='Account Icon' width="20px" height="20px" src='/icons/public/x.svg'/>
                            </IconWrapper> 
                            <MenuText2>Menü</MenuText2>
                        </MenuItem>
                    </MenuItems>
                </Header>
                <SectionWrapper>
                <AlignLeft>
                <SwitcherWrapper>
                    <TextButton theme={{s:active==0}} onClick={()=>{setActive(0)}}>Investor:innen</TextButton>
                    <TextButton theme={{s:active==1}} onClick={()=>{setActive(1)}}>Projektentwickler:innen</TextButton>
                </SwitcherWrapper>
                <SupportButton href={'/'}>
                    <ResponsiveImage alt='Support Icon' width="39px" height="30px" src='/icons/public/customer-support.svg'/>
                    Support
                </SupportButton>
                </AlignLeft>
                </SectionWrapper>
                <Space height={10}/>
                <Display theme={{d:active==0}}>
                <SectionWrapperDesktop>
                    <Row sizeEvenly>
                        <Column>
                        <HeadingText>ecozins Portfolio</HeadingText>
                        <CustomLink href='/'>Aktuelle Crowdinvesting Projekte</CustomLink>
                        <CustomLink href='/'>Nachhaltige Versicherungen</CustomLink>
                        <CustomLink href='/'>Nachhaltige Banken</CustomLink>
                        </Column>
                        <Column>
                        <HeadingText>Themen</HeadingText>
                        <CustomLink href='/'>Aktuelle Crowdinvesting Projekte</CustomLink>
                        <CustomLink href='/'>Nachhaltige Versicherungen</CustomLink>
                        <CustomLink href='/'>Nachhaltige Banken</CustomLink>
                        </Column>
                        <Column>
                        <HeadingText>Insights</HeadingText>
                        <CustomLink href='/'>Aktuelle Crowdinvesting Projekte <Neu>NEU</Neu></CustomLink>
                        <CustomLink href='/'>Nachhaltige Versicherungen</CustomLink>
                        <CustomLink href='/'>Nachhaltige Banken</CustomLink>
                        </Column>
                    </Row>
                </SectionWrapperDesktop>
                <SectionWrapperDesktop>
                    <Row sizeEvenly>
                        <Column>
                        <Row alignItems="center">
                        <CustomLinkUnderline href='/'>alle anzeigen</CustomLinkUnderline>
                        <Space width={5}/>
                        <ResponsiveImage alt="Arrow" src="/icons/public/rightArr.svg" />
                        </Row>
                        </Column>
                        <Column>
                        <Row alignItems="center">
                        <CustomLinkUnderline href='/'>alle anzeigen</CustomLinkUnderline>
                        <Space width={5}/>
                        <ResponsiveImage alt="Arrow" src="/icons/public/rightArr.svg" />
                        </Row>
                        </Column>
                        <Column>
                        <Row alignItems="center">
                        <CustomLinkUnderline href='/'>alle anzeigen</CustomLinkUnderline>
                        <Space width={5}/>
                        <ResponsiveImage alt="Arrow" src="/icons/public/rightArr.svg" />
                        </Row>
                        </Column>
                    </Row>
                </SectionWrapperDesktop>
                <SectionWrapperMobile>
                    <MenuDropdown openIdFun={setOpenId} openId={openId} menu={Menu}/>
                </SectionWrapperMobile>
                </Display>
                <Display theme={{d:active==1}}>
                <SectionWrapper>
                    <Row rowSpace={10} breakMobilePx={700} distanceMobile={10}>
                        <Box href=''>
                            <ResponsiveImage alt="Projekt finanzieren" width="137px" height="128px" src="/icons/public/finanzieren.svg"/>
                            <BoxText>Projekt finanzieren</BoxText>
                        </Box>
                        <Box href=''>
                            <ResponsiveImage alt="Projekt finanzieren" width="137px" height="128px" src="/icons/public/plattform.svg"/>
                            <BoxText>Eigene Beteiligungsplattform</BoxText>
                        </Box>
                    </Row>
                </SectionWrapper>
                </Display>
            </HiddenWrapper>
            <HeaderWarpper>
                <Header>
                    <Logo/>
                    <MenuItems>
                        <MenuItem href='/'>
                            <IconWrapper>
                                <ResponsiveImage alt='Account Icon' width="20px" height="20px" src='/icons/public/account.svg'/>
                            </IconWrapper> 
                            <MenuText>Konto</MenuText>
                            <ResponsiveImage alt='Triangle' width="16px" height="8px" src='/icons/public/Triangle2.svg'/> 
                        </MenuItem>
                        <MenuItem href={''} onClick={() => setUnfold(true)}>
                            <IconWrapper>
                                <ResponsiveImage alt='Account Icon' width="20px" height="20px" src='/icons/public/menu.svg'/>
                            </IconWrapper> 
                            <MenuText>Menü</MenuText>
                            <ResponsiveImage alt='Triangle' width="16px" height="8px" src='/icons/public/Triangle2.svg'/> 
                        </MenuItem>
                    </MenuItems>
                </Header>
            </HeaderWarpper>
            <Line/>
        </>
        
        );
};

export default MainMenu;
