import styled from "styled-components";
import React, { ReactNode } from "react";
import { Nunito_Sans } from '@next/font/google'
import Row from "./Row";
import Image from "next/image";
import ResponsiveImage from "components/Atom/ResponsiveImage";
import Column from "./Column";

const nunito = Nunito_Sans({ weight: ['200','300','400','600','700','800','900'], subsets: ['latin'], })

interface ProjektTileProps {
    imageSrc: string;
    imageAlt: string;
    titel: string;
}




const ProjectTile = ({ imageSrc, imageAlt, titel }: ProjektTileProps) => {
    return (
        <>
        <Column justifyContent="center">
        <ResponsiveImage alt={imageAlt} src={imageSrc} width="250px" height="180px" borderRadius="2em" />
        </Column>
        </>
        );
};

export default ProjectTile;
