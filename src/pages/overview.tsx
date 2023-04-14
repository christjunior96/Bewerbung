import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import cookie from 'cookie';
import styled from "styled-components";
import Headline from 'components/Atom/Headline';
import Text from 'components/Atom/Text';
import Column from 'components/Molecule/Column';
import Row from 'components/Molecule/Row';
import Space from 'components/Atom/Space';
import StyledTextInput from 'components/Molecule/StyledTextInput';
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Section from 'components/Molecule/Section';
import ProjektTile from 'components/Molecule/ProjektTile';
import Link from 'next/link';
import { Nunito_Sans } from '@next/font/google'
import PageSlider from 'components/Organism/public/PageSlider';
import InvestedProjects from 'components/Organism/account/InvestedProjects';

const inter = Nunito_Sans({ subsets: ['latin'], weight:"600" })
const interSub = Nunito_Sans({ subsets: ['latin'], weight:"300" })

const neueEcozins = [
  {"text":"Kundenkonto","url":"/account/dashboard","image":"/tobedeleted/account.png"},
  {"text":"FAQ","url":"/faq","image":"/tobedeleted/faq.png"},
  {"text":"Karriere","url":"/karriere","image":"/tobedeleted/karriere.png"},
  {"text":"Projektfinanzierung","url":"/projektfinanzierung","image":"/tobedeleted/Projektfinanz.png"},
  {"text":"Themenwelten","url":"/themenwelten","image":"/tobedeleted/themenwelten.png"},
]

const whitelabel = [
  {"text":"Rotary","url":"https://giessen-spendet.de","image":"/tobedeleted/rotary.png"},
  {"text":"reon","url":"https://reon-invest.com","image":"/tobedeleted/reon.png"},
  {"text":"GP Joule","url":"https://gpjoule-investcrowd.de","image":"/tobedeleted/gp.png"},
  {"text":"ENERPARC","url":"https://invest.enerparc.de","image":"/tobedeleted/enerparc.png"},
]


const StyledDiv = styled.div`
    width: 100%;
    background: var(--MALDIVES_INTENSE2);
    display: flex;
`;

const StyledLink = styled(Link)`
    font-size: 16px;
    text-align: center;
    color: var(--GOBLIN);
    border: 2px solid var(--BUTTON_BORDER2);
    white-space: nowrap;
    padding: '12px 24px';
    background: var(--VENICE_MINT2);
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 20px;
    font-family: ${interSub};
`;


const Login = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // Setze das Ablaufdatum auf 24 Stunden in die Zukunft
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
    // Setze das Cookie mit dem eingegebenen Passwort
    document.cookie = `password=${password}; path=/; expires=${expires.toUTCString()}`;

    // Leite den Benutzer zur geschützten Seite weiter
    router.push('/overview');
  };

  return (
    <StyledDiv>
        <Column>
        <Space height={10}/>
        <Row justifyContent='center'>
        <ResponsiveImage alt='Louis Christ' src='/tobedeleted/LouisMain.jpg' width='150px' borderRadius='999px'/>
        </Row>
        <Space height={3}/>
        <Headline h={1} small text='Herzlich Willkommen!'/>
        <Space height={5}/>
        <Section backgroundColor='transparent'>
            <Row alignItems='center' rowSpace={10} justifyContent='center' breakMobilePx={500} distanceMobile={5}>
            <Text textAlign='center'>
            Auf dieser Website finden Sie eine Auswahl der Projekte, an denen ich beteiligt war, und erhalten einen Einblick in meine Fähigkeiten und meinen vielseitigen Ansatz zur Problemlösung.<br/>
            Vielen Dank für Ihren Besuch und viel Spaß beim Entdecken von diesem Portfolio!
            </Text>
            </Row>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={5}>
            <Headline h={2} small text='ecozins Relaunch'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Dies ist das letzte Projekt, an dem ich gearbeitet habe. Leider wurde dieses Projekt nie zu Ende Gebracht, dennoch wäre es mein bisher größtes Projekt geworden, daher möchte ich hier zeigen, was bis dahin entstanden ist. Das Projekt wurde ohne ein konventionelles CMS erstellt, stattdessen wurde ein eigenes CMS mit NextJS Entwickelt, um die Themen und Projektseiten zu pflegen.<br/><br/> <strong>Hinweis:</strong> Kundenkonto ist vollständig klickbar!
            </Text>
            <Space height={7}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['NextJS','TypeScript', 'Prisma', 'PostgreSQL', 'Styled Components','JWT Token', 'HTML','CSS']} blue/>
            <PageSlider items={neueEcozins}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={5}>
            <Headline h={2} small text='ecozins Website'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Während meiner Zeit bei der AUDITcapital habe ich die ecozins Website weiterentwickelt. Dazu gehörte das Gestalten und Umsetzen von neuen Seiten, sowie das Erstellen von neuen Funktionen. Die Website wurde mit Wordpress erstellt und ist vollständig responsive. Außerdem habe ich Newsletter-Templates für Cleverreach erstellt.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Wordpress','JavaScript','Cleverreach', 'HTML', 'CSS']} blue/>
            <Space height={5}/>
            <Row sizeEvenly alignItems='center' justifyContent='center' distanceMobile={5} breakMobilePx={820}>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/public.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'https://www.ecozins.de'}>ecozins</StyledLink>
                </Column>
            </Row>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Whitelabel'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Eines meiner ersten Projekte, war die Umsetzung einer Whitelabel-Lösung für die AUDITcapital. Diese Whitelabel-Lösung wurde für verschiedene Kunden erstellt, die alle ihre eigene Domain besitzen. Die Whitelabel-Lösung wurde mit Wordpress erstellt, jedoch wurde kein Template verwendet, sondern die Website wurde von Grund auf neu erstellt nach einer Designvorlage. Die Website ist vollständig responsive und wurde mit dem Divi-Pagebuilder erstellt.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Divi','Wordpress','JavaScript','Cleverreach', 'HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={whitelabel}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Projekte aus meiner Selbstständigkeit'/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Kontakt'/>
        </Section>
        </Column>
    </StyledDiv>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Prüfen, ob das Passwort-Cookie gesetzt ist
    const cookies = cookie.parse(context.req.headers.cookie || '');
    const password = cookies['password'];
  
    if (password != 'louis_bewerbung') {
      // Wenn das Passwort-Cookie gesetzt ist, leite den Benutzer zur geschützten Seite weiter
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    // Wenn das Passwort-Cookie nicht gesetzt ist, zeige die Login-Seite an
    return { props: {} };
  };
