import Head from "next/head";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Theme from "../contexts/ThemeContext";
import { APP_TITLE } from "../assets/constants";
import Image from "next/image";
import Main from "../components/Main";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    console.log("----__>", loading);
  }, []);

  if (loading) {
    return (
      <section
        className="w-screen h-screen flex justify-center items-center bg-black"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={
            "https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
          }
          alt=""
          style={{
            width: "max-content",
            height: "15em",
          }}
        />
      </section>
    );
  } else {
    return (
      <div className="overflow-x-hidden ">
        <Theme>
          <Head>
            <link rel="shortcut icon" className="rotate-45" href="/favi.png" />
            <title>{APP_TITLE}</title>
          </Head>
          <div className="">
            <Main/>
            <div className={`md:pl-[6rem]`}>
              <Component {...pageProps} />
            </div>
          </div>
          {/* <Footer /> */}
        </Theme>
      </div>
    );
  }
}

export default MyApp;
