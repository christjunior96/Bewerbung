import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { allowPost } from "../middlewares";
import cookie from "cookie";

export default allowPost(async function handler(req, res) {
  // [2] Auflösung des Bodys
  // //////////////////////////////////////////////////////////////

  const data = req.body;
  const { otpCode } = data;

  // [3] Form Validation
  // //////////////////////////////////////////////////////////////

  if (!otpCode) {
    res.status(422).json({ message: "No otp provided" });
    return;
  }

  // [4] Check for login
  // //////////////////////////////////////////////////////////////

  //Find user with the email
  const otp = await prisma.otp.findFirst({
    where: { otpvalue: otpCode },
  });

  //Not found - send error res
  if (!otp) {
    res.status(422).json({ message: "otp not found" });
    return;
  }

  const currentTime = new Date();

  //console.log(otp.expiration.getTime() + '  ' + currentTime.getTime())
  console.log(Date.parse(otp.expiration) + "  " + Date.parse(currentTime));

  if (Date.parse(otp.expiration) < new Date() / 1000) {
    res.status(422).json({ message: "otp expired" });
    return;
  }

  const updateOtp = await prisma.otp.update({
    where: { id: otp.id },

    data: {
      activated: true,
    },
  });

  // if (otp.activated == true) {
  //   res.status(422).json({ message: 'otp already in use' });
  //   return;
  // }

  // const checkPassword = await bcrypt.compare(password, user.password);

  // // await compare(credentials.password, result.password);
  // //Incorrect password - send response
  // if (!checkPassword) {
  //     res.status(422).json({ message: 'Username or password wrong' });
  //     return;
  // }

  let user;

  if (updateOtp.activated == true) {
    console.log("updateotp is valid");
    user = await prisma.user.findFirst({
      where: { userId: otp.userId },
    });

    if (user.role !== "admin") {
      res.status(422).json({ message: "You dont have permission here" });
      return;
    }
  }

  console.log(user);

  if (user !== null) {
    if (user.confirmedAccount !== null) {
      const claims = { sub: user.userId, role: 0 };
      const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60,
          path: "/",
        })
      );

      const updateOtp = await prisma.otp.delete({
        where: { id: otp.id },

        // data: {
        //   activated: true,
        // },
      });

      res.json({ message: "Welcome back !" });
    } else {
      res.status(422).json({ message: "User is not verified yet" });
      return;
    }
  } else {
    res.status(422).json({ message: "something went wrong" });
    return;
  }
});
