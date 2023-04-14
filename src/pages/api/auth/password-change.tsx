import { hash } from "bcrypt";
import {prisma} from "../../../../lib/prisma";
import { authenticated } from "./middlewares";
import { allowPost } from "./middlewares";
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowPost(
  authenticated(async function handler(req:NextApiRequest, res:NextApiResponse, decodedId:number) {
    // if (!req.headers.authorization) {
    //   res.status(400).send({ message: "wrong header" });
    //   return;
    // }

    // [2] Auflösung des Bodys
    // //////////////////////////////////////////////////////////////

    const data = req.body;
    const { password, verifyPassword } = data;

    // [3] Form Validation
    // //////////////////////////////////////////////////////////////

    if (!password) {
      res
        .status(422)
        .json({ message: "Invalid input - Please provide a password" });
      return;
    }

    if (!verifyPassword) {
      res.status(422).json({
        message: "Invalid input - Please provide a password to verify",
      });
      return;
    }

    if (password !== verifyPassword) {
      res
        .status(422)
        .json({ message: "Invalid input - Password doesnt match" });
      return;
    }

    if (password.trim().length < 7) {
      res.status(422).json({
        message: "Invalid input - Password must have at least 7 caracters",
      });
      return;
    }

    // check if user is in database
    const userExists = await prisma.user.findFirst({
      where: { userId: decodedId },
    });

    if (userExists == null) {
      res.status(401).json({ message: "User doesnt exist" });
      return;
    }

    // Set date for confirmation time
    const updateUser = await prisma.user.update({
      where: { userId: decodedId },

      data: {
        password: await hash(password, 12),
      },
    });

    res.status(200).json({ message: "Changed password successfully" });
    return;
  })
);
