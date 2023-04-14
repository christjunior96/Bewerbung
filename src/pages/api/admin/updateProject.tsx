import { hash } from "bcrypt";
import {prisma} from "../../../../lib/prisma";
import { authenticatedAdminApi, allowPost } from "../auth/middlewares";
import type { NextApiRequest, NextApiResponse } from 'next'
import { use } from "react";


function removeFieldFromJson(jsonString: string, fieldToRemove: string): string {
  const data: any[] = JSON.parse(jsonString);
  data.forEach((obj: {[key: string]: any}) => {
    delete obj[fieldToRemove];
  });
  return JSON.stringify(data);
}

function addPageToComponents(jsonString: string, pageId: number): string {
  const components = JSON.parse(jsonString)
  
  const componentsWithPage = components.map((component: any) => {
    return {
      ...component,
      pageId: pageId,
    }
  })
  
  return JSON.stringify(componentsWithPage)
}

function replacePTags(str: string): string {
  let result = str.replace(/<\/?p[^>]*>/gi, (match) => {
    if (match.includes('</')) {
      return '<br/>';
    } else {
      return '';
    }
  });
  
  result = result.replace(/(<br\s*\/?>)+<\/br\s*>/gi, '</br>');
  result = result.replace(/<br\s*\/?>/gi, '</br>');
  result = result.replace(/<\/br>\s*<\/br>/gi, '</br>');
  
  return result;
}

const readingTime = require('reading-time');

export default allowPost(
  authenticatedAdminApi(async function handler(req:NextApiRequest, res:NextApiResponse, decodedId:number) {
   
    
    const data = req.body;
    const { id, userInput, components } = data;

    const { title, pw, publish, link, seoDescription, logoUrl, image, subtitle, imageAlt } = userInput;


    var time = 0;


    components.forEach((component: any) => {
      if(component.text) time = time + readingTime(component.text).minutes;
      if(component.text1) time = time + readingTime(component.text1).minutes;
    })

    const page = await prisma.page.updateMany({
      where: {
        id: id
      },
      data: {
        title: title,
        password: pw,
        imageAlt: imageAlt,
        description: seoDescription,
        link: link,
        readMinutes: Math.round(time)*2,
        image: image,
            subtitle: subtitle,
        logoUrl: logoUrl
      }
    })


   
    await prisma.$transaction(async (tx) => { 
      const deletedItems = await tx.component.deleteMany({
        where: {
          pageId: id
        },
      })
      
      const createMany = await tx.component.createMany({
        data: JSON.parse(addPageToComponents(removeFieldFromJson(removeFieldFromJson(replacePTags(JSON.stringify(components)),'id'),'pageId'),id))
      })
    }
  )



    res.status(200).json({ message: "Created Project successfully" });
    return;
  })
);

