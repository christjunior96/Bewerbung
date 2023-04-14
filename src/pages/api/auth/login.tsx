import bcrypt from 'bcrypt';
import {prisma} from '../../../../lib/prisma'
import { sign } from 'jsonwebtoken'
import { allowPost } from './middlewares';
import cookie from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowPost(async function handler(req: NextApiRequest, res: NextApiResponse) {

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
    res.status(422).json({message:'Invalid input - Youre email does have a wrong format',});
    return;
  }

  if (!password) {
    res.status(422).json({message:'Invalid input - Please provide a password'});
    return;
  }




  // [4] Check for login
  // //////////////////////////////////////////////////////////////

   //Find user with the email  
   const user = await prisma.user.findFirst({
    where: { email: email }
    });

    //Not found - send error res
    if (!user) {
        res.status(422).json({ message: 'Username or password wrong' });
        return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    // await compare(credentials.password, result.password);
    //Incorrect password - send response
    if (!checkPassword) {
        res.status(422).json({ message: 'Username or password wrong' });
        return;
    }

    if (user !== null)
    {
        if(user.confirmedAccount !== null) {
            const claims = {sub: user.userId, role: user.role == 'admin' ? 0 : 1};
            const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' })

            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
              // Javascript zb. im Browser hat keinen Zugriff auf Cookie, bzw. ist nicht in der Lage
              // den Cookie auszulesen
              httpOnly: true,
              // Cookie wird nur über https gesendet
              secure: process.env.NODE_ENV !== 'development',
              // sameSite 
              // Das neue Attribut, das mittlerweile von den meisten Browsern unterstützt wird, soll verhindern, 
              // dass Cookies bei Cross-Site-Requests vom Browser wie bisher automatisch mitgesendet werden 
              // und so das Risiko des Verlusts von vertraulichen Informationen minimieren und, unter anderem, 
              // einen Schutz vor Cross-Site-Request-Forgery bieten.

              // Im Modus strict wird das geschützte Cookie bei absolut keinem Cross-Site-Request mitgesendet. 
              // Dies betrifft bereits das Klicken auf einen einfachen Link. Klickt ein Benutzer auf einer 
              // Webseite auf einen Link zu einer anderen, geschützten Webseite, z. B. einem GitHub Repository, 
              // wird er gebeten sich dort zunächst anzumelden, auch wenn er eigentlich noch eine gültige Session besitzt.
              sameSite: 'strict',
              //
              //maxAge: 60 * 60 * 24 * 7, // Angabe in Sekunden - 60x60 = 3600 - 1h Gültigkeit * 24 1D * 7
              maxAge: 60 * 60,
              path: '/'
            }))
            res.json({link: user.role == 'admin' ? '/admin' : '/profile'})
            // res.json({authToken: jwt})
        } else {
            res.status(422).json({ message: 'User is not verified yet. Please confirm youre email' });
            return;
        }
        
    }
    else {
        res.status(422).json({ message: 'something went wrong' });
        return;
    }


});