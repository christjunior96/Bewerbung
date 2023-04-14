import {prisma} from "../../../../lib/prisma";
import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { baseurl } from "../../../../utils/constants";
import { allowPost } from "./middlewares";
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowPost(async function handler(req:NextApiRequest, res:NextApiResponse) {
  // [2] Auflösung des Bodys
  // //////////////////////////////////////////////////////////////

  const data = req.body;
  const { email } = data;

  // [3] Form Validation
  // //////////////////////////////////////////////////////////////

  if (!email) {
    res
      .status(422)
      .json({ message: "Invalid input - Please provide an email" });
    return;
  }

  if (!email.includes("@")) {
    res.status(422).json({
      message: "Invalid input - Youre email does have a wrong format",
    });
    return;
  }

  // [4] Check for login
  // //////////////////////////////////////////////////////////////

  //Find user with the email
  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  //Not found - send error res
  if (!user) {
    res.status(422).json({
      message:
        "Wenn es einen User mit der Adresse gibt, wirst du eine E-Mail erhalten.",
    });
    return;
  }

  const claims = { sub: user.userId, role: 1 };
  const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: "2h" });

  // [6] Einrichtung Nodemailer und E-Mail Versand
  // //////////////////////////////////////////////////////////////

  const emailPass = "next-image";
  const senderMail = "test@marceldiaz.de";
  const recipientMail = email;

  // email account daten von one.com zum testen
  const transporter = nodemailer.createTransport({
    host: "send.one.com",
    port: 465,
    secure: true,
    auth: {
      user: "test@marceldiaz.de",
      pass: emailPass,
    },
  });

  var mailOptions = {
    from: `"Fliccy" <${senderMail}>`,
    to: `${recipientMail}`,
    subject: "Passwort zurücksetzen",
    html: `Hallo, um dein Passwort zurückzusetzen klicke bitte auf den nachstehenden Link: <a href="${baseurl}/forgot-password?reset=${jwt}">Bestätigung</a>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return "Error while sending email" + err;
    } else {
      console.log("Email sent");
      return "Email sent";
    }
  });

  res.status(201).json({ message: "OK" });
  // res.json(result)
});
