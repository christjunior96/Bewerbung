import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Headerbar from 'components/Organism/account/AccountWrapper';
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import ExemptionOrders from 'components/Organism/account/ExemptionOrders';



export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <AccountWrapper headline='Freistellungsaufträge' selected='item5' name='Herr Diaz Rodriguez' bildUrl='/metzger.jpg' letzterLogin='27.02.2023, 07:45'>
                    <ExemptionOrders itemID={props.itemID}/>
                </AccountWrapper>
            </Section>
        </main>
        </>
    )
    }

export const getServerSideProps: GetServerSideProps = async (context) => {
    const itemID = context.params?.invest;


    return { props: {
        itemID
    } };
}
