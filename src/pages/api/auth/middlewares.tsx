import { JwtPayload, verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next'

// Funktion zur Überprüfung ob ein User authentifiziert ist
export const authenticated = (fn:any) => async (req: NextApiRequest, res: NextApiResponse) => {
  let decodedId;

  // Überprüfung ob es einen authorization Header in Form eines
  // Bearer Tokens gibt
  const authToken = req.headers.authorization?.split(' ')[1]|| req.cookies.auth ||  null;
  if(authToken != null){
    console.log('authorization header')
    console.log(authToken)
    verify(authToken, process.env.JWT_SECRET, async function (err, decoded) {
      // err
      // decoded undefined
  
      if (!err && decoded) {
        decodedId = decoded.sub as unknown as number;
        return await fn(req, res, decodedId);
      }
  
      res.status(401).json({ message: "Sorry, you are not authenticated" });
      return;
    });
  } 


  // Überprüfung ob eine ID von einem der möglichen authentifizierungsmethoden übergeben wurde
  if(decodedId != null){
    // res.status(200).json({ message: "authenticated" });
    console.log(decodedId)
    return;
  } else {
    res.status(401).json({ message: "mhh sorry, you are not authenticated" });
    return;
  }
};

// Funktion zur Überprüfung ob ein User authentifiziert ist
export const authenticatedAdminApi = (fn:any) => async (req: NextApiRequest, res: NextApiResponse) => {
  let decodedId;

  // Überprüfung ob es einen authorization Header in Form eines
  // Bearer Tokens gibt
  const authToken = req.headers.authorization?.split(' ')[1]|| req.cookies.auth ||  null;
  if(authToken != null){
    console.log('authorization header')
    console.log(authToken)
    verify(authToken, process.env.JWT_SECRET, async function (err, decoded) {
      // err
      // decoded undefined
  
      if (!err && decoded) {
        let role;
        decodedId = decoded.sub as unknown as number;
        role = decoded as JwtPayload;
        role = role.role
        if (role == 0) {
          return await fn(req, res, decodedId);}
      }
  
      res.status(401).json({ message: "Sorry, you are not authenticated" });
      return;
    });
  } 


  // Überprüfung ob eine ID von einem der möglichen authentifizierungsmethoden übergeben wurde
  if(decodedId != null){
    // res.status(200).json({ message: "authenticated" });
    console.log(decodedId)
    return;
  } else {
    res.status(401).json({ message: "mhh sorry, you are not authenticated" });
    return;
  }
};


export interface TokenInterface {
  payload:{
    sub: number;
    role: number;
    }  
  }
// Funktion zur Überprüfung ob ein User authentifiziert ist
export const authenticatedAdmin = (fn:any) => async (req: NextApiRequest, res: NextApiResponse) => {
  let decodedId;

  // Überprüfung ob es einen authorization Header in Form eines
  // Bearer Tokens gibt
  const authToken = req.headers.authorization?.split(' ')[1]|| req.cookies.auth ||  null;
  if(authToken != null){
    console.log('authorization header')
    verify(authToken, process.env.JWT_SECRET, async function (err, decoded) {
      // err
      // decoded undefined
      let token = decoded as TokenInterface
  
      if (!err && decoded) {
        decodedId = decoded.sub;
        console.log(token.payload.role)
        if(token.payload.role == 0){
          return await fn(req, res, decodedId);
        }
      }
  
      res.status(401).json({ message: "Sorry, you are not authenticated" });
      return;
    });
  } 


  // Überprüfung ob eine ID von einem der möglichen authentifizierungsmethoden übergeben wurde
  if(decodedId != null){
    // res.status(200).json({ message: "authenticated" });
    console.log(decodedId)
    return;
  } else {
    res.status(401).json({ message: "mhh sorry, you are not authenticated" });
    return;
  }

  

};


// POST requests only
export const allowPost = (fn:any) => async (req: NextApiRequest, res:NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(401).send({ message: "Only POST requests allowed" });
    return;
  }
  return await fn(req, res);
};

// GET requests only
export const allowGet = (fn:any) => async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(401).send({ message: "Only GET requests allowed" });
    return;
  }
  return await fn(req, res);
};
