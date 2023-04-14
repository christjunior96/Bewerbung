import bcrypt from "bcrypt";
import prisma from "../../../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { allowPost } from "../middlewares";
import cookie from "cookie";
import nodemailer from "nodemailer";

export default allowPost(async function handler(req, res) {
  // [2] Auflösung des Bodys
  // //////////////////////////////////////////////////////////////

  const data = req.body;
  const { email, password } = data;

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

  if (!password) {
    res
      .status(422)
      .json({ message: "Invalid input - Please provide a password" });
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
    res.status(422).json({ message: "Username or password wrong" });
    return;
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  // await compare(credentials.password, result.password);
  //Incorrect password - send response
  if (!checkPassword) {
    res.status(422).json({ message: "Username or password wrong" });
    return;
  }

  if (user.role !== "admin") {
    res.status(422).json({ message: "You dont have permission here" });
    return;
  }

  function getRandomCode(length) {
    var randomChars = "0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  const generatedOtp = getRandomCode(6);

  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 10);

  console.log(user);

  const otp = await prisma.otp.create({
    data: {
      otpvalue: generatedOtp,
      expiration: expirationDate,
      userId: user.userId,
    },
  });

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
    subject: "Bestätige dein Konto",
    html: `Hallo ${user.firstName}, dein Bestätigungscode zum Login lautet: ${generatedOtp}`,
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

  res.status(201).json({ message: "Otp sent!" });
  // res.json(result)
});
