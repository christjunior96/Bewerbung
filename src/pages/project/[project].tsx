import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section';
import AccountWrapper from 'components/Organism/account/AccountWrapper';
import PostboxDetail from 'components/Organism/account/PostBoxDetail';
import { prisma } from 'lib/prisma';
import Headline from 'components/Atom/Headline';
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Button from 'components/Molecule/Button';
import Text from 'components/Atom/Text';
import parse from 'html-react-parser';
import Column from 'components/Molecule/Column';
import { JwtPayload, verify } from "jsonwebtoken";
import Row from 'components/Molecule/Row';
import StyledTextInput from 'components/Molecule/StyledTextInput';
import { useState } from 'react';
import Space from 'components/Atom/Space';
import { NextSeo } from 'next-seo';


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [pwPrev, setPWPrev] = useState("")
    const [checkedPW, setChecked] = useState(false)

    function checkPW (){
        setChecked(pwPrev == props.page.password)
    }

    return (
        <>
        <NextSeo
            title={props.page.title}
            description={props.page.description}
        />
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Section>
                <Column columnSpace={5}>
                    
                    {!props.pw || checkedPW ? props.comp.map((comp: any, index:number) =>{
                        if(comp.type == "Headline"){
                            return <Headline h={comp.headlineType}  key={`Item-${index}`} text={comp.text}/>
                        }
                        else if(comp.type == "Image"){
                            return <ResponsiveImage src={comp.url} key={`Item-${index}`} alt={comp.text} width='100%'/>
                        }
                        else if(comp.type == "Button"){
                            return <Button text={comp.text} key={`Item-${index}`} href={comp.url}/>
                        }
                        else if(comp.type == "Text"){
                            return <Text key={`Item-${index}`}>{parse(comp.text)}</Text>
                        }
                    }) : 
                        <Column alignItems='center' columnSpace={5}>
                            <Space height={10}/>
                            Passwort erforderlich
                            <StyledTextInput onChange={setPWPrev} placeholder='Passwort'/>
                            <Button onClick={checkPW} text='Anzeigen'/>
                        </Column>
                    }
                </Column>
            </Section>
        </main>
        </>
    )
    }

export const getServerSideProps: GetServerSideProps = async (context) => {
        
      return { props: {
        
      } };
}
