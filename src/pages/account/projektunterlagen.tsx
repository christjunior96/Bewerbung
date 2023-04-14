import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import Documents from 'components/Organism/account/Documents';
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
                <AccountWrapper headline='Projektunterlagen' selected='item4' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <Documents date={new Date(2021,5,21)} documents={[['name',"link"],['name',"link"]]} fundingThreshold={350000} image='/metzger.jpg' interest={5} name='Solarkraft Tangerland III' projectURL='/' value={15000} volume={1000000}  />
                    <Documents date={new Date(2021,5,21)} documents={[['name',"link"],['name',"link"]]} fundingThreshold={350000} image='/metzger.jpg' interest={5} name='Solarkraft Tangerland III' projectURL='/' value={15000} volume={1000000}  />
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