import cookie from 'cookie'
import { allowGet } from './middlewares';
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowGet(async function handler(req: NextApiRequest, res: NextApiResponse) {

    res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/'
      }))

    res.status(200).json({ message: 'Logged out successfully' });
    return;

});
