import Logo from 'components/Atom/Logo';
import { ReactNode, Children, cloneElement, useState } from 'react';
import styled from "styled-components"
import Image from 'next/image';
import { Nunito_Sans } from '@next/font/google'
import Space from 'components/Atom/Space';
import Head from 'next/head';
import Column from 'components/Molecule/Column';
import Link from 'next/link';
import ResponsiveImage from 'components/Atom/ResponsiveImage';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface WrapperProps {
    children: ReactNode;
    name: string;
    letzterLogin?: string;
    bildUrl?:string;
    headline: string;
    selected: string;
    unread?: number;
}

const HeaderDiv = styled.div`
    width: 100%;
    height: 70px;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
`;

const DivLeft = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const DivLastLogin = styled.div`
    display: ${props => props.theme.ll ? "flex" : "none"};
    align-items: center;
    position: relative;
    align-content: center; 
    font-size: 12px;
    font-weight: 600;
    @media only screen and (max-width: 800px) {
        display: none;
    }
`;

const DivRight = styled.div`
    font-weight: 700;
    font-size: 18px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media only screen and (max-width: 800px) {
        display: none;
    }
`;

const Button = styled.button`
    font-weight: 700;
    font-size: 16px;
    background: transparent;
    border: 0px;
    cursor: pointer;
`;

const MenuButtonWrapper = styled.div`
    display:none;
    width: 76px;
    @media only screen and (max-width: 800px) {
        display: flex;
        align-items: center;
    }
`;

const MenuButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5em;
    border: 0px;
    background: var(--SOFT_PEALS);
    cursor: pointer;
`;

const BodyWrapper = styled.div`
    width:100%;
    display: flex;
`;

const SidebarWrapper = styled.div`
    width:220px;
    min-width:220px; 
    display:flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 800px) {
        display: none;
    }
`;

const ContentWrapper = styled.div`
    overflow-x:auto;
    width:100%;
    padding-left: 1em;
    padding-right: 1em;
    @media only screen and (min-width: 800px) {
        padding-left: 3em;
        padding-right: 1em;
    }
`;

const MenuItem = styled(Link)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 0.5em 1em;
    margin: 0.7em 0;
    border-radius: 20px;
    &#${props => props.theme.sel}{
        color:  var(--FELT_GREEN);
        background: var(--SOFT_PEALS);
    }
    &:hover {
        color: var(--FELT_GREEN);
        background: var(--SOFT_PEALS);
    }
`;

const MenuText = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`;

const MenuWrapper = styled.div`
    padding-top: 2em;
    width: 100%;
    font-size: 13px;
    color: #444444;
`;

const PostBoxWrapper =styled(Link)`
    position: relative;
`;

const MobileMenuWrapper = styled.div`
    display: none;
    background: white;
    position: absolute;
    width: 100%;
    top: 70px;
    font-size:14px;
    z-index: 100;
    @media only screen and (max-width: 800px) {
        display: ${props => props.theme.display ? 'block' : 'none'};
    }
`;

const MobileMenuItem = styled.li`
    margin: 1em 0em;
    color: #444444;
    &:hover {
        color: var(--FELT_GREEN);
    }
    text-align:center;
`;

const ProfileImage = styled(Image)`
    border-radius: 999px;
`;

const Headline = styled.h1`
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    color: #333333;
    margin-bottom: 1em;
`;


const Unread = styled.div`
    position: absolute;
    font-weight: 900;
    font-size: 10px;
    background: var(--FELT_GREEN);
    border-radius: 1em;
    right: -6px;
    top: -5px;
    padding: 0px 4px;
    color: white;
