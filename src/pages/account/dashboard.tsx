import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import Column from 'components/Molecule/Column';
import InvestedProjects from 'components/Organism/account/InvestedProjects';
import ActiveCapital from 'components/Organism/account/ActiveCapital';
import Row from 'components/Molecule/Row';
import Invests from 'components/Organism/account/Invests';
import { useState } from 'react';
import Chart from 'components/Organism/account/Chart';
import cookie from 'cookie';


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper headline='Dashboad' unread={5} selected='item2' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                   <Column key={'fbiwbf'} columnSpace={10}>
                    <Row key={'conwnc'} sizeEvenly rowSpace={20} breakMobilePx={600} distanceMobile={10}>
                        <InvestedProjects key={'fnsoufn'} projects={['Winpark Bad Nauheim','Windpark 4', 'Solaranlage 5', 'Solaranlage 5']}></InvestedProjects>
                        <ActiveCapital active={1000} payedBack={300} sum={1300}/>
                    </Row>
                    <Chart/>
                    <Row key={'onwinc'} sizeEvenly>
                        <Invests/>
                    </Row>
                   </Column>
                </AccountWrapper>
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
