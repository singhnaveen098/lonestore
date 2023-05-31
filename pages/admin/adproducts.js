import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import mongoose from "mongoose";
import Product from "../../models/Product";

const cols = ["S.No", "Name", "Slug", "Image", "Size", "Color", "Quantity"];

const Adproducts = ({ data }) => {
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

  const updateqty = async (id, val) => {
    if (val >= 0) {
      let data = {
        _id: id,
        availableqty: val,
      };
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_host}/api/updateproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      let result = await a.json();
      console.log(result);
      if (Object.keys(result).includes("error")) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.success("Product quantity updated successfully", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/admin/adproducts");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Lonestore admin products</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="All products">
                <Table
                  aria-label="simple table"
                  sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {cols.map((val, index) => (
                        <TableCell
                          key={index}
                          className="text-lg text-center font-medium text-black"
                        >
                          {val}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((product, index) => (
                      <TableRow key={product._id}>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          {index + 1 + "."}
                        </TableCell>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          {product.slug}
                        </TableCell>
                        <TableCell className="text-md text-center break-words text-gray-900 font-medium whitespace-normal">
                          <img
                            alt="ecommerce"
                            className="m-auto h-[10vh] block"
                            src={product.img}
                          />
                        </TableCell>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          {product.size}
                        </TableCell>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          {product.color}
                        </TableCell>
                        <TableCell className="text-md text-center text-gray-900 font-medium whitespace-nowrap">
                          <div className="flex justify-center">
                            <IoMdRemoveCircleOutline
                              onClick={() => {
                                updateqty(
                                  product._id,
                                  product.availableqty - 1
                                );
                              }}
                              className="text-lg mr-2 cursor-pointer"
                            />
                            {product.availableqty}
                            <IoMdAddCircleOutline
                              onClick={() => {
                                updateqty(
                                  product._id,
                                  product.availableqty + 1
                                );
                              }}
                              className="text-lg ml-2 cursor-pointer"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.mongouri);
  }
  const product = await Product.find();
  return { props: { data: JSON.parse(JSON.stringify(product)) } };
}

export default Adproducts;
