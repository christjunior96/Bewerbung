import Head from 'next/head'
import Image from 'next/image'
import { Nunito_Sans } from '@next/font/google'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
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
import { HydrationProvider, Server, Client } from "react-hydration-provider";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })


const ActiveIndicator = styled.div`
    width: 10px;
    height: 10px;
    background: ${props => props.theme.active ? 'green' : 'red'};
    border-radius: 999px;
`

const Td = styled.td`
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  text-align: center;
  > a {
    text-decoration: underline;
  }
`;

const Th = styled.th`
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-right: 20px;
    padding-left: 20px;
    text-align: center;
    font-weight: bold;
`;

const Table = styled.table`
  border-spacing:0;
`;


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


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
      <HydrationProvider>
      <main>
        <Section >
            <Column columnSpace={3} justifyContent='center' alignItems='center'>
                <Headline h={1} text={'Projektseiten'}/>
                <Table className={nunito.className}>
                  <thead>
                    <tr>
                      <Th>Aktiv</Th>
                      <Th>Seiten Titel</Th>
                      <Th>Passwort</Th>
                      <Th>Veröffentlichung</Th>
                      <Th>Funktionen</Th>
                    </tr>
                  </thead>
                  <tbody>

                  {props.res.map((page: any) => {
                    const date = new Date(page.published_at);
                    return (
                        <tr>
                          <Td><ActiveIndicator theme={{active: date.getTime() < Date.now()}}/></Td>
                          <Td><Link href={"/project/"+page.link}>{page.title}</Link></Td>
                          <Td>{date.getTime() > Date.now() ? page.password : 'Öffentlich'}</Td>
                          <Client><Td>{date.toLocaleString()}</Td></Client>
                          <Td><Button text='Bearbeiten' small href={'/project/edit/'+page.id }/></Td>
                        </tr>
                    )})}
                    </tbody>
                </Table>
                  <Button text='Seite anlegen' href='/admin/createProject'/>
            </Column>
            <Space height={30}/>
            <Column columnSpace={3} justifyContent='center' alignItems='center'>
                <Headline h={1} text={'Blogbeiträge'}/>
                <Table className={nunito.className}>
                  <thead>
                    <tr>
                      <Th>Aktiv</Th>
                      <Th>Seiten Titel</Th>
                      <Th>Typ</Th>
                      <Th>Passwort</Th>
                      <Th>Veröffentlichung</Th>
                      <Th>Funktionen</Th>
                    </tr>
                  </thead>
                  <tbody>

                  {props.blog.map((page: any) => {
                    const date = new Date(page.published_at);
                    return (
                        <tr>
                          <Td><ActiveIndicator theme={{active: date.getTime() < Date.now()}}/></Td>
                          <Td><Link href={"/blog/"+page.link}>{page.title}</Link></Td>
                          <Td>{page.type}</Td>
                          <Td>{date.getTime() > Date.now() ? page.password : 'Öffentlich'}</Td>
                          <Client><Td>{date.toLocaleString()}</Td></Client>
                          <Td><Button text='Bearbeiten' small href={'/blog/edit/'+page.id }/></Td>
                        </tr>
                    )})}
                    </tbody>
                </Table>
                  <Button text='Seite anlegen' href='/admin/createBlog'/>
                  <Space height={20}/>
            </Column>
        </Section>
      </main>
      </HydrationProvider>
      
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
  
    const res = await prisma.page.findMany({
      orderBy:{
        published_at: 'desc'
      },
      where:{
        type: 'Project'
      }
    });

    const blog = await prisma.page.findMany({
      orderBy:{
        published_at: 'desc'
      },
      where:{
        type: {
          not: 'Project'
        }
      }
    });
  
    return { props: {
        res : JSON.parse(JSON.stringify(res)),
        blog: JSON.parse(JSON.stringify(blog))
    } };
  }
