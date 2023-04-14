import axios from "axios";
import { verify } from "jsonwebtoken";
import { baseurl } from "../../../utils/constants";
import Router from "next/router";
import { Fragment, default as React } from "react";
import prisma from "../../../lib/prisma";
import { useState, useEffect } from "react";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Feed(props) {
  const [postStatus, setPostStatus] = useState(props.posts);

  async function editPost(enable, id, e) {
    e.preventDefault();

    console.log(enable);

    const userInput = {
      postId: id,
      edit: enable ? true : false,
    };

    try {
      const res = await axios.post(
        `${baseurl}/api/auth/admin/edit-post`,
        userInput,
        {}
      );

      console.log("post aktiviert");

      var currentPostStatus = postStatus;
      currentPostStatus.map((el) => {
        if (el.id === id) {
          el.disabled = !enable ? true : false;
        }
        console.log(el.id);
        // el[id].disabled = true;
      });
      console.log(currentPostStatus);

      // currentPostStatus[id].disabled = true;

      setPostStatus([...currentPostStatus]);
      //Router.reload(window.location.pathname)
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <>
      <div
        style={{
          margin: "2em",
          maxWidth: "1200px",
        }}
      >
        {/* {console.log(props.userCount)} */}
        <h1>Alle Posts</h1>

        {postStatus.map((post) => (
          <React.Fragment key={post.id}>
            <p>{post.id}</p>
            <p>{post.email}</p>
            <p>{post.desc}</p>
            <p>{post.disabled && "true"}</p>
            <p>{!post.disabled && "false"}</p>

            <button
              disabled={post.disabled}
              onClick={(e) => editPost(false, post.id, e)}
            >
              Post deaktivieren
            </button>
            <button
              disabled={!post.disabled}
              onClick={(e) => editPost(true, post.id, e)}
            >
              Post aktivieren
            </button>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Holt sich die Cookies aus dem request
  var authCookie = context.req.cookies.auth || null;
  let decodedId;
  let role;

  // Überprüfung ob Cookie vorhanden ist
  if (!authCookie) {
    console.log("authCookie ist leer");
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }

  console.log("authCookie :: " + authCookie);
  // Überprüfung ob Cookie gültig ist
  verify(authCookie, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      decodedId = decoded.sub;
      role = decoded.role;
      console.log("decodedId " + decodedId + "role::" + decoded.role);
    } else {
      console.log("keine authentifizierung vorhanden");
      return {
        redirect: {
          permanent: false,
          destination: "/admin/login",
        },
      };
    }
  });

  if (role != 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
    };
  }

  if (decodedId != null) {
    //fetchen von daten
    const user = await prisma.user.findFirst({
      where: {
        userId: {
          equals: decodedId,
        },
      },
    });

    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return { props: { posts } };
  } else {
    return { props: {} };
  }

  // // Fragt die Daten ab und übergibt den Cookie im Header
  // try {
  //   const res = await axios.get(`${baseurl}/api/auth/admin/dash`, {
  //     method: "GET",
  //     headers: { cookie: authCookie },
  //   });

  //   const userData = res.data.data

  //
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/admin/login",
  //     },
  //   };
  // }
}
