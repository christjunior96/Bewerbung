import Head from 'next/head'
import Image from 'next/image'
import { Nunito_Sans } from '@next/font/google'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Button from 'components/Molecule/Button'
import Row from 'components/Molecule/Row'
import Space from 'components/Atom/Space'
import Column from 'components/Molecule/Column'
import Headline from 'components/Atom/Headline'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Section from 'components/Molecule/Section'
import Text from 'components/Atom/Text'
import { NextSeo } from 'next-seo'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser';
import LogoSlider from 'components/Organism/public/LogoSlider'


export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const QuillNoSSRWrapper = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const [text, setText] = useState("");

  function handleClick(){
    setText("Hat geklappt")
  }


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'bold',
    'italic',
    'underline',
    'link',
  ]

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
        <Section sectionSpace={5} backgroundColor='--WELLINGTON'>
          <Column>
          <Row justifyContent='center'>
            <Headline h={1} color='--GARDEN_VARIETY' text="Das ist ein Headline Test" />
          </Row>
          <Row justifyContent='center'>
            <Headline h={2} text="Das ist ein Headline Test" textAlign='left'/>
          </Row>
          </Column>
        </Section>

        <Section sectionSpace={5}>
          <Column columnSpace={10}>
            <Column>
              <Row rowSpace={10} sizeEvenly centerRow={2} >
                <Row>Das ist ein Marcel Test Das ist ein Marcel Test Das ist ein Marcel Test Das ist ein Marcel Test Das ist ein Marcel Test Das ist ein Marcel Test</Row>
                <Row>Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row</Row>
                <Button text='Test' small primaryOutline subText='Das ist ein Subtext'></Button>
              </Row>
            </Column>
            <Column columnSpace={10}>
              <Row rowSpace={10} sizeEvenly centerRow={2} breakMobilePx={600} distanceMobile={6}>
                <Row><Text>Das ist eine zweite Row Das ist <span style={{fontSize:"30px"}}>eine</span> zweite Row Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row</Text></Row>
                <Row>Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row Das ist eine zweite Row</Row>
                <Button text='Test'></Button>
              </Row>
              <Row sizeEvenly rowSpace={5} breakMobilePx={900} distanceMobile={5}>
                <Button href="/" text='Das ist ein Link' primaryOutline/>
                <Button onClick={()=>console.log("Hallo Welt")} text="Console Log" primaryOutline small/>
                <Button href="/" text='Das ist ein Link 2'/>
                <Button onClick={()=>console.log("Hallo Welt")} text="Console Log 2" small/>
              </Row>
            </Column>
            <QuillNoSSRWrapper theme="snow" placeholder='Dein Text hier' value={text} onChange={e => (setText(e))}  modules={modules} formats={formats} />
            <Text>{parse({text}.text)}</Text>
            {text}
          </Column>
          
        </Section>

        <Section>
          <LogoSlider/>
        </Section>
        
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Holt sich die Cookies aus dem request
  
    return { props: {} };
  }
