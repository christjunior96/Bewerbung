import {prisma} from "../../../lib/prisma";
import { authenticated, allowGet } from './auth/middlewares' 
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowGet(authenticated( async function handler(req: NextApiRequest, res: NextApiResponse, decodedId: number) {
  // [2] QUERY request
  // //////////////////////////////////////////////////////////////

  //   const currentDate = new Date()
  //   currentDate.setHours(currentDate.getHours() - 24)
  const user = await prisma.user.findFirst({
        where: {
          userId: {
              equals: decodedId,
          },
      },
  });

  if (user !== null) {

    const userData = {
        "userId": user.userId,
        "registeredAt": user.registeredAt,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
    }
    res.json({ data: userData });
  } else {
    res.status(422).json({ message: "something went wrong" });
    return null;
  }
}));
