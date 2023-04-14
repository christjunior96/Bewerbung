import Head from 'next/head'
import Row from 'components/Molecule/Row'
import Column from 'components/Molecule/Column'
import Headline from 'components/Atom/Headline'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section'
import { NextSeo } from 'next-seo'
import 'react-quill/dist/quill.snow.css'
import FAQ from 'components/Organism/public/FAQ'
import { prisma } from 'lib/prisma';
import FAQSearch from 'components/Organism/public/FAQSearch';
import Space from 'components/Atom/Space';
import { useState } from 'react';
import Header from 'components/Organism/public/Header';
import Button from 'components/Molecule/Button';
import Text from 'components/Atom/Text';
import LogoSliderProjects from 'components/Organism/public/LogoSliderProjects';
import CarrierGrid from 'components/Organism/public/CarrierGrid';
import ProjectFinanceAdvantages from 'components/Organism/public/ProjectFinanceAdvantages';
import ListItem from 'components/Organism/public/List';
import NumberSlider from 'components/Organism/public/NumberSlider';
import ProjectFinanceForm from 'components/Organism/public/ProjectFinanceForm';
import MainMenu from 'components/Organism/public/MainMenu';
import { useRouter } from 'next/router';
import cookie from 'cookie';


const gridContent = [
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
    {
        "text": "Mitarbeiter Event",
        "image": "/logos/kununu.jpg"
    },
]

const numberSlider = [
    {
        "number": "1.411",
        "text": "registrierte Nutzer"
    },
    {
        "number": "4.920.600",
        "text": "Euro investiertes Kapital"
    },
    {
        "number": "1.735",
        "text": "Investoren"
    },
    {
        "number": "1.928",
        "text": "Ausgedachte Zahl"
    },
]

const res = [{"logoUrl":"/logos/logo3.svg"},{"logoUrl":"/logos/logo2.svg"},{"logoUrl":"/logos/logo1.svg"},{"logoUrl":"/logos/logo1.svg"},{"logoUrl":"/logos/logo2.svg"}]

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    

    return (
    <>
        <NextSeo
        title='Projekte finanzieren | ecozins'
        description=
        "Hier finden Sie häufig gestellte Fragen zu unserer Plattform!"
        />
        
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>

        <MainMenu/>
          
        <Header headline='Projekte finanzieren' subtext='' imageAlt='Projektfinanzierung Alt Text' image={"/headerImages/projectfinance.svg"}>
            <Space height={12}/>
          <Button text='Zum Projektfinanzierungsrechner' href='#projekt'/>
        </Header>

        <Section sectionSpace={5}>
            <Column columnSpace={3}>
            <Headline textAlign='left' text='Kapital für Ihre nachhaltigen Projekte' h={1}/>
            <Text>Mit ecozins als Unternehmen ganz einfach nachhaltige Projekte oder Vorhaben über die crowd finanzieren!</Text>
            </Column>
        </Section>

        <Space height={30} disableMobile={800}/>

        <ProjectFinanceAdvantages/>

        <Section sectionSpace={10}>
            <LogoSliderProjects items={res}/>
        </Section>

        <Section backgroundColor='--MALDIVES' sectionSpace={15} id='projekt'>
            <Headline logo text='Projektfinanzierung anfragen in 3 Schritten!' h={3} textAlign='left' small/>
            <Headline text='Ihre individuelle Finanzierungslösung mit ecozins' h={3} textAlign='left' small/>
            <Space height={5}/>
            <Text>Für Kapital zwischen 50.000 Euro und 6 Mio. Euro.</Text>
            <Space height={10}/>
            <ProjectFinanceForm />
            <Space height={10}/>
            <NumberSlider items={numberSlider}/>
        </Section>

        <Section sectionSpace={25}>
            <Headline  h={2} text="Zahlen, Daten Fakten zu ecozins" textAlign='left'/>
            <Space height={10}/>
            <CarrierGrid items={gridContent}/>
            <Space height={10}/>
            <Button text='Zum Projektfinanzierungsrechner' href='#projekt'/>
        </Section>

        <Section backgroundColor='--MALDIVES' sectionSpace={20} displayLogo>
            <Headline  h={3} text="Warum Sie Ihre Finanzierung mit ecozins anstreben sollten" small textAlign='left'/>
            <Space height={10}/>
            <ListItem color='--GOBLIN' text={['Das ist ein Text','Das ist der Zweite','Das ist der dritte','Das ist ein sehr sehr sehr sehr sehr sehr sehr sehr sehr langer vierter']} />
            <Space height={15}/>
            <Row>
                <Button text='Zum Projektfinanzierungsrechner' href='#projekt' />
            </Row>
        </Section>
        
        </main>
    </>
    )
}


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