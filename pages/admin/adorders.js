import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
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
import { AiOutlineEdit } from "react-icons/ai";

const cols = [
  "S.No",
  "Items",
  "Date",
  "Order Id",
  "Amount",
  "Status",
  "Delivery Status",
  "Address",
];

const Adorders = ({ data }) => {
  const router = useRouter();
  const [pageorders, setpageorders] = useState([]);
  const [page, setpage] = useState(1);
  const [pagesize, setpagesize] = useState(0);

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

  useEffect(() => {
    if (data.length > 0) {
      setpagesize(Math.ceil(data.length / 10));
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    setpageorders(data.slice((page - 1) * 10, page * 10));
    // eslint-disable-next-line
  }, [page, data]);

  const handlenext = () => {
    setpage(page + 1);
  };

  const handleprev = () => {
    setpage(page - 1);
  };

  return (
    <>
      <Head>
        <title>Lonestore admin orders</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="All Orders">
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
                          className="text-lg text-left font-medium text-black"
                        >
                          {val}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageorders.map((order, index) => (
                      <TableRow key={order._id}>
                        <TableCell className="text-md text-left text-gray-900 font-medium whitespace-nowrap">
                          {(page-1)*10 + index + 1 + "."}
                        </TableCell>
                        <TableCell>
                          <Box>
                            {Object.keys(order.products).map((val, ind) => (
                              <p
                                key={ind}
                                className="text-md mb-1 text-gray-900 font-medium whitespace-nowrap text-left"
                              >
                                {order.products[val].name}:{" "}
                                {order.products[val].qty}
                              </p>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell className="text-md text-left text-gray-900 font-medium whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN"
                          )}
                        </TableCell>
                        <TableCell className="text-md text-left break-words text-gray-900 font-medium whitespace-normal">
                          {order._id}
                        </TableCell>
                        <TableCell className="text-md text-left text-gray-900 font-medium whitespace-nowrap">
                          ₹{order.amount}
                        </TableCell>
                        <TableCell className="text-md text-left text-gray-900 font-medium whitespace-nowrap">
                          {order.status}
                        </TableCell>
                        <TableCell className="text-md text-left text-gray-900 font-medium whitespace-nowrap">
                          <p className="flex items-center">
                            {order.deliverystatus}
                            <AiOutlineEdit className="ml-1 cursor-pointer" />
                          </p>
                        </TableCell>
                        <TableCell className="text-md text-gray-900 font-medium whitespace-nowrap text-left">
                          {`${order.address}, ${order.district}, ${order.state}-${order.pincode}`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </BaseCard>
            </Grid>
          </Grid>
          <div className="flex items-center justify-center flex-wrap mt-8">
            <button
              onClick={handleprev}
              disabled={page === 1}
              className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
            >
              ← Prev
            </button>
            <button
              onClick={handlenext}
              disabled={page === pagesize}
              className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
            >
              Next →
            </button>
          </div>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_host}/api/adorders`);
  const data = await res.json();
  return { props: { data: data } };
}

export default Adorders;
