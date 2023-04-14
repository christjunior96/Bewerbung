import {prisma} from "../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { allowGet } from "./middlewares";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export interface TokenInterface {
       payload:{
        sub: number;
         role: number;
     }  
  }

export default allowGet(async function handler(req:NextApiRequest, res:NextApiResponse) {

  // [2] Auflösen des Request querys
  // //////////////////////////////////////////////////////////////
  const {query: { account, value },method,} = req;
  const sentVerificationToken = req.query;
  let decodedUserId;

  jwt.verify(sentVerificationToken.account ? sentVerificationToken.account.toString() : "",process.env.JWT_SECRET,async function (err: any, decoded: any) {
      if (!err && decoded) {
        decodedUserId = decoded.sub;
        // let expDate = decoded.exp;

        // // // User took too long to enter the code
        // if (expDate < new Date().getTime()/1000) {
        //     res.status(401).json({message: 'Sorry, your token is expired'})
        //     return;
        // }

        // check if user is already verified
        const userVerified = await prisma.user.findFirst({
          where: { userId: decodedUserId },
        });

        if (userVerified?.confirmedAccount !== null) {
          res.status(401).json({ message: "User already verified" });
          return;
        }

        // Set date for confirmation time
        const updateUser = await prisma.user.update({
          where: { userId: decodedUserId },

          data: {
            confirmedAccount: new Date(),
          },
        });


        res.status(200).json({ message: "User verified successfully" });
        return;

      } else {

        // JWT ERRORS
        if(err.name === 'TokenExpiredError') {
            res.status(401).send({message:'Sorry, your token is expired'});
            return;
          }

          if(err.name === 'JsonWebTokenError') {
            res.status(401).send({message:'Sorry, we couldnt find something to validate'});
            return;
          }

        if(err) {
            res.status(401).json({ message: err });
            return;
        }

        return;
      }
    }
  );
})
