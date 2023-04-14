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
import React from 'react';
import MainMenu from 'components/Organism/public/MainMenu';
import cookie from 'cookie';


const res = [{"categoryId":1,"name":"Fragen & Antworten zum Crowdinvesting","faq":[{"faqId":2,"question":"Was ist NextJS?","answer":"NextJS ist ein Framework für React, das Serverseitiges Rendering, statische Generierung und vieles mehr unterstützt.","fAQCategoryCategoryId":1},{"faqId":1,"question":"Wie hoch ist der Mount Everest?","answer":"2023m","fAQCategoryCategoryId":1}]},{"categoryId":2,"name":"Fragen & Antworten zum Vertragsschluss","faq":[{"faqId":3,"question":"Was ist Styled Components?","answer":"Styled Components ist eine Bibliothek für React, mit der Sie Komponenten mit CSS schreiben können.","fAQCategoryCategoryId":2},{"faqId":4,"question":"Wie benutze ich diese Komponente?","answer":"Sie können diese Komponente wie jede <a href=\"/\">andere</a> React-Komponente verwenden. Geben Sie einfach ein Array von Fragen und Antworten als Prop `faqs` an.","fAQCategoryCategoryId":2},{"faqId":5,"question":"Welche Haarfarbe hat Max?","answer":"Blond","fAQCategoryCategoryId":2},{"faqId":6,"question":"Das ist eine Test frage","answer":"test","fAQCategoryCategoryId":2}]}]
const fa = [{"faqId":'2',"question":"Was ist NextJS?","answer":"NextJS ist ein Framework für React, das Serverseitiges Rendering, statische Generierung und vieles mehr unterstützt.","fAQCategoryCategoryId":1},{"faqId":'3',"question":"Was ist Styled Components?","answer":"Styled Components ist eine Bibliothek für React, mit der Sie Komponenten mit CSS schreiben können.","fAQCategoryCategoryId":2},{"faqId":'4',"question":"Wie benutze ich diese Komponente?","answer":"Sie können diese Komponente wie jede <a href=\"/\">andere</a> React-Komponente verwenden. Geben Sie einfach ein Array von Fragen und Antworten als Prop `faqs` an.","fAQCategoryCategoryId":2},{"faqId":'1',"question":"Wie hoch ist der Mount Everest?","answer":"2023m","fAQCategoryCategoryId":1},{"faqId":'5',"question":"Welche Haarfarbe hat Max?","answer":"Blond","fAQCategoryCategoryId":2},{"faqId":'6',"question":"Das ist eine Test frage","answer":"test","fAQCategoryCategoryId":2}]
const cat = [{"categoryId":1,"name":"Fragen & Antworten zum Crowdinvesting"},{"categoryId":2,"name":"Fragen & Antworten zum Vertragsschluss"}]

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    const [openId, setOpenId] = useState("1")

    return (
    <>
        <NextSeo
        title='FAQ'
        description=
        "Hier finden Sie häufig gestellte Fragen zu unserer Plattform!"
        />
        
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <MainMenu/>
        <Header headline='FAQ' imageAlt='Alt' subtext='Häufig gestellte Fragen' image={"/headerImages/faq.svg"}>
          <FAQSearch openId={setOpenId} faqs={fa} cats={cat} searchWord='Komponente'/>
        </Header>

        <Section sectionSpace={5}>
            <Column>
            {res.map((item: any,index:number) => {
              return (
                <React.Fragment key={`FaqItem-${index}`}>
                  <Headline h={3} color='--FELT_GREEN' text={item.name} small textAlign='left' underline/>
                  <FAQ openIdFun={setOpenId} openId={openId} faqs={item.faq} />
                  <Space height={10}/>
                </React.Fragment>
              );
            })

            }
            </Column>
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
        destination: '/loginPortfolio',
        permanent: false,
      },
    };
  }

  // Wenn das Passwort-Cookie nicht gesetzt ist, zeige die Login-Seite an
  return { props: {} };
};

