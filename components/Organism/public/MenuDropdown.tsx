import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Atom/Text';
import { Nunito_Sans, Roboto_Slab } from '@next/font/google'
import Image from 'next/image';
import parse from 'html-react-parser';
import Link from 'next/link';
import Row from 'components/Molecule/Row';
import Space from 'components/Atom/Space';
import ResponsiveImage from 'components/Atom/ResponsiveImage';

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })
const roboto = Roboto_Slab({weight:["200","300","400","500","600","700","800","900"], subsets: ['latin'] })

interface MenuProps {
data: {
    category: string;
    body: string[][];
    MenuId: string;
    lastLink: string;
};
isOpen: boolean;
closeOthers: () => void;
handleClick: () => void;
oId: string;
}

interface FaqListProps {
    menu: MenuProps['data'][];
    openId: string;
    openIdFun: (checked: string) => void;
}


const MenuContainer = styled.div`
    width: 100%;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 1em 2em;
    margin: 0em 0em 2em 0em;
    background: #EDF8F1;
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

const Headline = styled.div`
    font-family: ${roboto};
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 21px;
    color: #2F513C;
`;

const CustomLink = styled(Link)`
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 300;
    font-size: 17px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color:  #2F513C;
`;

const CustomLinkUnderline = styled(CustomLink)`
    text-decoration: underline;
`;

const Faq: React.FC<MenuProps> = ({ data, isOpen, closeOthers, handleClick, oId }) => {
const handleFaqClick = () => {
    if (closeOthers) {
        closeOthers();
    }
    handleClick(); 
};

return (
    <>
        <MenuContainer id={data.MenuId}>
            <Question onClick={handleFaqClick}>
                <Headline>{data.category}</Headline>
                <Indicator>{data.MenuId == oId ? <Image width={25} height={25} alt='Open Icon' src='/icons/public/faqm.svg' /> :  <Image width={25} height={25} alt='Open Icon' src='/icons/public/faqp.svg' />}</Indicator>
            </Question>
            {data.MenuId == oId && <Answer>{data.body.map((link) => {return <CustomLink href={link[1]}>{link[0]}</CustomLink>}  
            )}
            <Row alignItems="center">
            <CustomLinkUnderline href={data.lastLink}>alle anzeigen</CustomLinkUnderline>
            <Space width={5}/>
            <ResponsiveImage alt="Arrow" src="/icons/public/rightArr.svg" />
            </Row>
            </Answer>}
        </MenuContainer>
    </>
    
);
};

const MenuDropdown: React.FC<FaqListProps> = ({ menu, openId, openIdFun }) => {
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
    {menu.map((menus, index) => (
        <Faq
        oId={openId}
        key={`MenuItem-${index}`}
        data={menus}
        isOpen={openIndex === index}
        closeOthers={closeOthers}
        handleClick={() => handleFaqClick(index, menus.MenuId)}
        />
    ))}
    </>
);
};

export default MenuDropdown;
