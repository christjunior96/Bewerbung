import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseurl } from "../../utils/constants";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Register(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    if (!email || !email.includes("@") || !password) {
      setErrMessage("Die eingegebenen Daten sind fehlerhaft");
      return;
    }

    if (passwordVerify != password) {
      setErrMessage("Deine eingegeben Passwörter stimmen nicht überein");
      return;
    }

    if (password.trim().length < 7) {
      setErrMessage("Dein Passwort muss mindestens 7 Zeichen lang sein");
      return;
    }

    const userInput = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${baseurl}/api/auth/signup`, userInput, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });

      setMessage(res.data.message);
      setErrMessage("");

      //Await for data for any desirable next steps
      //const data = await res.json();
      // console.log(data);
    } catch (e: unknown) {
      if (typeof e === "string") {
        console.log(e);
      } else if (e instanceof Error) {
        setErrMessage(e.message);
      }
      return;
    }
  };

  return (
    <>
      <div>
        <main>
          <div>
            <h1>Register</h1>
            <form
              onSubmit={(e) => onFormSubmit(e)}
            >
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
              <label htmlFor="inputPassword">Passwort wiederholen</label>
              <input
                id="inputPasswordVerify"
                type="password"
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
              />
              <button type="submit">
                Log In
              </button>

              <div>
                <p>Du hast bereits ein Konto? </p>
                <Link href="/login">
                  Jetzt einloggen
                </Link>
              </div>

              {message && (
                <>
                  <p>
                    Wir haben dir eine E-Mail geschickt. Bitte bestätige dein
                    Konto indem du den Link aus der E-Mail anklickst.
                  </p>
                </>
              )}
              {errMessage && (
                <>
                  <p>{errMessage}</p>
                </>
              )}
              {props.serverResponse && (
                <>
                  <p>{props.serverResponse}</p>
                </>
              )}
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) =>  {
  let serverResponse;

  // Überprüft ob es einen query context gibt
  // Das Bedeutet das Parameter in der URL mit übergeben werden
  // Parameter können von der Singup Api kommen: ${baseurl}/register?verify=${jwt}
  // verify=jwt

  if (context.query.verify) {

    // Überprüfe ob es ein verify paramete rin der url gibt
    const { verify } = context.query;
    console.log("query vorhanden" + verify);

    // Abfrage request an api
    const res = await axios.get(`${baseurl}/api/auth/verify/?account=${verify}`, {
      headers: { "Content-type": "application/json" },
    })
    .then((response) => {  serverResponse = "Super, dein Account wurde erfolgreich bestätigt" })
    .catch((error) => {

      // Error Codes
      if (error.response.data.message === "JsonWebTokenError") {
          serverResponse = "Entschuldigung, es ist etwas schief gelaufen.";
      } 
      if (error.response.data.message === "TokenExpiredError") {
        serverResponse = "Der Token ist nicht mehr gültig";
      } 

      

      // Alle anderen errors
      serverResponse = error.response.data.message;
      console.log('-- error message --' + ' ' + error.response.data.message + ' serverResponse ' +  ' ' + serverResponse);
    })

    // Rückmeldung Server response
    if(!serverResponse) {
      serverResponse = null;
    }
    return { props: { serverResponse } };

  } else {

    // Die Seite wurde ohne jegliche Parameter aufgerufen
    console.log("KEINE vorhanden");
    return { props: {} };
  }
}
