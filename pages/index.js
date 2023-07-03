import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../models/Product";
import React, { useEffect, useState } from "react";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>LoneStore.com - Be Lone, Be Sexy</title>
        <meta
          name="description"
          content="LoneStore.com - Be Lone, Be Sexy"
        />{" "}
        {/*lone is the new trend*/}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="text-gray-600 body-font">
          <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400"></div>
                <div className="max-w-xl mb-6">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-none">
                    Shop Now <br className="hidden md:block" />
                    The Best{" "}
                    <span className="inline-block text-deep-purple-accent-400">
                      New Collection Of The Year
                    </span>
                  </h2>
                  <p className="text-base text-gray-700 md:text-lg">
                    LoneStore is a great spot to find classic, timeless pieces
                    for men, women and kids. From comfy joggers and denim jeans
                    to stylish blouses and dress shirts, you’ll find everything
                    you need for a polished wardrobe.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center -mx-4 lg:pl-8">
                <div className="flex flex-col items-end px-3">
                  <img
                    className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                    src="/trouser.jpg"
                    alt=""
                  />
                  <img
                    className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                    src="/shoes.jpg"
                    alt=""
                  />
                </div>
                <div className="px-3">
                  <img
                    className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                    src="/jacket.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="max-w-xl my-10">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-none">
                Trending Now
              </h2>
            </div>
            <div className="grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4">
              {Object.keys(data).map((item) => {
                return (
                  <Link
                    passHref={true}
                    key={data[item]._id}
                    href={`/product/${data[item].slug}`}
                  >
                    <div className="p-4 my-6 w-full cursor-pointer shadow-2xl">
                      <a className="block relative rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="m-auto h-[25vh] sm:h-[30vh] md:h-[36vh] block"
                          src={data[item].img}
                        />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {data[item].category}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {data[item].name}
                        </h2>
                        <p className="mt-1">₹{data[item].price}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.mongouri);
  }
  const product = await Product.find();
  const sliced = Object.keys(product)
    .slice(0, 8)
    .reduce((result, key) => {
      result[key] = product[key];

      return result;
    }, {});
  return { props: { data: JSON.parse(JSON.stringify(sliced)) } };
}
