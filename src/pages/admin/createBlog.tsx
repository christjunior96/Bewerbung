import Head from 'next/head'
import Image from 'next/image'
import { Nunito_Sans } from '@next/font/google'
import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import Button from 'components/Molecule/Button'
import Row from 'components/Molecule/Row'
import Space from 'components/Atom/Space'
import Column from 'components/Molecule/Column'
import Headline from 'components/Atom/Headline'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section'
import Text from 'components/Atom/Text'
import { NextSeo } from 'next-seo'
import { prisma } from 'lib/prisma';
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import LogoSlider from 'components/Organism/public/LogoSlider'
import StyledTextInput from 'components/Molecule/StyledTextInput'
import styled from 'styled-components'
import { JwtPayload, verify } from "jsonwebtoken";
import StyledTextAreaInput from 'components/Molecule/StyledTextAreaInput'
import StyledDateInput from 'components/Molecule/StyledDate'
import axios from 'axios'
import { baseurl } from 'utils/constants'
import Router from 'next/router'



export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [title, setTitle] = useState("")
    const [pw, setPw] = useState("")
    const [sub, setSub] = useState("")
    const [image, setImage] = useState("")
    const [imageAlt, setImageAlt] = useState("")
    const [publish, setPublish] = useState("")
    const [link, setLink] = useState("")
    const [seoDescription, setSeoDescription] = useState("")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [hour, setHour] = useState("0")
    const [minute, setMinute] = useState("0")

    const userInput = {
      title: title,
      pw: pw,
      publish: new Date(parseInt(year), parseInt(month)-1,parseInt(day),parseInt(hour),parseInt(minute)),
      link: link,
      subtitle: sub,
      imageAlt: imageAlt,
      image: image,
      type: 'Blog',
      seoDescription: seoDescription
    }

    async function sendForm() {
        try{
            const res = await axios.post(`${baseurl}/api/admin/createProject`, userInput, {
            method: 'POST',
            headers: {'Content-type':'application/json'}
            })
            Router.push("/admin")
        } catch(e){
            console.log(e)
        }
    }


return (
    <>
    <NextSeo
        title='Vorlage'
        description=
        "A short description goes here."
    />
    
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
        <Section sectionSpace={10}>
            <Column justifyContent='center'>
                
                    <StyledTextInput description='Seiten titel (für SEO relevant, wird in der Tabbar angezeigt)' onChange={setTitle} placeholder='Moteg 1'/>
                    <Space height={5}/>

                    <StyledTextAreaInput description='SEO Description' onChange={setSeoDescription} placeholder='Moteg 1'/>
                    <Space height={5}/>

                    <StyledTextInput description='Subheadline' onChange={setSub} placeholder='Hier könnte ihre Subheadline stehen'/>
                    <Space height={5}/>

                    <StyledTextInput description='Header Image' onChange={setImage} placeholder='Headerbild'/>
                    <Space height={5}/>

                    <StyledTextInput description='Header Alt Text' onChange={setImageAlt} placeholder='Hier könnte ihr Alt Text stehen'/>
                    <Space height={5}/>
                
                    <StyledTextInput description='Passwort (für Kunden um Projekt schon vorher einzusehen)' onChange={setPw} placeholder='abc123'/>
                    <Space height={5}/>

                    <StyledDateInput description='Veröffentlichungsdatum und Uhrzeit' onChangeDay={setDay} onChangeMonth={setMonth} onChangeYear={setYear}/>
                    <Space height={2}/>
                    <Row rowSpace={3}>
                        <StyledTextInput description='Stunde' placeholder='14' onChange={setHour}/>
                        <StyledTextInput description='Minute' placeholder='37' onChange={setMinute}/>
                    </Row>
                    <Space height={5}/>

                    <StyledTextInput onChange={setLink} description='Seiten Link (keine Leerzeichen, nur - oder _)' placeholder='Moteg-1'/>
                    <Space height={10}/>

                    <Button text='Erstellen' onClick={sendForm}/>
                
            </Column>
        </Section>
    </main>
    </>
)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    interface JwtPayload {
        role: string;
    }

    // Holt sich die Cookies aus dem request
    var authCookie = context.req.cookies.auth || null;
    let decodedId;
    let role;
    let userData;

    // Überprüfung ob Cookie vorhanden ist
    if (!authCookie) {
      console.log("authCookie ist leer");
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    console.log("authCookie :: " + authCookie);
    // Überprüfung ob Cookie gültig ist
    verify(authCookie, process.env.JWT_SECRET, async function (err, decoded) {
      if (!err && decoded) {
        decodedId = decoded.sub;
        role = decoded as JwtPayload;
        role = role.role
        console.log("decodedId " + decodedId);
        console.log("role: " + role);
      } else {
        console.log("keine authentifizierung vorhanden");
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }
    });

    if (role != 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  
    const res = await prisma.page.findMany(
    );
  
    return { props: {
        res : JSON.parse(JSON.stringify(res))
    } };
  }
