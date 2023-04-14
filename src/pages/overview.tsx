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

const inter = Nunito_Sans({ subsets: ['latin'], weight:"600" })
const interSub = Nunito_Sans({ subsets: ['latin'], weight:"300" })

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
        <Headline h={1} small text='Herzlich Willkommen!'/>
        <Space height={5}/>
        <Section backgroundColor='transparent'>
            <Row alignItems='center' rowSpace={10}>
            <ResponsiveImage alt='Louis Christ' src='/tobedeleted/LouisMain.jpg' width='150px' borderRadius='999px'/>
            <Text textAlign='left'>
            Auf dieser Website finden Sie eine Auswahl der Projekte, an denen ich beteiligt war, und erhalten einen Einblick in meine Fähigkeiten und meinen vielseitigen Ansatz zur Problemlösung.<br/>
            Vielen Dank für Ihren Besuch und viel Spaß beim Entdecken von diesem Portfolio!
            </Text>
            </Row>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Relaunch'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Dies ist das letzte Projekt, an dem ich gearbeitet habe. Leider wurde dieses Projekt nie zu Ende Gebracht, dennoch wäre es mein bisher größtes Projekt geworden, daher möchte ich hier zeigen, was bis dahin entstanden ist.
            </Text>
            <Row sizeEvenly alignItems='center' justifyContent='center' distanceMobile={5}  rowSpace={5} breakMobilePx={820}>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/faq.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'/faq'}>FAQ</StyledLink>
                </Column>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/karriere.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'/karriere'}>Karriere</StyledLink>
                </Column>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/Projektfinanz.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'/projektfinanzierung'}>Projektfinanzierung</StyledLink>
                </Column>
            </Row>
            <Space height={5}/>
            <Row sizeEvenly alignItems='center' justifyContent='center' distanceMobile={5} breakMobilePx={820}>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/themenwelten.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'/themenwelten'}>Themenwelten</StyledLink>
                </Column>
                <Column alignItems='center' columnSpace={4}>
                <ResponsiveImage alt={'FAQ'} src={'/tobedeleted/account.png'} width="250px" height="180px" borderRadius="2em" />
                <StyledLink className={interSub.className} href={'/account/dashboard'}>Kundenkonto</StyledLink>
                </Column>
            </Row>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Website'/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Whitelabel'/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Projekte aus meiner Selbstständigkeit'/>
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
          destination: '/loginPortfolio',
          permanent: false,
        },
      };
    }
  
    // Wenn das Passwort-Cookie nicht gesetzt ist, zeige die Login-Seite an
    return { props: {} };
  };
