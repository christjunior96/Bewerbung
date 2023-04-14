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
import ResponsiveImage from 'components/Atom/ResponsiveImage'
import 'react-quill/dist/quill.snow.css'
import BlogHeader from 'components/Organism/public/BlogHeader'
import { time } from 'console'
import StyledCheckbox from 'components/Molecule/StyledCheckbox'
import InfoBox from 'components/Molecule/InfoBox'
import ListItem from 'components/Organism/public/List'


function addComponent(json: any, type: string): any {
  const number = Math.random() * 1000000
  const updatedJson = [...json];
  updatedJson.push({
    id: number,
    type: type,
    order: 99,
    text: 'Text',
    text1: null,
    text2: null,
    text3: null,
    text4: null,
    text5: null,
    headlineType: null,
    green: false,
    list: [],
    url: '/',
  });
  return sortJsonByOrder(updatedJson);
}

function removeComponentByIndex(jsonString: string, index: number): string {
  const components = JSON.parse(jsonString);
  components.splice(index, 1);
  return JSON.stringify(components);
}


interface Item {
  id: number;
  type: string;
  order: number;
  text: string;
  text1: string | null;
  text2: string | null;
  text3: string | null;
  text4: string | null;
  text5: string | null;
  headlineType: string | null;
  url: string | null;
  green: boolean;
  list: string[] | null;
  pageId: number;
}




function sortJsonByOrder(json: any): any {
  const sortedJson = [...json];
  sortedJson.sort((a: any, b: any) => a.order - b.order);
  return sortedJson;
}

function updateJsonString(jsonString: string, id: number, field: keyof Item, value: string | boolean | null): string {
  const items: Item[] = JSON.parse(jsonString);

  const updatedItems = items.map((item) => {
    if (item.id === id && field == 'order' && !(typeof value === "boolean")) {
      return { ...item, [field]: value ? parseInt(value) : '' };
    } 
    else if(item.id === id){
      return { ...item, [field]: value };
    }
    return item;
  });

  return JSON.stringify(updatedItems);
}

const EditBar = styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
background: #ffffff;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
z-index: 1001;
display: flex;
justify-content: center;
padding: 10px;
overflow-x: auto;
@media only screen and (max-width: 750px) {
    display: none;
}
`;

const UpdateButton  = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
`;




