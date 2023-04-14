import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import InterestPlan from 'components/Organism/account/InterestPlan';
import PostboxOverview from 'components/Organism/account/PostBoxOverview';
import cookie from 'cookie';

const text = [
    {
        "betreff": "Meeting-Erinnerung",
        "nachrichtentext": "Hallo Team, wir erinnern daran, dass wir morgen um 10 Uhr ein Meeting haben.",
        "datum": "2022-03-15",
        "uhrzeit": "10:00",
        "read": true,
        "anhaenge": [
        ["https://example.com/anhang1.pdf","Anhang 1"],
        ["https://example.com/anhang2.jpg","Anhang 2"]
        ]
    },
    {
        "betreff": "Änderungen am Urlaubsantrag",
        "nachrichtentext": "Liebe Mitarbeiterinnen <a>und Mitarbeiter</a>, aufgrund einer Änderung der Personalrichtlinien müssen wir ab sofort Urlaubsanträge mindestens zwei Wochen im Voraus genehmigen. Bitte beachten Sie dies bei zukünftigen Urlaubsanträgen.",
        "datum": "2022-03-12",
        "uhrzeit": "15:30",
        "read":false,
        "anhaenge": []
    },
    {
        "betreff": "Frohe Feiertage!",
        "nachrichtentext": "Liebe Kolleginnen und Kollegen, wir wünschen Ihnen und Ihren Familien frohe Feiertage und einen guten Rutsch ins neue Jahr!",
        "datum": "2021-12-24",
        "uhrzeit": "12:00",
        "read":false,
        "anhaenge": [
        ["https://example.com/weihnachtsgruss.jpg","Anhang 3"]
        ]
    }
]
    



export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper unread={3} headline='Posteingang' selected='' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <PostboxOverview nachrichten={text}/>
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
