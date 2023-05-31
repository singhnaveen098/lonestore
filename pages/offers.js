import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Offers = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Exciting Offers For You - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      offer
    </div>
  );
};

export default Offers;
