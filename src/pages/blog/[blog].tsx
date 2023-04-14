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
import BlogHeader from 'components/Organism/public/BlogHeader';
import InfoBox from 'components/Molecule/InfoBox';
import ListItem from 'components/Organism/public/List';
import BlogTile from 'components/Organism/public/BlogTile';
import ProtectedContent from 'components/Organism/public/ProtectedContent';
import React from 'react';


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
            <ProtectedContent mainImage={props.page.image} img1={props.ilength >= 1 ? props.images[0].image : props.page.image} img2={props.ilength >= 2 ?  props.images[1].image : props.page.image} img3={props.iLength >= 3 ?  props.images[2].image : props.page.image} img4={props.ilength >= 4 ?  props.images[3].image : props.page.image} img5={props.ilength >= 5 ?  props.images[4].image : props.page.image} img6={props.ilength >= 6 ?  props.images[5].image : props.page.image} isLoggedIn={props.auth} >
                <Column columnSpace={5}>
                {!props.pw || checkedPW ? <BlogHeader headline={props.page.title} subline={props.page.subtitle} image={props.page.image} imageAlt={props.page.imageAlt} time={props.page.readMinutes} /> : null}
                    
                    {!props.pw || checkedPW ? props.comp.map((comp: any, index: number) =>{
                        if(comp.type == "Headline"){
                            return (
                            <Section blog key={`headline-${index}`} sectionSpace={0}>
                                <Headline h={comp.headlineType}  nunito color={comp.green ? '--SHINY_SHAMROCK' : ''}  small textAlign='left' text={comp.text}/>
                            </Section>
                            )
                        }
                        else if(comp.type == "Image"){
                            return (
                                <Section key={`Image-${index}`} blog sectionSpace={8}>
                                    <ResponsiveImage height='400px' sizes='600px' objectFit='cover' src={comp.url} alt={comp.text} width='100%'/>
                                </Section>
                            )
                        }
                        else if(comp.type == "Button"){
                            return (
                                <Section key={`Button-${index}`} blog>
                                    <Button text={comp.text} href={comp.url}/>
                                </Section>
                            )
                        }
                        else if(comp.type == "Text"){
                            return (
                                <Section blog key={`Text-${index}`} sectionSpace={8}>
                                    <Text color='--BLACK' >{parse(comp.text)}</Text>
                                </Section>
                                )
                        }
                        else if(comp.type == "Disclaimer"){
                            return (
                                <Section blog key={`Disclaimer-${index}`} sectionSpace={10}>
                                    <InfoBox topText={comp.text1} icon>
                                        <Text color='--GOBLIN' size='S'>{parse(comp.text)}</Text>
                                    </InfoBox>
                                </Section>
                                )
                        }
                        else if(comp.type == "TextLink"){
                            return (
                                <Section key={`TextLink-${index}`} blog backgroundColor={'--MALDIVES'} sectionSpace={15}>
                                <Column>
                                    <Row rowSpace={10} justifyContent='space-between' alignItems='center' breakMobilePx={650} distanceMobile={8}>
                                    <Column>
                                    <Headline textAlign='left' h={3} small text={comp.text1}/>
                                    <Space height={3}/>
                                    <Text color='--BLACK' size='M'>{parse(comp.text)}</Text>
                                    </Column>
                                    <Button text={comp.text2} href={comp.url}/>
                                    </Row>
                                </Column>
                                </Section>
                            )
                        }
                        else if(comp.type == "Cite"){
                            return (
                                <Section key={`Cite-${index}`} blog sectionSpace={8}>
                                <Column>
                                <ResponsiveImage sizes='(max-width: 30px) 100vw' src='/icons/public/quotation.svg' alt='Info Icon' width='30px' height='30px'/>
                                <Space height={5}/>
                                <Text italic color='--BLACK' size='Cite'>{parse(comp.text)}</Text>
                                <Space height={5}/>
                                <Text textAlign='right' color='--BLACK'>{comp.text1}</Text>
                                </Column>
                                </Section>
                            )
                        }
                        else if(comp.type == "List"){
                            return (
                                <Section blog key={`List-${index}`} sectionSpace={8}>
                                    <Column>
                                        <ListItem text={[comp.text,comp.text1,comp.text2,comp.text3,comp.text4,comp.text5]}/>
                                    </Column>
                                </Section>
                            )
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
                <Section sectionSpace={15}>
                    <Column columnSpace={10}>
                    {!props.pw || checkedPW ? <Headline h={2} small text='Neuigkeiten aus der Finanzwelt' textAlign='left'/> : null}
                        <Row sizeEvenly justifyContent='center' breakMobilePx={950} distanceMobile={10} >
                            {!props.pw || checkedPW ? props.topics.map((topic: any, index:number) =>{
                                return(
                                    <React.Fragment key={`Tile-${index}`}>
                                    <BlogTile title={topic.title} imageAlt={topic.imageAlt} image={topic.image} link={"/blog/"+topic.link} type={topic.type}/>
                                    </React.Fragment>
                                )
                            }): null}
                        </Row>
                        <Space height={10}/>
                    </Column>
                </Section>
            </ProtectedContent>
        </main>
        </>
    )
    }

export const getServerSideProps: GetServerSideProps = async (context) => {

    const projectLink = context.params?.blog;
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

    if (page.type == 'Project'){
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

    var components

    if (context.req.cookies.auth != null){
        components = await prisma.component.findMany({
            where:{
                pageId: page?.id
            },
            orderBy:{
                order: 'asc'
            }
        })
    }
    else{
        components = await prisma.component.findMany({
            where:{
                pageId: page?.id
            },
            orderBy:{
                order: 'asc'
            },
            take: 3
        })
    }

    

    const currentDate = new Date();

    const topics = await prisma.page.findMany({
        where:{
            type: page.type,
            published_at: {
                lt: currentDate
            }
        },
        take: 3,
        orderBy:{
            published_at: 'desc'
        }
        
    });

    const images = await prisma.page.findMany({
        where:{
            type: {
                not: 'Project'
            },
            published_at: {
                lt: currentDate
            },
            image: {
                not: null
            }
        },
        select:{
            image: true,
        },
        take: 6,
    })


        
      return { props: {
        page : JSON.parse(JSON.stringify(page)),
        comp : JSON.parse(JSON.stringify(components)),
        pw: pw,
        ilength: images.length,
        images: JSON.parse(JSON.stringify(images)),
        auth: context.req.cookies.auth != null,
        topics: JSON.parse(JSON.stringify(topics))
      } };
}
