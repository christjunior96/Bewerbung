import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import AccountHeadline from "components/Atom/AccountHeadline";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface InvestedCapitalProps {
    projects: string[];
    blue?: boolean;
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
    background-color: ${props => props.theme.b ? 'var(--BUTTON_BORDER2)' : 'var(--SOFT_PEALS)'};
    color:  ${props => props.theme.b ? 'var(--WHITE)' : 'var(--WELLINGTON)'};
    font-family: ${nunito};
    padding: 3px 15px;
    border-radius: 0.3em;
    font-size: 14px;
`;

const InvestedProjects = ({ projects, blue }: InvestedCapitalProps) => {
    return (
        <>
            {!blue && <AccountHeadline text="Investierte Projekte"/>}
            <ProjectItemWrapper>
                {projects.map((project, index) => {
                    return (
                        <Projectitem className={nunito.className} theme={{b:blue}} key={`InvestedProjekt-${index}`}>
                            {project}
                        </Projectitem>
                    )
                })}
            </ProjectItemWrapper>
        </>
        );
};

export default InvestedProjects;
