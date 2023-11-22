import { useState, FormEvent, useEffect } from 'react';
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
import AnimatedHeadline from 'components/Atom/AnimatedHeadline';
import VisibilitySensor from "react-visibility-sensor";
import { motion, useAnimation } from "framer-motion";
import Navbar from 'components/Organism/public/Navbar';
import ScrollAnimation from 'components/Atom/ScrollAnimation';



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
  
  {"text":"Zertifikat Flutter","url":"/Zertifikat-Flutter.pdf","image":"/tobedeleted/flutter.png"},
  {"text":"Zertifikat Websecurity","url":"/Zertifikat-Websecurity.pdf","image":"/tobedeleted/security.png"},
  {"text":"Zertifikat SAP","url":"/Zertifikat-SAP.pdf","image":"/tobedeleted/sap.png"},
]

const arbeitszeugnis = [
  {"text":"AUDITcapital","url":"/Arbeitszeugnis_AUDITcapital.pdf","image":"/tobedeleted/audit.png"},
  {"text":"tripuls","url":"/AZ_tripuls.pdf","image":"/tobedeleted/tp.png"},
]

const lebenslauf = [ {"text":"Deutsch","url":"/Lebenslauf.pdf","image":"/tobedeleted/lebenslauf.png"},
                    {"text":"Englisch","url":"/Lebenslauf_EN.pdf","image":"/tobedeleted/lebenslauf.png"},]


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

  const transition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  return (
    <>
    <Navbar/>
    <StyledDiv>
        <Column>
        <Space height={10}/>
        <ScrollAnimation>
        <Row justifyContent='center'>
        <motion.div
        whileTap={{scale: 0.9, rotate: 10}}
        whileHover={{ scale: 1.1 }}
        transition={transition}>
        <ResponsiveImage priority alt='Louis Christ' src='/tobedeleted/LouisMain.jpg' width='150px' borderRadius='999px'/>
        </motion.div>
        </Row>
        </ScrollAnimation>
        <Space height={3}/>
        <ScrollAnimation><AnimatedHeadline text='Willkommen!'/></ScrollAnimation>
        <Space height={5}/>
        <ScrollAnimation>
        <Section backgroundColor='transparent'>
            <Row alignItems='center' rowSpace={10} justifyContent='center' breakMobilePx={500} distanceMobile={5}>
            <Text textAlign='center'>
            Auf dieser Website finden Sie eine Auswahl der Projekte, an denen ich beteiligt war und erhalten einen Einblick in meine Fähigkeiten und meinem vielseitigen Ansatz zur Problemlösung.<br/>
            Vielen Dank für Ihren Besuch und viel Spaß beim Entdecken von diesem Portfolio!
            </Text>
            </Row>
        </Section>
        </ScrollAnimation>
        <Space height={10}/>
        <ScrollAnimation>
        <ScrollAnimation>
        <Space height={5}/>
        <Section backgroundColor='transparent'>
            <Headline h={2} small text='RYZE Digital'/>
            <InvestedProjects projects={['HTML','CSS','SCSS', 'Zeplin', 'JavaScript', 'ecoma']} blue/>
            <Space height={4} />
            <Text textAlign='center'>
            RYZE Digital, eine mittelständische Agentur mit Sitz in Darmstadt, bot mir die Möglichkeit, an verschiedenen Webprojekten für namhafte Unternehmen mitzuwirken. Meine Tätigkeiten umfassten sowohl die Wartung als auch die komplette Neuentwicklung dieser Projekte. Durch die Unterstützung eines erfahrenen Mentors konnte ich meine Fähigkeiten in HTML5, SCSS/CSS und JavaScript erheblich erweitern und auf ein höheres Niveau bringen.            </Text>
        </Section>
        </ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Relaunch'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Leider wurde dieses Projekt nie abgeschlossen, dennoch hätte es mein bisher größtes Vorhaben bis dahin werden können. Ich möchte daher hier präsentieren, was bis zu diesem Zeitpunkt entstanden ist. Anstatt ein konventionelles CMS zu nutzen, wurde ein eigenes CMS mit NextJS entwickelt, um die Themen und Projektseiten zu verwalten.
            <br/><br/>
            <strong>Hinweis:</strong> Das Kundenkonto ist vollständig klickbar!            
            </Text>
            <Space height={7}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['NextJS','TypeScript', 'Prisma', 'PostgreSQL', 'Styled Components','JWT Token', 'HTML','CSS','figma']} blue/>
            <PageSlider items={neueEcozins}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='ecozins Website'/>
            <Space height={5}/>
            <Text textAlign='center'>
              Während meiner Tätigkeit bei der AUDITcapital war ich für die kontinuierliche Weiterentwicklung der ecozins-Website verantwortlich. Dies umfasste das Design und die Implementierung neuer Seiten sowie die Schaffung zusätzlicher Funktionen. Die Website wurde unter Verwendung von WordPress erstellt und ist vollständig responsiv gestaltet. Darüber hinaus habe ich <Link href={'/template.html'}>Newsletter-Templates</Link> für Cleverreach entwickelt.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['WordPress','JavaScript','Cleverreach', 'HTML', 'CSS', 'Photoshop']} blue/>
            <Space height={5}/>
            <PageSlider items={ez}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Whitelabel'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Eines meiner frühen Projekte war die Realisierung einer Whitelabel-Lösung für AUDITcapital. Diese Lösung wurde für verschiedene Kunden entwickelt, die jeweils über ihre eigene Domain verfügen. Die Whitelabel-Lösung basiert auf WordPress, jedoch ohne vorgefertigtes Template, sondern wurde komplett neu programmiert, basierend auf einer Designvorlage. Die Webseiten sind vollständig responsiv und wurde mit Hilfe des Divi-Pagebuilders erstellt.            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Divi','WordPress','JavaScript','Cleverreach', 'HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={whitelabel}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Projekte aus meiner Selbstständigkeit'/>
            <Space height={5}/>
            <Text textAlign='center'>
            Während meines Studiums gründete ich ein Kleingewerbe und führte verschiedene Webdesign-Projekte für Kunden durch. Diese Projekte wurden alle mit WordPress realisiert, wobei teilweise Divi für individuelle Entwicklungen und teilweise vorgefertigte Templates verwendet wurden.
            </Text>
            <Space height={5}/>
            <Headline h={3} small text='Verwendete Tools'/>
            <InvestedProjects projects={['Divi','WordPress','HTML', 'CSS']} blue/>
            <Space height={5}/>
            <PageSlider items={selbstst}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' id='Lebenslauf' sectionSpace={10}>
            <Headline h={2} small text='Lebenslauf'/>
            <Space height={5}/>
            <PageSlider items={lebenslauf}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Arbeitszeugnisse'/>
            <Space height={5}/>
            <PageSlider items={arbeitszeugnis}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' sectionSpace={10}>
            <Headline h={2} small text='Zertifikate'/>
            <Space height={5}/>
            <PageSlider items={unterlagen}/>
        </Section>
        </ScrollAnimation>
        <ScrollAnimation>
        <Section backgroundColor='transparent' id='Kontakt' sectionSpace={10}>
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
        </ScrollAnimation>
        </Column>
    </StyledDiv>
    </>
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
