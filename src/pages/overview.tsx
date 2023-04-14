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
  {"text":"Reon","url":"https://reon-invest.com","image":"/tobedeleted/reon.png"},
  {"text":"GP Joule","url":"https://gpjoule-investcrowd.de","image":"/tobedeleted/gp.png"},
  {"text":"ENERPARC","url":"https://invest.enerparc.de","image":"/tobedeleted/enerparc.png"},
]

const selbstst = [
  {"text":"Metzgerei Christ","url":"https://lieblingsmetzgerei.de","image":"/tobedeleted/metzgerei.png"},
  {"text":"somack","url":"https://www.somack.de","image":"/tobedeleted/somack.png"},
  {"text":"Elektrobau Römer","url":"https://www.elektrobau-roemer.de","image":"/tobedeleted/romer.png"},
]

const ez = [
  {"text":"ecozins","url":"https://www.ecozins.de","image":"/tobedeleted/public.png"},
  {"text":"Newsletter","url":"/template.html","image":"/tobedeleted/template.png"},
]

const unterlagen = [
  {"text":"Lebenslauf","url":"/Lebenslauf.pdf","image":"/tobedeleted/lebenslauf.png"},
  {"text":"Zertifikat Flutter","url":"/Zertifikat-Flutter.pdf","image":"/tobedeleted/flutter.png"},
  {"text":"Zertifikat Websecurity","url":"/Zertifikat-Websecurity.pdf","image":"/tobedeleted/security.png"},
  {"text":"Zertifikat SAP","url":"/Zertifikat-SAP.pdf","image":"/tobedeleted/sap.png"},
]


const StyledDiv = styled.div`
    width: 100%;
    background: var(--MALDIVES_INTENSE2);
    display: flex;
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
        <Headline h={1} small text='Herzlich willkommen!'/>
        <Space height={5}/>
        <Section backgroundColor='transparent'>
            <Row alignItems='center' rowSpace={10} justifyContent='center' breakMobilePx={500} distanceMobile={5}>
            <Text textAlign='center'>
            Auf dieser Website finden Sie eine Auswahl der Projekte, an denen ich beteiligt war und erhalten einen Einblick in meine Fähigkeiten und meinem vielseitigen Ansatz zur Problemlösung.<br/>
            Vielen Dank für Ihren Besuch und viel Spaß beim Entdecken von diesem Portfolio!
            </Text>
            </Row>
        </Section>
        <Space height={10}/>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Relaunch'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Dies ist das letzte Projekt, an dem ich gearbeitet habe. Leider wurde dieses Projekt nie zu Ende gebracht, dennoch wäre es mein bisher größtes Projekt geworden, daher möchte ich hier zeigen, was bis dahin entstanden ist. Das Projekt wurde ohne ein konventionelles CMS erstellt, stattdessen wurde ein eigenes CMS mit NextJS entwickelt, um die Themen und Projektseiten zu pflegen.<br/><br/> <strong>Hinweis:</strong> Kundenkonto ist vollständig klickbar!
            </Text>
            <Space height={7}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['NextJS','TypeScript', 'Prisma', 'PostgreSQL', 'Styled Components','JWT Token', 'HTML','CSS']} blue/>
            <PageSlider items={neueEcozins}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Website'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Während meiner Zeit bei der AUDITcapital habe ich die ecozins Website weiterentwickelt. Dazu gehörte das Gestalten und Umsetzen von neuen Seiten, sowie das Erstellen von neuen Funktionen. Die Website wurde mit Wordpress erstellt und ist vollständig responsive. Außerdem habe ich <Link href={'/template.html'}>Newsletter-Templates</Link> für Cleverreach erstellt.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Wordpress','JavaScript','Cleverreach', 'HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={ez}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Whitelabel'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Eines meiner ersten Projekte war die Umsetzung einer Whitelabel-Lösung für die AUDITcapital. Diese Whitelabel-Lösung wurde für verschiedene Kunden erstellt, die alle ihre eigene Domain besitzen. Die Whitelabel-Lösung wurde mit Wordpress erstellt, jedoch ohne Template, sie ist von Grund auf neu programmiert nach einer Designvorlage. Die Website ist vollständig responsive und wurde mit dem Divi-Pagebuilder erstellt.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Divi','Wordpress','JavaScript','Cleverreach', 'HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={whitelabel}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Projekte aus meiner Selbstständigkeit'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Während meines Studiums habe ich ein Kleingewerbe eröffnet und verschiedene Webdesign-Projekte für Kunden umgesetzt. Diese Projekte sind alle mit Wordpress erstellt worden, teilweise mit Divi als Eigenentwicklung, teilweise mit einem Template.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Divi','Wordpress','HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={selbstst}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Unterlagen'/>
            <Space height={5}/>
            <PageSlider items={unterlagen}/>
        </Section>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Kontakt'/>
            <Space height={5}/>
            <Column>
              <Row justifyContent='center'>
                <Text><strong>Tel:</strong> +49 (0) 173 940 940 4</Text>
              </Row>
              <Row justifyContent='center'>
                <Text><strong>E-Mail:</strong> <Link href={'mailto:l.christ.bewerbung@gmail.com'}>l.christ.bewerbung@gmail.com</Link></Text>
              </Row>
            </Column>
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
