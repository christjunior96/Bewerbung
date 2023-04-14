
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios"
import {baseurl} from "../../utils/constants"
import Link from "next/link";
import Router from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookie from 'cookie';

export default function Login(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");


  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // //Getting value from useRef()
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;
    //Validation
    if (!email || !email.includes('@') || !password) {
        setErrMessage('Die eingegebenen Daten sind fehlerhaft')
        return;
    }



    const userInput = {
      email: email,
      password: password,
    }

    try{
      const res = await axios.post(`${baseurl}/api/auth/login`, userInput, {
      method: 'POST',
      headers: {'Content-type':'application/json'}
    })

    setMessage(res.data.message)
    setErrMessage('')

    // //Await for data for any desirable next steps
    // //const data = await res.json();
    // console.log(res.data.authToken);

    Router.push(res.data.link)


    }catch(e){
      if (typeof e === "string") {
        console.log(e); // works, `e` narrowed to string
      } else if (e instanceof Error) {
        setErrMessage(e.message) // works, `e` narrowed to Error
      }

      return
    }

};

  return (
    <>
      <div>
        <main >
          <div >
            <h1>Login</h1>
            <form onSubmit={(e) => onFormSubmit(e)} >
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              
              <label htmlFor="inputPassword">Passwort</label>
              <input
                id="inputPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <button
                type="submit"
              >
                Log In
              </button>

              {errMessage && (<><p>{errMessage}</p></>)}

              <p>Hinweis: Wenn der Login erfolgreich ist, steht der Authentifizierungstoken in der Console.</p>


         
            </form>

            <div>
                <Link href="/forgot-password" >
                  Passwort vergessen?
                </Link>
              </div>
          </div>
        </main>
      </div>
    </>
  );
}


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





  


