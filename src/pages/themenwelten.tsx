import Head from 'next/head'
import Row from 'components/Molecule/Row'
import Column from 'components/Molecule/Column'
import Headline from 'components/Atom/Headline'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section'
import { NextSeo } from 'next-seo'
import 'react-quill/dist/quill.snow.css'
import FAQ from 'components/Organism/public/FAQ'
import { prisma } from 'lib/prisma';
import FAQSearch from 'components/Organism/public/FAQSearch';
import Space from 'components/Atom/Space';
import { useEffect, useState } from 'react';
import Header from 'components/Organism/public/Header';
import Button from 'components/Molecule/Button';
import React from 'react';
import ThemeHeader from 'components/Organism/public/ThemeHeader';
import Text from 'components/Atom/Text';
import ArticleTile from 'components/Organism/public/ArticleTile';
import styled from 'styled-components';
import Divider from 'components/Atom/Divider';
import Pagination from 'components/Molecule/Pagination';
import axios from 'axios';
import MainMenu from 'components/Organism/public/MainMenu';
import cookie from 'cookie';

const ArticleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    width: 100%;
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(1,1fr);
        justify-items: center;
    }
`;

const preview = [{"id":15,"title":"Das ist mal ein längerer titel für einen blogbeitrag","subtitle":"Das ist die ziemlich lange subline vom blogbeitrag","type":"Blog","password":"a","readMinutes":5,"image":"/metzger.jpg","imageAlt":"alt","logoUrl":"","description":"diah","created_at":"2023-04-04T05:25:55.171Z","published_at":"2023-04-04T05:30:00.000Z","link":"lang1"},{"id":16,"title":"Das ist der letzte","subtitle":"das ist die letzte subline in diesem pagebuilder...","type":"Blog","password":"b","readMinutes":5,"image":"/tobedeleted/louis3.JPG","imageAlt":"das ist ihr alt text","logoUrl":"","description":"fsfoihw","created_at":"2023-04-04T05:26:38.472Z","published_at":"2023-04-04T05:30:00.000Z","link":"letzte1"},{"id":14,"title":"Test7","subtitle":"Das ist die Subheadline","type":"Blog","password":"abc","readMinutes":5,"image":"/tobedeleted/louis3.JPG","imageAlt":"Das isgt mein ","logoUrl":"","description":"Das ist ein Test","created_at":"2023-04-04T05:25:04.568Z","published_at":"2023-04-04T05:30:00.000Z","link":"test7"}]
const top = [{"id":14,"title":"Test7","subtitle":"Das ist die Subheadline","type":"Blog","password":"abc","readMinutes":5,"image":"/tobedeleted/louis3.JPG","imageAlt":"Das isgt mein ","logoUrl":"","description":"Das ist ein Test","created_at":"2023-04-04T05:25:04.568Z","published_at":"2023-04-04T05:30:00.000Z","link":"test7"},{"id":16,"title":"Das ist der letzte","subtitle":"das ist die letzte subline in diesem pagebuilder...","type":"Blog","password":"b","readMinutes":5,"image":"/tobedeleted/louis3.JPG","imageAlt":"das ist ihr alt text","logoUrl":"","description":"fsfoihw","created_at":"2023-04-04T05:26:38.472Z","published_at":"2023-04-04T05:30:00.000Z","link":"letzte1"},{"id":15,"title":"Das ist mal ein längerer titel für einen blogbeitrag","subtitle":"Das ist die ziemlich lange subline vom blogbeitrag","type":"Blog","password":"a","readMinutes":5,"image":"/metzger.jpg","imageAlt":"alt","logoUrl":"","description":"diah","created_at":"2023-04-04T05:25:55.171Z","published_at":"2023-04-04T05:30:00.000Z","link":"lang1"},{"id":13,"title":"Nicht veröffentlicht","subtitle":"Das ist die Sub-Line","type":"Blog","password":"abc","readMinutes":5,"image":"/tobedeleted/louis2.JPG","imageAlt":"Das ist der Text","logoUrl":"","description":"Louis 123","created_at":"2023-03-30T06:14:36.043Z","published_at":"2023-03-30T10:00:00.000Z","link":"dasistderTest"}]

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [selected, setSelected] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState([]);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        async function fetchPosts() {
          try {
            const response = await axios.get('/api/public/pages', {
              params: {
                cursor: 8 * (page - 1),
                topic: 'Blog',
                take: 8,
              },
            });
            setSearch(response.data.posts);
            setPages(response.data.count % 8 > 0 ? response.data.count / 8 + 1 : response.data.count / 8);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        }
      
        fetchPosts();
      }, [page]);

    return (
    <>
        <NextSeo
        title='FAQ'
        description=
        "Hier finden Sie häufig gestellte Fragen zu unserer Plattform!"
        />
        
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <MainMenu/>
          <ThemeHeader items={preview} value={selected} onClick={setSelected}/>
        <Section sectionSpace={15}>
        <Headline h={2} text='Premium Artikel' small textAlign='left'/>
        <Text color='--BLACK'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</Text>
        <Space height={10}/>
        <ArticleGrid>
        {top.map((item: any, index: number) => {
            return(
                <ArticleTile key={`ArticleTile-${index}`} image={item.image} imageAlt={item.imageAlt} link={item.link} title={item.title} readMinutes={item.readMinutes}  subtext={item.subtitle}/>
            )
        })}
        
        </ArticleGrid>
        </Section>

        <Section sectionSpace={10}>
            <Divider/>
        </Section>

        <Section sectionSpace={15}>
        <Headline h={2} text='Premium Artikel' small textAlign='left'/>
        <Text color='--BLACK'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</Text>
        <Space height={10}/>
        <ArticleGrid>
        {search.map((item: any, index: number) => {
            return(
                <ArticleTile key={`ArticleTile-${index}`} image={item.image} imageAlt={item.imageAlt} link={item.link} title={item.title} readMinutes={item.readMinutes}  subtext={item.subtitle}/>
            )
        })}
        </ArticleGrid>
        </Section>
        <Section sectionSpace={5}>
            <Divider/>
            <Space height={3}/>
            <Row justifyContent='flex-end'>
            <Pagination currentPage={page} totalPages={pages} onPageChange={setPage}/>
            </Row>
            
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