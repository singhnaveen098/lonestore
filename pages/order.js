import React, { useEffect } from "react";
import Order from "../models/Order";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import Head from "next/head";

const Myorder = ({ orderdata, clearcartorder, setloggedin }) => {
  const router = useRouter();
  useEffect(() => {
    const validate = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/tokenvalid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      let data = await a.json();
      if (Object.keys(data).includes("expired")) {
        localStorage.removeItem("token");
        setloggedin(false);
        router.push("/admin/login");
      }
    };
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      validate();
      if (router.query.ccart == 1) {
        clearcartorder();
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <Head>
        <title>Order Confirmatiom - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-md title-font text-gray-500 tracking-widest">
              LONESTORE
            </h2>
            <h1 className="text-gray-900 text-xl sm:text-3xl title-font font-medium mb-4">
              Order Id: #{orderdata.orderid}
            </h1>
            <p className="leading-relaxed mb-4 font-semibold">
              Your order is placed successfully. Your payment is{" "}
              {orderdata.status}.
            </p>
            <p className="leading-relaxed mb-4 font-semibold">
              Your order is placed on{" "}
              {new Date(orderdata.createdAt).toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="grid grid-cols-3 text-center border-t border-gray-200 mt-4 mb-2 justify-between">
              <a className="py-2 mx-2 text-lg px-1">Item Details</a>
              <a className="py-2 mx-2 text-lg px-1">Quantity</a>
              <a className="py-2 mx-2 text-lg px-1">Price</a>
            </div>
            {Object.keys(orderdata.products).map((item) => (
              <div
                key={item}
                className="grid grid-cols-3 text-center border-t border-gray-200 py-2"
              >
                <span className="mx-2 text-gray-500">
                  {orderdata.products[item].name}
                </span>
                <span className="mx-2 text-gray-500">
                  {orderdata.products[item].qty}
                </span>
                <span className="mx-2 text-gray-900">
                  ₹
                  {orderdata.products[item].price *
                    orderdata.products[item].qty}
                  .00
                </span>
              </div>
            ))}
            <div className="flex border-t border-gray-200 py-2">
              <span className="title-font font-medium text-2xl text-gray-900">
                Total: ₹{orderdata.amount}.00
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="h-auto lg:w-1/2 w-full object-contain object-center rounded"
            src="/order4.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.mongouri);
  }
  const order = await Order.findById(context.query.id);
  return { props: { orderdata: JSON.parse(JSON.stringify(order)) } };
}

export default Myorder;
