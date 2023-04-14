import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import cookie from 'cookie';
import styled from "styled-components";
import Headline from 'components/Atom/Headline';
import Text from 'components/Atom/Text';
import Column from 'components/Molecule/Column';
import Row from 'components/Molecule/Row';
import Space from 'components/Atom/Space';
import StyledTextInput from 'components/Molecule/StyledTextInput';
import ResponsiveImage from 'components/Atom/ResponsiveImage';

const StyledDiv = styled.div`
    height: 100vh;
    width: 100%;
    background: var(--MALDIVES_INTENSE2);
    display: flex;
`;

const StyledButton = styled.button`
    font-size: 16px;
    text-align: center;
    color: var(--GOBLIN);
    border: 2px solid var(--BUTTON_BORDER2);
    white-space: nowrap;
    padding: '12px 24px';
    background: var(--VENICE_MINT2);
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 20px;
`;


const Login = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     // Setze das Ablaufdatum auf 24 Stunden in die Zukunft
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
    // Setze das Cookie mit dem eingegebenen Passwort
    document.cookie = `password=${password}; path=/; expires=${expires.toUTCString()}`;

    // Leite den Benutzer zur geschützten Seite weiter
    router.push('/overview');
  };

  return (
    <StyledDiv>
        <Column justifyContent='center' alignItems='center'>
                <ResponsiveImage alt='Louis Christ' src='/tobedeleted/LouisMain.jpg' width='150px' borderRadius='999px'/>
                <Headline h={1} text='Portfolio' />
                    <form onSubmit={onFormSubmit}>
                        <Text textAlign='center'><label htmlFor="password">Passwort</label></Text>
                        <Column alignItems='center'>
                        <StyledTextInput placeholder='Passwort' password onChange={setPassword}/>
                        <Space height={3}/>
                        <StyledButton type="submit">Login</StyledButton>
                        </Column>
                    </form>
        </Column>
    </StyledDiv>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  return { props: {} };
};
