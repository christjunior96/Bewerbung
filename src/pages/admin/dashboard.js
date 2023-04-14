import axios from "axios";
import { verify } from "jsonwebtoken";
import Router from "next/router";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Dashboard(props) {
  return (
    <>
      <div>
        {/* {console.log(props.userCount)} */}
        <p>Hallo {!props.userData ? "" : props.userData.firstName}!</p>
        <p>Registrierte Nutzer {!props.userCount ? 0 : props.userCount}</p>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Holt sich die Cookies aus dem request
  var authCookie = context.req.cookies.auth || null;
  let decodedId;
  let role;
  let userData;

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
      console.log("decodedId " + decodedId);
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

    if (user !== null) {
      userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    }

    // GET Registriete Nutzer auf der Plattform
    const userCount = await prisma.user.count({
      where: {
        role: {
          equals: "user",
        },
      },
    });

    return { props: { userData, userCount } };
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
