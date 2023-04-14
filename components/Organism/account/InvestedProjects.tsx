import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface InvestedCapitalProps {
    projects: string[];
}

const ProjectItemWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
`;

const Projectitem = styled.div`
    margin: 10px 10px 0px 0px;
    white-space: nowrap;
    background-color: var(--SOFT_PEALS);
    color: var(--WELLINGTON);
    padding: 3px 15px;
    border-radius: 0.3em;
    font-size: 14px;
`;

const ActiveCapital = ({ projects }: InvestedCapitalProps) => {
    return (
        <>
            <AccountHeadline text="Investierte Projekte"/>
            <ProjectItemWrapper>
                {projects.map((project, index) => {
                    return (
                        <Projectitem key={`InvestedProjekt-${index}`}>
                            {project}
                        </Projectitem>
                    )
                })}
            </ProjectItemWrapper>
        </>
        );
};

export default ActiveCapital;
