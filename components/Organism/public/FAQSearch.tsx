import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Nunito_Sans } from '@next/font/google'
import { FAQ } from '@prisma/client';
import Link from 'next/link';
import Highlighter from "react-highlight-words";
import Space from 'components/Atom/Space';
import ResponsiveImage from 'components/Atom/ResponsiveImage'

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], style:['normal','italic'], subsets: ['latin'], })

    interface ModalProps {
        open: boolean;
    }

    interface FaqProps {
        data: {
            question: string;
            answer: string;
            faqId: string;
            fAQCategoryCategoryId: Number;
        };
        isOpen: boolean;
        closeOthers: () => void;
        handleClick: () => void;
    }
    
    interface FaqListProps {
        faqs: FaqProps['data'][];
        cats: FaqCatProps['data'][];
        searchWord: string;
        openId: (checked: string) => void;
    }

    interface FaqCatProps {
        data: {
            name: string;
            categoryId: Number;
        }
    }

const ModalBackground = styled.div<ModalProps>`
    display: ${props => props.open ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--WELLINGTON_BLACK);
    opacity: 0.5;
    z-index: 1000;
`;

const ModalWrapper = styled.div<ModalProps>`
    display: ${props => props.open ? 'block' : 'none'};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    width: 70%;
    max-width: 1000px;

    @media only screen and (max-width: 900px) {
        width: 85%;
    }
    @media only screen and (max-width: 450px) {
        width: 95%;
    }
`;

const Overflow = styled.div`
    overflow-x: auto;
    max-height: ${props => props.theme.h}px;
    border-radius: 0px 0px 8px 8px;
`;

const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px;
`;

const WhiteBox = styled.div`
    background: #ffffff;
    border-radius: 0px 0px 8px 8px;
    padding: 5px 15px;
`;

const TopBar = styled.div`
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px 8px 0px 0px;
    width: 100%;
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
`;

const SearchButton = styled.button`
    background: transparent;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 30px;
    height:30px;
    border: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TopText = styled.div`
    font-weight: 200;
    font-size: 20px;
    line-height: 31px;
    color: #FFFFFF;
    text-shadow: 0px 4px 35px rgba(0, 0, 0, 0.2);
`;

const TextInput = styled.input`
    background: transparent;
    outline: none;
    border: 0px;
    width:170px;
    outline-color: rgba(255, 255, 255);
`;

const FAQItem = styled(Link)`
    
`;

const ItemWrapper = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid #C0CBCB;
`;

const ItemTop = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Question = styled.div`
    font-weight: 800;
    font-size: 20px;
    line-height: 27px;
    color: var(--WELLINGTON);
`;

const Category = styled.div`
    font-style: italic;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    color: #000000;
    text-align: right;
    @media only screen and (max-width: 700px) {
        display: none;
    }
`;

const Answer = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #000000;
    margin-top: 15px;
`;

const Result = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #2F513C;
    display: flex;
    justify-content: center;
    margin-top: 35px;
    margin-bottom: 15px;
`;

const Highlight = styled(Highlighter)`
    > mark{
        background-color: lightgreen;
    }
`;

const ResBold = styled.span`
    font-style: italic;
    font-weight: bold;
`;

const SearchWrapper = styled.div`
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    display: flex;
    padding: 5px 10px;;
`;

const MainInput = styled.input`
    background: transparent;
    outline: none;
    border: 0px;
    width:240px;
    outline-color: rgba(255, 255, 255);
`;

const SearchButtonMain = styled.button`
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const FAQSearch: React.FC<FaqListProps> = ({faqs, cats, openId}) => {
const [open, setOpen] = useState(false);
const [search, setSearch] = useState("");
const [searchTherm, setSearchTherm] = useState("");
const size = useWindowSize();

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 1,
      height: 1,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }


const handleButtonClick = () => {
    setOpen(true);
};

const handleCloseModal = (id:string) => {
    setOpen(false);
    openId(id);
};

const filter = () =>{
    setSearch(searchTherm)
}

const count = () =>{
    var counter = 0;
    faqs.map((faq) => (
       faq.question.includes(search) || faq.answer.includes(search)) ? counter++ : null
    )
    return counter;
}

const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTherm(e.currentTarget.value) ;
  }

  function removeTags(str:string) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
       
    return str.replace( /(<([^>]+)>)/ig, '');
}


return (
    <>
    <SearchWrapper>
        <MainInput onChange={onChange} value={searchTherm} placeholder='Wonach suchen Sie?'/>
        <SearchButtonMain onClick={() => {handleButtonClick(), filter()}}><ResponsiveImage alt='Search Icon' width='18px' height='18px' src='/icons/public/search.svg'/></SearchButtonMain>
    </SearchWrapper>
    <ModalBackground open={open} onClick={() => handleCloseModal("0")} />
    <ModalWrapper open={open}>
        <TopText className={nunito.className}>Suchen Sie nach Stichworten wie z.B. “Crowdinvesting”</TopText>
        <TopBar>
            <TextInput onChange={onChange} value={searchTherm} placeholder={'Wonach suchen Sie?'}></TextInput>
            <SearchButton onClick={filter}>
                <Image alt='search icon' width={18} height={18} src="/icons/sidebar/star.svg"/>
            </SearchButton>
        </TopBar>
        <Overflow theme={{h:(size.height-200)}}>
            <WhiteBox className={nunito.className}>
            {faqs.map((faq) => (
                faq.question.includes(search) || faq.answer.includes(search) ?
                <ItemWrapper key={faq.faqId}>
                <FAQItem href={"/faq#"+faq.faqId} onClick={() => handleCloseModal(faq.faqId)}>
                    <ItemTop>
                        <Question><Highlight searchWords={[search]} textToHighlight={faq.question} /></Question>
                        <Space width={2}/>
                        <Category>{cats.map((cat) => {return (faq.fAQCategoryCategoryId == cat["categoryId"] && cat["name"])})}</Category>
                    </ItemTop>
                    <Answer><Highlight searchWords={[search]} textToHighlight={removeTags(faq.answer)} /></Answer>
                </FAQItem>
            </ItemWrapper> : ""
            ))}
        <Result>Ihre Suche ergab <ResBold>&nbsp;{count()} Treffer</ResBold></Result>
        </WhiteBox>
        </Overflow>
        
    </ModalWrapper>
    </>
);
};

export default FAQSearch;
