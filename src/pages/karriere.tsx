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
import Text from 'components/Atom/Text';
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import CarrierGrid from 'components/Organism/public/CarrierGrid';
import CarrierSticky from 'components/Organism/public/CarrierStickyBottom';
import JobOffers from 'components/Organism/public/JobOffers';
import ImageGrid from 'components/Organism/public/ImageGrid';
import StaffSlider from 'components/Organism/public/StaffSlider';
import Header from 'components/Organism/public/Header';
import Button from 'components/Molecule/Button';
import MainMenu from 'components/Organism/public/MainMenu';
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

const res = [{"personId":1,"name":"Kenan","title":"Softwareentwickler","image":"/metzger.jpg"},{"personId":2,"name":"Louis","title":"Marketing","image":"/louis.jpg"}]
const worker = {"personId":1,"name":"Kenan","title":"Softwareentwickler","image":"/metzger.jpg"}
const offers = [{"jobId":1,"link":"https://example.com/anhang1.pdf","name":"Werkstudent (m/w/d) Social Media Marketing & Kommunikation"},{"jobId":2,"link":"https://example.com/anhang1.pdf","name":"Werkstudent (m/w/d) Softwareentwicklung"}]
const employees = [{"employeeId":1,"name":"Louis Christ","text":"Das Wetter war heute sonnig und warm. Viele Menschen waren draußen unterwegs, um die frische Luft und die angenehmen Temperaturen zu genießen. Die Parks und Straßencafés waren gut besucht und es herrschte eine angenehme Stimmung. Die ersten Frühlingsboten zeigten sich bereits und die Vorfreude auf die kommende Jahreszeit war deutlich spürbar.","image":"/tobedeleted/louis1.JPG"},{"employeeId":2,"name":"Marcel Diaz","text":"Die Welt der Technologie entwickelt sich ständig weiter. Immer wieder gibt es neue Entwicklungen und Innovationen, die unser Leben erleichtern und bereichern. Von Smartphones über autonome Autos bis hin zu künstlicher Intelligenz - die Möglichkeiten sind grenzenlos. Die Herausforderung besteht darin, diese Technologien sinnvoll einzusetzen und ihre Auswirkungen auf die Gesellschaft und die Umwelt zu berücksichtigen.","image":"/tobedeleted/louis2.JPG"},{"employeeId":3,"name":"Tim Weinel","text":"Sport und Bewegung sind wichtige Bestandteile eines gesunden Lebensstils. Regelmäßige körperliche Aktivität trägt nicht nur zur körperlichen Fitness bei, sondern auch zur geistigen Gesundheit und zum Wohlbefinden. Ob Joggen, Radfahren, Schwimmen oder Yoga - es gibt unzählige Möglichkeiten, sich sportlich zu betätigen. Wichtig ist dabei vor allem, eine Aktivität zu finden, die Spaß macht und regelmäßig ausgeübt werden kann.","image":"/tobedeleted/louis3.JPG"},{"employeeId":4,"name":"Michael Gresse","text":"Die Sonne scheint und ich genieße den Tag im Park. Ich spüre den warmen Sand zwischen meinen Zehen und höre das fröhliche Zwitschern der Vögel. Es gibt nichts Schöneres, als die Natur zu erleben und sich von ihr inspirieren zu lassen. Ich lasse den Alltag hinter mir und lasse mich einfach treiben.","image":"/tobedeleted/louis4.JPG"},{"employeeId":5,"name":"Jasmin Kappler","text":"Das Leben ist eine Reise voller Herausforderungen und Möglichkeiten. Jeder Tag bietet neue Chancen, um zu wachsen und sich weiterzuentwickeln. Obwohl es manchmal schwierig sein kann, sich zu motivieren, lohnt es sich, hart zu arbeiten und seinen Träumen zu folgen. Denn am Ende wird man mit Erfolg und Zufriedenheit belohnt.","image":"/tobedeleted/louis5.JPG"}]

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    

    return (
    <>
        <NextSeo
        title='Karriere'
        description=
        "Hier finden Sie alle unsere offenen Stellen!"
        />
        
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <MainMenu/>
        <Header headline='Karriere' imageAlt='Alt' subtext='bei ecozins' image={"/headerImages/placeholder.svg"}>
                <Button text='Zu den Stellenangeboten' href='#offers' />
        </Header>

        <Section sectionSpace={5}>
            <Headline  h={2} text="Wir wollen das Du den Weg mit uns gehst!" textAlign='left'/>
            <Space height={5}/>
            <Text textAlign='left' color='--BLACK'>Große Visionen brauchen großartige Ideen, deshalb möchten wir unser Team gerne erweitern. Du hast Lust deine Ideen und dein Knowhow in einem innovativen und zukunftsorientierten Team umzusetzen? Du hast keine Angst davor auch über den Tellerrand hinauszublicken und bist bereit selbst herauszufinden wie dein Spezialgebiet unser Unternehmen weiterbringen kann? Dann bewirb dich bei uns!</Text>
        </Section>

        <Space height={10}/>

        <Section backgroundColor='--KUNUNU' sectionSpace={4}>
            <Row justifyContent='space-between' alignItems='center' rowSpace={15} breakMobilePx={600} distanceMobile={5}>
                <ResponsiveImage width='143px' alt='Kununu' src='/logos/kununu.jpg'/>
                <Text italic color='--BLACK'>Ich schätze an ecozins die Kollegen, flachen Hierarchien und die Wertschätzung und Förderung meiner Fähigkeiten! - <strong>Max Mustermann</strong> </Text>
            </Row>
        </Section>

        <Space height={10}/>

        <Section sectionSpace={5}>
            <Text textAlign='left' color='--BLACK'>Als junges und dynamisches Fintech aus Marburg wollen wir die Energiewende vorantreiben und Finanzen neu denken. Unsere Aufgabe ist es nachhaltige Projekte aus dem Bereich der Erneuerbaren Energien, der E-Mobilität und der Steigerung der Energieeffizienz mit verantwortungsbewussten Investoren zusammenzubringen. Dafür entwickeln wir technische Lösungen und setzen uns für ein nachhaltigeres Finanzbewusstsein ein.</Text>
        </Section>

        <Space height={10}/>

        <Section sectionSpace={5}>
            <Headline  h={2} text="Warum sich bei uns alle pudelwohl fühlen" textAlign='left'/>
            <Space height={10}/>
            <CarrierGrid items={gridContent}/>
        </Section>

        <Space height={10}/>

        <Section sectionSpace={5} id='collegues'>
            <Headline  h={2} text="Dürfen wir uns schonmal kurz vorstellen?" textAlign='left'/>
            <Space height={5}/>
            <Text textAlign='left' color='--BLACK'>Wir freuen uns, dass du Interesse an unserem Team hast und wollen dich unbedingt kennenlernen! Wir stellen uns schonmal kurz vor.</Text>
        </Section>
        
        <Space height={10}/>
        
        <StaffSlider items={employees}/>

        <Space height={10}/>

        <Section id='offers' sectionSpace={5}>
            <Headline  h={2} text="Stellenangebote" textAlign='left'/>
            <Space height={5}/>
            <Text textAlign='left' color='--BLACK'>Hier finden Sie unsere aktuellen Stellenangebote</Text>
            <Space height={5}/>
            <JobOffers items={offers}/>
        </Section>

        <Space height={10}/>

        <Section id='pictures'> </Section> 
            <ImageGrid/>
       

        <Space height={10}/>

        <CarrierSticky image={worker.image} name={worker.name} title={worker.title}/> 
        
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

