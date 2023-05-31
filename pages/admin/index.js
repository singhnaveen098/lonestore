import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    const validate = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/tokenvalid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("adtoken"),
        },
      });
      let data = await a.json();
      if (Object.keys(data).includes("expired")) {
        localStorage.removeItem("adtoken");
        router.push("/admin/login");
      }
    };
    if (!localStorage.getItem("adtoken")) {
      router.push("/admin/login");
    } else {
      validate();
    }
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <Head>
        <title>Lonestore admin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <SalesOverview />
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={4}>
              <DailyActivity />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ProductPerfomance title="Product Perfomance"/>
            </Grid>
            {/* <Grid item xs={12} lg={12}>
              <BlogCard />
            </Grid> */}
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Index;
