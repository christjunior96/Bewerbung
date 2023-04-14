import axios from "axios";
import { baseurl } from "../../utils/constants";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Profile(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <p>Herzlich willkommen {props.userData.firstName}</p>
      <p>{JSON.stringify(props.userData)}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

async function logout (){
  try{
      const res = await axios.get(`${baseurl}/api/auth/logout`, {
      headers: {'Content-type':'application/json'}
    })
  }catch(e){
    console.log(e);
  }
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  // Holt sich die Cookies aus dem request
  var authCookie = context.req.headers.cookie;

  // Fragt die Daten ab und übergibt den Cookie im Header
  try {
    const res = await axios.get(`${baseurl}/api/profile`, {
      method: "GET",
      headers: { cookie: authCookie },
    });

    const userData = res.data.data
    return { props:  { userData }  };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
}

