import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import DataForm from 'components/Organism/account/UserDataForm';



export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper headline='Persönliche Daten' selected='item6' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <DataForm IBAN='NL44RABO9338068110' TaxID='123123' birthCity='Marburg' birthDate={new Date(1996,2,8)} city='Wetzlar' country='Deutschland' firstName='Louis' gender='Herr' lastName='Christ' phone='01739409404' plz='35315' registerDate='23.01.2023' street='Kastanienweg 25' username='kunde@ecozins.de' BIC='dnwendwin' addressAddition='' imageUrl='/metzger.jpg' title='Dr'/>
                </AccountWrapper>
            </Section>
        </main>
        </>
    )
    }

export const getServerSideProps: GetServerSideProps = async (context) => {
// Holt sich die Cookies aus dem request

    return { props: {} };
}
