import { hash } from 'bcrypt';
import {prisma} from '../../../../lib/prisma'
import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer"
import { baseurl } from '../../../../utils/constants'
import { allowPost } from './middlewares';
import type { NextApiRequest, NextApiResponse } from 'next'


export default allowPost(async function handler(req:NextApiRequest, res:NextApiResponse) {

  // [2] Auflösung des Bodys 
  // //////////////////////////////////////////////////////////////

  const data = req.body;
  const { email, password } = data;


  // [3] Form Validation
  // //////////////////////////////////////////////////////////////

  if(!email) {
    res.status(422).json({message:'Invalid input - Please provide an email',});
    return;
  }

  if(!email.includes('@')) {
    res.status(422).json({message:'Invalid input - Youre input does have a wrong format',});
    return;
  }

  if (!password) {
    res.status(422).json({message:'Invalid input - Please provide a password'});
    return;
  }

  if (password.trim().length < 7) {
    res.status(422).json({message:'Invalid input - password should be at least 7 characters long.'});
    return;
  }


  // [4] Check for existing user
  // //////////////////////////////////////////////////////////////

  const existingUser = await prisma.user.findFirst({where: { email: email } });

  // Wenn der User existiert und der Account bereits bestätigt wurde
  if (existingUser && existingUser.confirmedAccount != null) {
    res.status(422).json({ message: 'User exists already and/or confirmed' });
    return;
  }

  // Wenn der User existiert aber nicht bestätigt wurde
  // Pattern zum aktualisieren der Daten im Falle einer noch ausstehenden Kontobestätigung

  if(existingUser) {
    const result = await prisma.user.update({
      where: { userId: existingUser.userId },
      data: {
        email: email,
        firstName: 'Test',
        lastName: 'test',
        password: await hash(password, 12),
        }
    });
  } 
  // Falls User noch nicht existieren soll
  else {
    const result = await prisma.user.create({
      data: {
      email: email,
      firstName: 'Test',
      lastName: 'test',
      password: await hash(password, 12),
      }
    });
  }

  

  // [5] Anlegen von Token
  // //////////////////////////////////////////////////////////////

  const currentUser  = await prisma.user.findFirst({where: { email: email } });
  const claims = {sub: currentUser?.userId, role: 1};
  const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '2h' })


  // [6] Einrichtung Nodemailer und E-Mail Versand
  // //////////////////////////////////////////////////////////////

  const emailPass = "next-image"
  const senderMail = "test@marceldiaz.de"
  const recipientMail = email

  // email account daten von one.com zum testen
  const transporter = nodemailer.createTransport({
      host: "send.one.com",
      port: 465,
      secure: true,
      auth: {
          user: "test@marceldiaz.de",
          pass: emailPass
      }
  })

  var mailOptions = {
    from: `"Fliccy" <${senderMail}>`,
    to: `${recipientMail}`,
    subject: "Bestätige dein Konto",
    html : `Herzlich willkommen! Um deine Registrierung abzuschließen klicke bitte auf den nachstehenden Link: <a href="${baseurl}/register?verify=${jwt}">Bestätigung</a>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return ('Error while sending email' + err)
    }
    else {
      console.log("Email sent");
      return ('Email sent')
    }
  });


  res.status(201).json({ message: 'Created user! Check email to verify user!' });
  // res.json(result)
})