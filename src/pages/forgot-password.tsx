
import { useState, useEffect } from "react";
import axios from "axios"
import {baseurl} from "../../utils/constants"
import { verify } from "jsonwebtoken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Register(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  // Form Submit zum ändern des Passworts
  const onFormSubmitToReset = async (e:any) => {
    e.preventDefault();

    if(!password || !verifyPassword){
      setErrMessage('Bitte fülle alle Felder aus')
      return;
    }
    if(password != verifyPassword){
      setErrMessage('Die Passwörter stimmen nicht überein')
      return;
    }

    if (password.trim().length < 7) {
      setErrMessage('Dein Passwort muss mindestens 7 Zeichen lang sein')
      return;
    }

    const data = {
      password: password,
      verifyPassword: verifyPassword
    }

    console.log('++++ kurz vor dem post')

    try{
      const res = await axios.post(`${baseurl}/api/auth/password-change`, data, {
      method: 'POST',
      headers: {
        Authorization: props.reset,
      },
    })


    setMessage(res.data.message)
    setErrMessage('')

    //Await for data for any desirable next steps
    //const data = await res.json();
    // console.log(data);
    }catch(error){
      if (typeof e === "string") {
        console.log(e.toUpperCase()) 
      } else if (e instanceof Error) {
        setErrMessage(e.message)
      }
      return
    }

  }
  // Form submit für Passwort vergessen
  const onFormSubmit = async (e:any) => {
    e.preventDefault();

    if (!email || !email.includes('@') ) {
        setErrMessage('Die eingegebenen Daten sind fehlerhaft')
        return;
    }

    const data = {
      email: email
    }


    try{
      const res = await axios.post(`${baseurl}/api/auth/password-reset`, data, {
      // headers: {'Content-type':'application/json'}
    })

    setMessage(res.data.message)
    setErrMessage('')

    //Await for data for any desirable next steps
    //const data = await res.json();
    // console.log(data);
    }catch(e){
      if (typeof e === "string") {
        console.log(e.toUpperCase()) 
      } else if (e instanceof Error) {
        setErrMessage(e.message)
      }
      
      return
    }

};

  return (
    <>
      <div>
        <main>
          <div>
            <h1>Passwort {props.verifiedLink == true ? (<>ändern</>):(<>vergessen</>)}</h1>
            


            {/* Überprüfen ob Link in Mail geklickt wurde. Jenachdem werden die Formularfelder
            zum Zurücksetzen des Passworts angezeigt */}
            {props.verifiedLink == false ? (
            <>
            <form onSubmit={(e) => onFormSubmit(e)} >
              <label htmlFor="loginEmail">Email</label>
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              
              <button
                type="submit"
              >
                Passwort zurücksetzen
              </button>
            </form>

            {message && (<><p>Wir haben dir eine E-Mail geschickt. Du kannst dein Passwort zurücksetzen indem du den Link anklickst.</p></>)}
              {errMessage && (<><p>{errMessage}</p></>)}
            </>
            ) : (
            <>
            <form onSubmit={(e) => onFormSubmitToReset(e)} >
            <label htmlFor="inputPassword">Passwort</label>
              <input
                id="inputPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

<label htmlFor="inputPasswordVerify">Passwort wiederholen</label>
              <input
                id="inputPasswordVerify"
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
              
              
              <button
                type="submit"
              >
                Passwort ändern
              </button>
            </form>

            {message && (<><p>Dein Passwort wurde erfolgreich geändert. Du kannst dich nun einloggen.</p></>)}
              {errMessage && (<><p>{errMessage}</p></>)}
            </>
            )}

            
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let serverResponse;
  let verifiedLink;

  // Überprüft ob es einen query context gibt
  // Bedeutet das Parameter in der URL mit übergeben werden
  if(context.query.reset) {
    const {reset}  = context.query;
    console.log('query vorhanden' + reset)


    // Überprüfen ob jwt valide ist
    verify(reset.toString(), process.env.JWT_SECRET, async function(err, decoded) {
      // err
      // decoded undefined
      if(!err && decoded) {
          verifiedLink = true;
  
      } else {
        verifiedLink = false;
        
      }
      
    });

    

    
    return { props: {  verifiedLink, reset } }




  } else {

    // let verifiedLink;
    // verifiedLink = true;
    // console.log('KEINE vorhanden') 
    verifiedLink = false;
    return { props: {  verifiedLink } }
  }



}





  


