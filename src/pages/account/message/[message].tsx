import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import PostboxDetail from 'components/Organism/account/PostBoxDetail';
import cookie from 'cookie';

const text = 
    {
        "betreff": "Meeting-Erinnerung",
        "nachrichtentext": "Hallo Team, wir <a href='/account/postbox'>erinnern</a> daran, dass wir morgen um 10 Uhr ein Meeting haben.",
        "datum": "2022-03-15",
        "uhrzeit": "10:00",
        "read": true,
        "anhaenge": [
        ["https://example.com/anhang1.pdf", "Anhang1"],
        ["https://example.com/anhang2.jpg","DasIstEinLangerAnhang.pdf"]
        ]
    }


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper headline='Posteingang' selected='' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <PostboxDetail anhaenge={text.anhaenge} betreff={text.betreff} datum={text.datum} nachrichtentext={text.nachrichtentext} uhrzeit={text.uhrzeit}/>
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