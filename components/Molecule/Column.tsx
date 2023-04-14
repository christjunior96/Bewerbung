import { ReactNode, Children, cloneElement } from 'react';
import styled from "styled-components"
import Space from '../Atom/Space';
import {v4 as randomUUID} from 'uuid';
import React from 'react';

interface ColumnProps {
  children: ReactNode;
  justifyContent?: string;
  backgroundColor?: string;
  alignItems?: string;
  sizeEvenly?: boolean;
  columnSpace?: number;
}

const StyledColumn = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: ${props => props.theme.jc};
  align-items: ${props => props.theme.ai};
  background-color: ${props => props.theme.bgColor};
`;

const FullWidthDiv = styled.div`
  width: ${props => props.theme.se ? '100%' : 'unset'};
`;

const Column = ({ children, justifyContent, backgroundColor, alignItems, sizeEvenly, columnSpace }: ColumnProps) => {

  const arrayChildren = Children.toArray(children);

  return (
    <StyledColumn theme={{ jc:justifyContent, bgColor: backgroundColor, ai:alignItems, se:sizeEvenly }}>
      {arrayChildren.map((child, index) =>{
       return (
        <React.Fragment key={`Column-${index}`}>
        <FullWidthDiv theme={{ se:sizeEvenly }}>
          {child}
        </FullWidthDiv>
        {index === arrayChildren.length - 1 ? "" : <Space height={index === arrayChildren.length - 1 ? 0 : columnSpace}/>}
        </React.Fragment>
        )
      })}
    </StyledColumn>
  );
};

export default Column;
