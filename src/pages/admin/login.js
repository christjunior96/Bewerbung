import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseurl } from "../../../utils/constants";
import Link from "next/link";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    // //Getting value from useRef()
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;
    //Validation
    if (!email || !email.includes("@") || !password) {
      setErrMessage("Die eingegebenen Daten sind fehlerhaft");
      return;
    }

    const userInput = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${baseurl}/api/auth/admin/sendotp`,
        userInput,
        {}
      );

      setMessage(res.data.message);
      setErrMessage("");
      setOtpSend(true);
    } catch (error) {
      const e = error.response.data.message;
      setErrMessage(e);
      setMessage("");
      return;
    }
  };

  const onFormSubmitLogin = async (e) => {
    e.preventDefault();
    // //Getting value from useRef()
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;
    //Validation
    if (!otp) {
      setErrMessage("Die eingegebenen Daten sind fehlerhaft");
      return;
    }

    const userInput = {
      otpCode: otp,
    };

    try {
      const res = await axios.post(
        `${baseurl}/api/auth/admin/login`,
        userInput,
        {}
      );

      setMessage(res.data.message);
      setErrMessage("");

      // //Await for data for any desirable next steps
      // //const data = await res.json();
      // console.log(res.data.authToken);

      Router.push("/admin/dashboard");
    } catch (error) {
      const e = error.response.data.message;
      setErrMessage(e);
      setMessage("");
      return;
    }
  };

  return (
    <>
      <div>
        <main>
          <div>
            <h1>Admin Login</h1>

            {otpSend == false ? (
              <>
                <form onSubmit={(e) => onFormSubmit(e)}>
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
                  <button type="submit">Log In</button>

                  {errMessage && (
                    <>
                      <p>{errMessage}</p>
                    </>
                  )}
                </form>
              </>
            ) : (
              <>
                <form onSubmit={(e) => onFormSubmitLogin(e)}>
                  <label htmlFor="loginOtp">Bestätigungscode</label>
                  <input
                    id="loginOtp"
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button type="submit">verifizieren</button>

                  {errMessage && (
                    <>
                      <p>{errMessage}</p>
                    </>
                  )}
                </form>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
