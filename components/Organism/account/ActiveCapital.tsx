import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";
import ProgressBar from "@ramonak/react-progress-bar";
import Space from "components/Atom/Space";
import { hash } from "bcrypt";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface ActiveCapitalProps {
    active: number;
    payedBack: number;
    sum: number;
}


function insertDecimal(num:number) {
    return num < 1000 ? num : (num / 1000).toFixed(3);
 }


const ActitveCapitalWrapper = styled.div`
  
`;

const InvestedSum = styled.div`
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1100px) {
        display:unset;
    }
`;

const ProgressBarWrapper = styled.div`
    width: 280px;
`;

const Sum = styled.span`
    color: var(--FELT_GREEN);
    font-size: 22px;
    font-weight: 500;
    white-space: nowrap;
`;

const PayedBack = styled.div`
    color: #B5B5B5;
    font-size: 13px;
    margin-top: 15px;
`;



const ActiveCapital = ({ active, payedBack, sum }: ActiveCapitalProps) => {
    return (
        <React.Fragment key={`ACItem`}>
            <AccountHeadline text="Aktives Capital"/>
            <ActitveCapitalWrapper>
                <InvestedSum>
                    <ProgressBarWrapper>
                        <ProgressBar bgColor="var(--FELT_GREEN)" baseBgColor="#f6f6f6" height="20px" borderRadius="0.3em" completed={active} maxCompleted={sum} isLabelVisible={false}/>
                    </ProgressBarWrapper>
                    <Space width={5} height={2}/>
                    <Sum>{insertDecimal(sum)} €</Sum>
                </InvestedSum>
                <PayedBack>
                    Zurückgezahlt: {insertDecimal(payedBack)} €
                </PayedBack>
            </ActitveCapitalWrapper>
        </React.Fragment>
        );
};

export default ActiveCapital;
