import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import Voucher from 'components/Organism/account/Voucher';



export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper headline='Gutscheine & Aktionen' selected='item7' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <Voucher fav='HBD51' codes={[["HBD50","-"],["HBD51","01.06.2020"],["HBD52","01.06.2020"],["HBD53","01.06.2020"]]}/>
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
