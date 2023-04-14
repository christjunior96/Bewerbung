// lib/post.ts
import {prisma} from "./prisma";

interface PaginationOptions {
  cursor?: number; // Cursor-ID als Startpunkt
  take?: number;   // Anzahl der Datensätze, die pro Seite abgerufen werden sollen
  topic?: string;
}

export async function getPaginatedPages({
  cursor,
  take,
  topic,
}: PaginationOptions) {

    const currentDate = new Date();

  const posts = await prisma.page.findMany({
    where:{
        type: topic,
        published_at: {
            lt: currentDate
        }, 
        image: {not: null},
    },
    orderBy:{
        published_at: 'desc'
    },
    take: take, // +1 um zu prüfen, ob es noch weitere Seiten gibt
    skip: cursor,
  });

  const count = await prisma.page.count({
    where:{
        type: topic,
        published_at: {
            lt: currentDate
        }, 
        image: {not: null},
    },
    orderBy:{
        published_at: 'desc'
    },
  });

  console.log("Zahl: "+count)
  console.log("Posts: "+posts)
  

  return {
    posts: posts,
    count: count,
  };
}