`;



const Headerbar = ({ children, name, letzterLogin, selected, bildUrl, headline, unread }: WrapperProps) => {

    const [menuState, setMenuState] = useState(false);

    function menuToggle(){
      setMenuState(menuState ? false : true)
    }


return (
    <>
     <HeaderDiv>
        <MenuButtonWrapper><MenuButton onClick={menuToggle}><ProfileImage alt='menu icon' sizes='20px' width={20} height={20} src="/icons/headerbar/menu.svg"/></MenuButton></MenuButtonWrapper>
        <MobileMenuWrapper theme={{display: menuState}} className={nunito.className}>
            <ul>
                <MobileMenuItem key={"dn24nd1"}><Link href="/">zur Startseite</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd2"}><Link href="/account/dashboard/">Dashboard</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd3"}><Link href="/account/zinsplan/">Zins &amp; Tilgung</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd4"}><Link href="/account/projektunterlagen/">Projektunterlagen</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd5"}><Link href="/account/freistellungsauftrag/">Freistellungsaufträge</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd6"}><Link href="/account/persoenliche-daten/">Persönliche Daten</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd7"}><Link href="/account/gutscheine/">Gutscheine &amp; Aktionen</Link></MobileMenuItem>
                <MobileMenuItem key={"dn24nd8"}><Link href="/account/einstellungen">Einstellungen</Link></MobileMenuItem>
            </ul>
        </MobileMenuWrapper>
        <DivLeft>
            <Logo/>
            <Space width={10} disableMobile={800}/>
            <DivLastLogin theme={{ll:letzterLogin}} className={nunito.className}>
                Letzter Login: {letzterLogin}
            </DivLastLogin>
        </DivLeft>
        <DivRight>
            <PostBoxWrapper href="/account/postbox">
                <Unread className={nunito.className}>{unread}</Unread>
                <Image width={25} height={25} src="/icons/account/mail.svg" alt='Mail Icon'/>
            </PostBoxWrapper>
            <Space width={4}/>
            <Button className={nunito.className}>ausloggen</Button>
            <Space width={4}/>
            <ResponsiveImage alt="Profilbild" width='40px' height={'40px'} borderRadius='1000px' objectFit='cover' src={bildUrl ? bildUrl : "/icons/headerbar/profile-img.svg"}/>
        </DivRight>
        <MenuButtonWrapper>
            <PostBoxWrapper href="/account/postbox">
                <Unread className={nunito.className}>{unread}</Unread>
                <Image width={20} height={20} src="/icons/account/mail.svg" alt='Mail Icon'/>
            </PostBoxWrapper>
            <Space width={4}/>
            <MenuButton><Image alt='menu icon' width={20} height={20} src="/icons/headerbar/exit.svg"/></MenuButton></MenuButtonWrapper>
    </HeaderDiv>
    <BodyWrapper className={nunito.className}>
        <SidebarWrapper>
        <ResponsiveImage alt="Profilbild" width='120px' height={'120px'} borderRadius='1000px' objectFit='cover' src={bildUrl ? bildUrl : "/icons/headerbar/profile-img.svg"}/>
            <Space height={5}/>
            <p style={{fontSize:14, color:'#666666'}}>Willkommen zurück,</p>
            <p style={{fontSize:16, fontWeight:700, paddingTop:10, paddingBottom:20, color:'#666666'}}>{name}</p>
            <MenuWrapper>
                <MenuItem href='/' theme={{sel:selected}} key={"dn24nd9"} id="item1">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/icon-menu-home.svg"/>
                    <Space width={4}/>
                    <MenuText>zur Startseite</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/dashboard' key={"dn24nd10"} theme={{sel:selected}} id="item2">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/dashboard.svg"/>
                    <Space width={4}/>
                    <MenuText>Dashboard</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/zinsplan' key={"dn24nd11"} theme={{sel:selected}} id="item3">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/cashlist.svg"/>
                    <Space width={4}/>
                    <MenuText>Zins & Tilgung</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/projektunterlagen' key={"dn24nd12"} theme={{sel:selected}} id="item4">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/documents.svg"/>
                    <Space width={4}/>
                    <MenuText>Projektunterlagen</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/freistellungsauftrag' key={"dn24nd13"} theme={{sel:selected}} id="item5">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/signature.svg"/>
                    <Space width={4}/>
                    <MenuText>Freistellungsaufträge</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/persoenliche-daten' key={"dn24nd14"} theme={{sel:selected}} id="item6">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/user.svg"/>
                    <Space width={4}/>
                    <MenuText>Persönliche Daten</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/gutscheine' key={"dn24nd15"} theme={{sel:selected}} id="item7">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/star.svg"/>
                    <Space width={4}/>
                    <MenuText>Gutscheine & Aktionen</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
                <MenuItem href='/account/einstellungen' key={"dn24nd16"} theme={{sel:selected}} id="item8">
                    <Image alt='menu icon' width={24} height={24} src="/icons/sidebar/settings.svg"/>
                    <Space width={4}/>
                    <MenuText>Einstellungen</MenuText>
                    <Image alt='menu icon' width={7} height={14} src="/icons/sidebar/icon-menu-arrow.svg"/>
                </MenuItem>
            </MenuWrapper>
        </SidebarWrapper>
        <ContentWrapper>
            <Headline className={nunito.className}>{headline}</Headline>
            {children}
        </ContentWrapper>
    </BodyWrapper>
    </>
);
};

export default Headerbar;
