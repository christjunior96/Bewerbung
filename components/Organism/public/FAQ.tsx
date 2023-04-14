import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Atom/Text';
import { Nunito_Sans } from '@next/font/google'
import Image from 'next/image';
import parse from 'html-react-parser';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface FaqProps {
data: {
    question: string;
    answer: string;
    faqId: string;
};
isOpen: boolean;
closeOthers: () => void;
handleClick: () => void;
oId: string;
}

interface FaqListProps {
    faqs: FaqProps['data'][];
    openId: string;
    openIdFun: (checked: string) => void;
}


const FaqContainer = styled.div`
    width: 100%;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 1em 2em;
    margin: 2em 0em 0em 0em;
`;

const Question = styled.div`
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Answer = styled.div`
    margin-top: 15px;
`;

const Indicator = styled.span`
    margin-left: 10px;
    font-size: 12px;
`;

const Headline = styled.h3`
    color: var(--WELLINGTON);
    text-align:left;
    font-size: 20px;
`;

const Faq: React.FC<FaqProps> = ({ data, isOpen, closeOthers, handleClick, oId }) => {
const handleFaqClick = () => {
    if (closeOthers) {
        closeOthers();
    }
    handleClick(); 
};

return (
    <>
        <FaqContainer id={data.faqId}>
            <Question onClick={handleFaqClick}>
                <Headline className={nunito.className}>{data.question}</Headline>
                <Indicator>{data.faqId == oId ? <Image width={25} height={25} alt='Open Icon' src='/icons/public/faqm.svg' /> :  <Image width={25} height={25} alt='Open Icon' src='/icons/public/faqp.svg' />}</Indicator>
            </Question>
            {data.faqId == oId && <Answer><Text>{parse(data.answer)}</Text></Answer>}
        </FaqContainer>
    </>
    
);
};

const FaqList: React.FC<FaqListProps> = ({ faqs, openId, openIdFun }) => {
const [openIndex, setOpenIndex] = useState<number>(-1);

const closeOthers = () => {
    setOpenIndex(-1);
};

const handleFaqClick = (index: number, id:string) => {
    setOpenIndex(openIndex === index ? -1 : index);
    openIdFun(id)
};

return (
    <>
    {faqs.map((faq, index) => (
        <Faq
        oId={openId}
        key={`FAQItem-${index}`}
        data={faq}
        isOpen={openIndex === index}
        closeOthers={closeOthers}
        handleClick={() => handleFaqClick(index, faq.faqId)}
        />
    ))}
    </>
);
};

export default FaqList;