export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const QuillNoSSRWrapper = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

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

    const [title, setTitle] = useState(props.page.title)
    const [pw, setPw] = useState(props.page.password)
    const [link, setLink] = useState(props.page.link)
    const [seoDescription, setSeoDescription] = useState(props.page.description)
    const [day, setDay] = useState("")
    const [imageAlt, setImageAlt] = useState(props.page.imageAlt)
    const [sub, setSub] = useState(props.page.subtitle)
    const [image, setImage] = useState(props.page.image)
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [hour, setHour] = useState("0")
    const [minute, setMinute] = useState("0")
 
    const [jsonComp, setJson] = useState(props.comp)

    const userInput = {
      title: title,
      pw: pw,
      publish: new Date(parseInt(year), parseInt(month)-1,parseInt(day),parseInt(hour),parseInt(minute)),
      link: link,
      image: image,
      imageAlt: imageAlt,
        subtitle: sub,
      seoDescription: seoDescription,
    }

    const transmit ={
      userInput: userInput,
      id: props.pId,
      components: jsonComp
    }

   

    async function sendForm() {
        try{
            const res = await axios.post(`${baseurl}/api/admin/updateProject`, transmit, {
            method: 'POST',
            headers: {'Content-type':'application/json'}
            })
            
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
                
                    <StyledTextInput description='Seiten titel (für SEO relevant, wird in der Tabbar angezeigt)' onChange={setTitle} value={title} placeholder='Moteg 1'/>
                    <Space height={5}/>

                    <StyledTextAreaInput description='SEO Description' onChange={setSeoDescription} value={seoDescription} placeholder='Moteg 1'/>
                    <Space height={5}/>

                    <StyledTextInput description='Subheadline' value={sub} onChange={setSub} placeholder='Hier könnte ihre Subheadline stehen'/>
                    <Space height={5}/>

                    <StyledTextInput description='Header Image' value={image} onChange={setImage} placeholder='Headerbild'/>
                    <Space height={5}/>

                    <StyledTextInput description='Header Alt Text' value={imageAlt} onChange={setImageAlt} placeholder='Hier könnte Ihr Alt Text stehen'/>
                    <Space height={5}/>

                    <StyledTextInput description='Passwort (für Kunden um Projekt schon vorher einzusehen)' onChange={setPw} value={pw} placeholder='abc123'/>
                    <Space height={5}/>

                    <StyledDateInput description='Veröffentlichungsdatum und Uhrzeit' onChangeDay={setDay} onChangeMonth={setMonth} onChangeYear={setYear}/>
                    <Space height={2}/>
                    <Row rowSpace={3}>
                        <StyledTextInput description='Stunde' placeholder='14' onChange={setHour}/>
                        <StyledTextInput description='Minute' placeholder='37' onChange={setMinute}/>
                    </Row>
                    <Space height={5}/>

                    <StyledTextInput onChange={setLink} value={link} description='Seiten Link (keine Leerzeichen, nur - oder _)' placeholder='Moteg-1'/>
                    <Space height={10}/>

            </Column>
        </Section>
        <BlogHeader headline={title} image={image} imageAlt={imageAlt} time={props.page.readMinutes} subline={sub}/>
        {jsonComp.map((comp: any, index: number) =>{
            if(comp.type == "Headline"){
                return (
                  <>
                  <Section sectionSpace={5}>
                    <Column backgroundColor='#ededed'>
                    <Space height={12}/>
                      <Row justifyContent='center' alignItems='center'>
                        <StyledTextInput value={comp.text} required description='Text' placeholder='Headline Text' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}/>
                          <Space width={5}/>
                        <StyledTextInput value={comp.headlineType} required description='Größe H(2-6)' min={2} max={6} number placeholder='Headline Text' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'headlineType', e)))}/>
                          <Space width={5}/>
                        <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                          <Space width={5}/>
                        <StyledCheckbox label='Grün' checked={comp.green} onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'green', e)))}/>
                          <Space width={5}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                      </Row>
                      <Space height={12}/>
                      </Column>
                  </Section>
                  <Section blog>
                    <Column>
                      <Space height={5}/>
                      <Headline nunito textAlign='left'  color={comp.green ? '--SHINY_SHAMROCK' : ''} h={comp.headlineType} text={comp.text}/>
                    </Column>
                  </Section>
                  </>
                  
                )
            }
            else if(comp.type == "Image"){
                return (
                  <>
                    <Section sectionSpace={5}>
                    <Column backgroundColor='#ededed'>
                      <Space height={12}/>
                      <Row justifyContent='center' alignItems='center'>
                      <StyledTextInput value={comp.url} description='Bild URL' placeholder='/bild1.jpg' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'url', e)))}/>
                        <Space width={5}/>
                        <StyledTextInput value={comp.text} description='ALT Text' placeholder='/bild1.jpg' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}/>
                        <Space width={5}/>
                        <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                          <Space width={5}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                      </Row>
                      <Space height={12}/>
                      </Column>
                    </Section>
                    <Section blog>
                      <Column>
                      <Space height={5}/>
                      <ResponsiveImage src={comp.url} objectFit='cover' height='400px' alt={comp.text} width='100%'/>
                    </Column>
                  </Section>
                  </>
                )
            }
            else if(comp.type == "Button"){
                return (
                  <>
                  <Section sectionSpace={5}>
                  <Column backgroundColor='#ededed'>
                    <Space height={12}/>
                    <Row justifyContent='center' alignItems='center' >
                        <StyledTextInput value={comp.text} description='Button Text' placeholder='Startseite' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}/>
                          <Space width={5}/>
                        <StyledTextInput value={comp.url} description='Relative URL' placeholder='/faq' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'url', e)))}/>
                        <Space width={5}/>
                        <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                          <Space width={5}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                    </Row>
                    <Space height={12}/>
                    </Column>
                    </Section>
                    <Section blog>
                      <Column>
                      <Space height={5}/>
                      <Button text={comp.text} href={comp.url}/>
                    </Column>
                  </Section>
                  </>
              )}
              else if(comp.type == "List"){
                return (
                  <>
                  <Section sectionSpace={5}>
                  <Column backgroundColor='#ededed'>
                    <Space height={12}/>
                    <Row justifyContent='center' alignItems='center' rowSpace={10}>
                        <Column columnSpace={3}>
                          <StyledTextInput value={comp.text} description='Item 1' placeholder='Item 1' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}/>
                          <StyledTextInput value={comp.text1} description='Item 2' placeholder='Item 2' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text1', e)))}/>
                          <StyledTextInput value={comp.text2} description='Item 3' placeholder='Item 3' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text2', e)))}/>
                        </Column>
                        <Column columnSpace={3}>
                          <StyledTextInput value={comp.text3} description='Item 4' placeholder='Item 4' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text3', e)))}/>
                          <StyledTextInput value={comp.text4} description='Item 5' placeholder='Item 5' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text4', e)))}/>
                          <StyledTextInput value={comp.text5} description='Item 6' placeholder='Item 6' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text5', e)))}/>
                        </Column>
                        <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) =>setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                    </Row>
                    <Space height={12}/>
                    </Column>
                    </Section>
                    <Section blog>
                      <Column>
                        <ListItem text={[comp.text,comp.text1,comp.text2,comp.text3,comp.text4,comp.text5]}/>
                      </Column>
                  </Section>
                  </>
              )}
            else if(comp.type == "Text"){
                return (
                  <>
                  <Section sectionSpace={5}>
                      <Column backgroundColor='#ededed'>
                        <Space height={12}/>
                        <Row justifyContent='center' alignItems='center'>
                        <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                          <Space width={5}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                        </Row>
                        <Space height={12}/>
                        </Column>
                  </Section>
                  <Section blog>
                    <Column>
                        <Space height={5}/>
                      <QuillNoSSRWrapper theme="snow" placeholder='Dein Text hier' value={comp.text} onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}  modules={modules} formats={formats} />
                      <Space height={10}/>
                      <Text>{parse(comp.text)}</Text>
                    </Column>
                  </Section>
                  </>
                )
            }
            else if(comp.type == "Cite"){
              return (
                <>
                <Section sectionSpace={5}>
                    <Column backgroundColor='#ededed'>
                      <Space height={12}/>
                      <Row justifyContent='center' alignItems='center'>
                      <StyledTextInput value={comp.text1} description='Name' placeholder='Wolfang Amadeus Mozart' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text1', e)))}/>
                        <Space width={5}/>
                      <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                        <Space width={5}/>
                      <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                      </Row>
                      <Space height={12}/>
                      </Column>
                </Section>
                <Section blog>
                  <Column>
                      <Space height={5}/>
                    <QuillNoSSRWrapper theme="snow" placeholder='Dein Text hier' value={comp.text} onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}  modules={modules} formats={formats} />
                    <Space height={10}/>
                    <ResponsiveImage src='/icons/public/quotation.svg' alt='Info Icon' width='30px' height='30px'/>
                    <Space height={5}/>
                    <Text italic color='--BLACK' size='Cite'>{parse(comp.text)}</Text>
                    <Space height={5}/>
                    <Text textAlign='right' color='--BLACK'>{comp.text1}</Text>
                  </Column>
                </Section>
                </>
              )
          }
            else if(comp.type == "TextLink"){
              return (
                <>
                <Section sectionSpace={5}>
                    <Column backgroundColor='#ededed'>
                      <Space height={12}/>
                      <Row justifyContent='center' alignItems='center'>
                      <StyledTextInput value={comp.text1} description='Überschrift' placeholder='Überschrift' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text1', e)))}/>
                        <Space width={5}/>
                      <StyledTextInput value={comp.text2} description='Button Text' placeholder='Text' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text2', e)))}/>
                        <Space width={5}/>
                      <StyledTextInput value={comp.url} description='Button Link' placeholder='/' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'url', e)))}/>
                        <Space width={5}/>
                      <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                        <Space width={5}/>
                      <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                      </Row>
                      <Space height={12}/>
                      </Column>
                </Section>
                <Section>
                  <Column>
                  <QuillNoSSRWrapper theme="snow" placeholder='Dein Text hier' value={comp.text} onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}  modules={modules} formats={formats} />
                  <Space height={10}/>
                  </Column>
                </Section>
                <Section blog backgroundColor={'--MALDIVES'} sectionSpace={15}>
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
                </>
              )
          }
            else if(comp.type == "Disclaimer"){
              return (
                <>
                <Section sectionSpace={5}>
                    <Column backgroundColor='#ededed'>
                      <Space height={12}/>
                      <Row justifyContent='center' alignItems='center'>
                      <Space width={5}/>
                      <StyledTextInput value={comp.text1} description='Oberer Text' placeholder='Das ist ein Text' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text1', e)))}/>
                      <Space width={5}/>
                      <StyledTextInput value={comp.order} number description='Reihenfolge' placeholder='2' onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'order', e)))}/>
                        <Button small text='Entfernen' onClick={() => setJson(JSON.parse(removeComponentByIndex(JSON.stringify(jsonComp),index)))} />
                      </Row>
                      <Space height={12}/>
                      </Column>
                </Section>
                <Section blog>
                  <Column>
                      <Space height={5}/>
                    <QuillNoSSRWrapper theme="snow" placeholder='Dein Text hier' value={comp.text} onChange={(e) => setJson(JSON.parse(updateJsonString(JSON.stringify(jsonComp), comp.id, 'text', e)))}  modules={modules} formats={formats} />
                    <Space height={10}/>
                    <InfoBox topText={comp.text1} icon>
                      <Text color='--GOBLIN' size='S'>{parse(comp.text)}</Text>
                    </InfoBox>
                  </Column>
                </Section>
                </>
              )
          }
            else{
                return "Fehler"
            }
        })
        }


        <UpdateButton>
         <Button text='Update'  onClick={sendForm}/>
        </UpdateButton>

        <Space height={20}/>
        <EditBar>
          <Button text='Überschrift' onClick={() => setJson(addComponent(jsonComp, 'Headline'))} primaryOutline/>
            <Space width={3}/>
          <Button text='Text' onClick={() => setJson(addComponent(jsonComp, 'Text'))} primaryOutline/>
            <Space width={3}/>
          <Button text='Bild' onClick={() => setJson(addComponent(jsonComp, 'Image'))} primaryOutline/>
            <Space width={3}/>
          <Button text='Button' onClick={() => setJson(addComponent(jsonComp, 'Button'))} primaryOutline/>
          <Space width={3}/>
          <Button text='Disclaimer' onClick={() => setJson(addComponent(jsonComp, 'Disclaimer'))} primaryOutline/>
          <Space width={3}/>
          <Button text='Text Button' onClick={() => setJson(addComponent(jsonComp, 'TextLink'))} primaryOutline/>
          <Space width={3}/>
          <Button text='Zitat' onClick={() => setJson(addComponent(jsonComp, 'Cite'))} primaryOutline/>
          <Space width={3}/>
          <Button text='Liste' onClick={() => setJson(addComponent(jsonComp, 'List'))} primaryOutline/>
        </EditBar>
    </main>
    </>
)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const projectId = context.params?.blog;

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
  
    const page = await prisma.page.findUnique({
      where:{
          id: parseInt(projectId as string),
      },
    })

    const components = await prisma.component.findMany({
      where:{
          pageId: parseInt(projectId as string)
      },
      orderBy:{
          order: 'asc'
      }
  })

  console.log(components)
  
    return { props: {
        page : JSON.parse(JSON.stringify(page)),
        comp : JSON.parse(JSON.stringify(components)),
        pId: page?.id
    } };
  }
