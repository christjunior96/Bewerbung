import Link from "next/link";
import styled from "styled-components"
import { MouseEventHandler } from "react";
import { Nunito_Sans } from '@next/font/google'

const inter = Nunito_Sans({ subsets: ['latin'], weight:"600" })
const interSub = Nunito_Sans({ subsets: ['latin'], weight:"300" })

interface ButtonProps {
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  primaryOutline?: boolean;
  text: string;
  small?: boolean;
  subText?: string;
}

const StyledButton = styled.button`
  font-size: 16px;
  text-align: center;
  color: var(--GOBLIN);
  border: 2px solid var(--BUTTON_BORDER);
  white-space: nowrap;
  padding: ${props => props.theme.s ? '8px 12px' : '12px 24px'};
  background: var(${props => props.theme.pO ? '--MALDIVES' : '--VENICE_MINT'});
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: ${props => props.theme.subText ? '10px' : '0px'};
`;

  const StyledLink = styled(Link)`
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
  color: var(--GOBLIN);
  border: 2px solid var(--BUTTON_BORDER);
  padding: ${props => props.theme.s ? '8px 12px' : '12px 24px'};
  background: var(${props => props.theme.pO ? '--MALDIVES' : '--VENICE_MINT'});
  border-radius: 8px;
  margin-bottom: ${props => props.theme.subText ? '10px' : '0px'};
`;

  const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `;

  const SubText = styled.span`
    font-size: 14px;
    line-height: 26px;
    color: black;
  `;

const Button: React.FC<ButtonProps> = ({ href, onClick, primaryOutline, text, subText, small }) => {

  if (href) {
    return (
        <ButtonWrapper>
          <StyledLink className={inter.className} theme={{ pO: primaryOutline, s:small, subText:subText }} href={href}>
            {text}
          </StyledLink>
          {subText}
        </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper>
      <StyledButton className={inter.className} theme={{ pO: primaryOutline, s:small, subText:subText }} onClick={onClick}>
        {text}
      </StyledButton>
      <SubText className={interSub.className}>{subText}</SubText>
    </ButtonWrapper>
  );
};

export default Button;
