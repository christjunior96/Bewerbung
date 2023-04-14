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
                    
                    {!props.pw || checkedPW ? props.comp.map((comp: any) =>{
                        if(comp.type == "Headline"){
                            return <Headline h={comp.headlineType} text={comp.text}/>
                        }
                        else if(comp.type == "Image"){
                            return <ResponsiveImage src={comp.url} alt={comp.text} width='100%'/>
                        }
                        else if(comp.type == "Button"){
                            return <Button text={comp.text} href={comp.url}/>
                        }
                        else if(comp.type == "Text"){
                            return <Text>{parse(comp.text)}</Text>
                        }
                        else{
                            return "Fehler"
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

    const projectLink = context.params?.project;
    const link = projectLink ? projectLink : 'Hallo'
    var pw = false;

    const page = await prisma.page.findUnique({
        where:{
            link: link.toString(),
        },
    })

    if (page == null){
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
          };
    }

    if (page.type != 'Project'){
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
          };
    }

    const date = page?.published_at?.getTime() ? page?.published_at?.getTime() : 0;

    //Prüfen ob Admin oder ob ein passwort gesetzt werden muss

    if(date > Date.now()){
        pw = true;
        interface JwtPayload {
            role: string;
        }
    
        // Holt sich die Cookies aus dem request
        var authCookie = context.req.cookies.auth || null;
        let decodedId;
        let role;
        let userData;
    
        console.log("authCookie :: " + authCookie);
        // Überprüfung ob Cookie gültig ist
        verify(authCookie ? authCookie : 'leer', process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            decodedId = decoded.sub;
            role = decoded as JwtPayload;
            role = role.role
            console.log("decodedId " + decodedId);
            console.log("role: " + role);
        } else {
            console.log("keine authentifizierung vorhanden");
        }
        });
    
        if (role == 0) {
            console.log("Admin, grant access")
            pw = false;
        }
    }

    const components = await prisma.component.findMany({
        where:{
            pageId: page?.id
        },
        orderBy:{
            order: 'asc'
        }
    })

        
      return { props: {
        page : JSON.parse(JSON.stringify(page)),
        comp : JSON.parse(JSON.stringify(components)),
        pw: pw,
      } };
}
