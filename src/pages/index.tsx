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
import ScrollAnimation from 'components/Atom/ScrollAnimation';
import AnimatedHeadline from 'components/Atom/AnimatedHeadline';
import { motion } from 'framer-motion';

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

const fadeOutAnimation = {
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const shakeAnimation = {
  initial: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

const Login = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [password, setPassword] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password == 'louis_bewerbung') {
      setFadeOut(true);
     // Setze das Ablaufdatum auf 24 Stunden in die Zukunft
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
    // Setze das Cookie mit dem eingegebenen Passwort
    document.cookie = `password=${password}; path=/; expires=${expires.toUTCString()}`;

    // Leite den Benutzer zur geschützten Seite weiter
    setTimeout(() => {
      router.push('/overview');
    }, 500);
  } else {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }
  };

  return (
    <StyledDiv>
      <Row justifyContent='center' alignItems='center'>
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} animate={fadeOut ? 'exit' : 'initial'} variants={fadeOutAnimation}>
        <Column justifyContent='center' alignItems='center'>
                <ScrollAnimation>
                <ResponsiveImage alt='Louis Christ' src='/tobedeleted/LouisMain.jpg' width='150px' borderRadius='999px'/>
                </ScrollAnimation>
                <ScrollAnimation> <AnimatedHeadline text='Portfolio' /></ScrollAnimation>
               <ScrollAnimation>
                    <form onSubmit={onFormSubmit}>
                        <Text textAlign='center'><label htmlFor="password">Passwort</label></Text>
                        <Column alignItems='center'>
                        <motion.div initial="initial" animate={shake ? "shake" : "initial"} variants={shakeAnimation}>
                        <StyledTextInput placeholder='Passwort' password onChange={setPassword}/>
                        </motion.div>
                        <Space height={3}/>
                        <StyledButton type="submit">Login</StyledButton>
                        </Column>
                    </form>
                    </ScrollAnimation>
        </Column>
        </motion.div>
      </Row>
    </StyledDiv>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Prüfen, ob das Passwort-Cookie gesetzt ist
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const password = cookies['password'];

  if (password == 'louis_bewerbung') {
    // Wenn das Passwort-Cookie gesetzt ist, leite den Benutzer zur geschützten Seite weiter
    return {
      redirect: {
        destination: '/overview',
        permanent: false,
      },
    };
  }

  // Wenn das Passwort-Cookie nicht gesetzt ist, zeige die Login-Seite an
  return { props: {} };
};
