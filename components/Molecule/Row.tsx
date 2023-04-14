import { ReactNode, Children, cloneElement } from 'react';
import styled from "styled-components"
import Space from '../Atom/Space';
import {v4 as randomUUID} from 'uuid';
import React from 'react';

interface RowProps {
  children: ReactNode;
  justifyContent?: string;
  backgroundColor?: string;
  alignItems?: string;
  sizeEvenly?: boolean;
  rowSpace?: number;
  centerRow?: number;
  breakMobilePx?: number;
  distanceMobile?: number;
}

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.theme.jc};
  align-items: ${props => props.theme.ai};
  background-color: ${props => props.theme.bgColor};
  @media only screen and (max-width: ${props => props.theme.bMP}px) {
    flex-direction: column;
  }
`;

const FullWidthDiv = styled.div`
  width: ${props => props.theme.se ? '100%' : 'unset'};
  display: ${props => props.theme.cR ? 'flex' : 'unset'};
  justify-content: ${props => props.theme.cR ? 'center' : 'unset'};
`;

const Row = ({ children, justifyContent, backgroundColor, alignItems, sizeEvenly, rowSpace, centerRow, breakMobilePx, distanceMobile }: RowProps) => {

  const arrayChildren = Children.toArray(children);

  return (
    <StyledRow theme={{ jc:justifyContent, bgColor: backgroundColor, ai:alignItems, se:sizeEvenly, cR:centerRow, bMP:breakMobilePx }}>
      {arrayChildren.map((child, index) =>{
       return (
        <React.Fragment key={`Row-${index}`}>
        <FullWidthDiv theme={{ se:sizeEvenly, cR:index==centerRow }}>
          {child}
        </FullWidthDiv>
        {index === arrayChildren.length - 1 ? "" : <Space width={rowSpace} height={index === arrayChildren.length - 1 ? 0 : distanceMobile}/>}
        </React.Fragment>
        )
      })}
    </StyledRow>
  );
};

export default Row;
