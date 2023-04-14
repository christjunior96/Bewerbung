import { hash } from "bcrypt";
import {prisma} from "../../../../lib/prisma";
import { authenticatedAdminApi, allowPost } from "../auth/middlewares";
import type { NextApiRequest, NextApiResponse } from 'next'

export default allowPost(
  authenticatedAdminApi(async function handler(req:NextApiRequest, res:NextApiResponse, decodedId:number) {
   
    
    const data = req.body;
    const { title, pw, publish, link, seoDescription, type, image, subtitle, imageAlt } = data;

    console.log("Datum: "+ publish)

    // create Project
    const page = await prisma.page.create({
        data: {
            title: title,
            link: link,
            type: type,
            image: image,
            subtitle: subtitle,
            imageAlt: imageAlt,
            password: pw,
            description: seoDescription,
            published_at: publish
        }
    })


    res.status(200).json({ message: "Created Project successfully" });
    return;
  })
);
