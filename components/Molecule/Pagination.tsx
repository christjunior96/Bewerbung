// components/Pagination.tsx
import ResponsiveImage from 'components/Atom/ResponsiveImage';
import Space from 'components/Atom/Space';
import React from 'react';
import styled, { css } from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  padding: 10px;
  cursor: pointer;
`;

interface PageProps {
  active: boolean;
}

const Page = styled.div<PageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  cursor: pointer;
  user-select: none;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  color: #000000;

  ${(props) =>
    props.active &&
    css`
      background-color: #F0F0F0;
    `}
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getDisplayedPages = () => {
    const pages = [];
    if (currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
    return pages.filter((page) => page >= 1 && page <= totalPages);
  };

  const displayedPages = getDisplayedPages();

  return (
    <Container>
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
      <ResponsiveImage alt="right icon" width="16px" height='16px' src="/icons/public/left.svg"/><Space width={2}/>zurück   </NavButton>
      {displayedPages.map((page) => (
        <Page
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Page>
      ))}
      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === parseInt(totalPages.toFixed(0))}
      >
        weiter <Space width={2}/><ResponsiveImage alt="right icon" width="16px" height='16px' src="/icons/public/right.svg"/>
      </NavButton>
    </Container>
  );
};



export default Pagination;
