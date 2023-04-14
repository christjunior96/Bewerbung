// ProtectedContent.tsx
import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Nunito_Sans, Roboto_Slab } from '@next/font/google'
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Space from 'components/Atom/Space';
import Link from 'next/link';
import Row from 'components/Molecule/Row';
import Column from 'components/Molecule/Column';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['italic','normal'] })
const roboto = Roboto_Slab({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'],style:['normal'] })

interface ProtectedContentProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
  mainImage: string;
  img1: string;
  img2: string;
  img3: string,
  img4: string,
  img5: string,
  img6: string,
}

const usePageHeight = (): number => {
    const [pageHeight, setPageHeight] = useState(0);
  
    useEffect(() => {
      const updatePageHeight = () => {
        if (typeof document !== 'undefined') {
          setPageHeight(document.documentElement.scrollHeight);
        }
      };
  
      updatePageHeight();
  
      window.addEventListener('resize', updatePageHeight);
      return () => {
        window.removeEventListener('resize', updatePageHeight);
      };
    }, []);
  
    return pageHeight;
  };
  

const ContentWrapper = styled.div`
    position: relative;
    min-height: ${props => props.theme.display ? '2000px' : 'unset'};
    max-height: ${props => props.theme.display ? '2000px' : 'unset'};
    overflow: hidden;
  `;

  const Blocker = styled.div`
    display: ${props => props.theme.display ? 'flex' : 'none'} !important; 
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 30%);
    color: #333;
    height: ${props => props.theme.h}px;
    font-weight: bold;
    font-size: 18px;
    padding: 20px;
    text-align: center;
    z-index: 100;
    justify-content:center;
  `;

  const BlockerWrapper = styled.div`
    background: #FFFFFF;
    width: 100%;
    border: 1px solid #979797;
    border-radius: 50px;
    max-width: 940px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 600px;
    margin-top: 170px;
    padding: 20px;
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    /* or 125% */
    text-align: center;
    color: #000000;
  `;

  const ImageArea = styled.div`
    display: flex;
  `;

  const BigImage = styled.div`
    border-radius: 30px;
    overflow: hidden;
  `;

  const SmallImageWrapper = styled.div`
    border-radius: 10px;
    overflow: hidden;
  `;


  const TwoImages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    opacity: 0.5;
    @media only screen and (max-width: 660px) {
      display: none;
    }
  `;

  const SmallImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    opacity: 0.3;
    @media only screen and (max-width: 950px) {
      display: none;
    }
  `;

  const CustomButton = styled(Link)`
    border: 1px solid rgba(34, 34, 34, 0.1);
    filter: drop-shadow(0px 10px 30px rgba(56, 29, 219, 0.2));
    border-radius: 10px;
    display: flex;
    padding: 8px 14px;
  `;

  const Register = styled.div`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    /* identical to box height, or 186% */
    text-align: center;
    color: #000000;
  `;

  const DownloadWrapper = styled.div`
    display: flex;
    background: #6BC690;
    border-radius: 8px;   
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 38px;
  `;

  const TopText = styled.div`
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #222222;
    opacity: 0.3;
    text-align:left;
  `;

  const BottomText = styled.div`
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #222222;
    text-align:left;
  `;

const ProtectedContent: React.FC<ProtectedContentProps> = ({ isLoggedIn, children, mainImage, img1, img2, img3, img4, img5, img6 }) => {
  return (
    <ContentWrapper theme={{display:!isLoggedIn ,h:usePageHeight()*0.5}}>
        <Blocker theme={{display:!isLoggedIn ,h:usePageHeight()*0.5}}>
            <BlockerWrapper className={nunito.className}>
              <ImageArea>
                  <SmallImage>
                  <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img3}/></SmallImageWrapper>
                  </SmallImage>
                  <Space width={5}/>
                  <TwoImages>
                    <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img2}/></SmallImageWrapper>
                    <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img1}/></SmallImageWrapper>
                  </TwoImages>
                  <Space width={5}/>
                  <BigImage><ResponsiveImage alt='Text' width='300px' height='200px' sizes='200px' objectFit='cover' src={mainImage}/></BigImage>
                  <Space width={5}/>
                  <TwoImages>
                    <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img4}/></SmallImageWrapper>
                    <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img5}/></SmallImageWrapper>
                  </TwoImages>
                  <Space width={5}/>
                  <SmallImage>
                  <SmallImageWrapper><ResponsiveImage alt='Text' width='100px' sizes='100px' height='65px' objectFit='cover' src={img6}/></SmallImageWrapper>
                  </SmallImage>
              </ImageArea>
            <Space height={15}/>
            <div>Melden Sie sich kostenlos an, um Zugriff auf <span style={{textDecoration:'underline'}}>unbegrenzte</span> Premium Artikel zu erhalten</div>
            <Space height={5}/>
            <CustomButton href={"/login"}>
              <Row rowSpace={5} alignItems='center'>
                <DownloadWrapper><ResponsiveImage alt='Download Icon' src='/icons/public/Download.svg' width='16px' height='16px'/></DownloadWrapper>
                <Column columnSpace={1}>
                <TopText>Uneingeschränkter Zugriff</TopText>
                <BottomText>Jetzt kostenlos anmelden</BottomText>
                </Column>
              </Row>
            </CustomButton>
            <Space height={5}/>
            <Register>+1500 Nutzer bereits registriert</Register>
            </BlockerWrapper>
        </Blocker>
        {children}
    </ContentWrapper>);
};

export default ProtectedContent;
