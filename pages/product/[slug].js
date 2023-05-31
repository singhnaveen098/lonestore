import mongoose from "mongoose";
import Product from "../../models/Product";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Error from "next/error";
import Head from "next/head";

const Slug = ({ additem, buynow, product, variants, error }) => {
  const router = useRouter();
  const [pincode, setpincode] = useState();

  const checkavail = async () => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_host}/api/pinavail`);
    let parseddata = await data.json();
    if (Object.keys(parseddata).includes(pincode)) {
      toast.success("Service available at your pincode", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else
      toast.error("Sorry!! service not available at your pincode", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  };

  const refreshdata = (ncolor, nsize) => {
    const url = `${process.env.NEXT_PUBLIC_host}/product/${variants[ncolor][nsize]["slug"]}`;
    router.push(url);
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <Head>
          <title>{variants[product.color][product.size]["slug"]} - LoneStore.com</title>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
          />
        </Head>
        <div className="container px-5 py-12 mx-auto">
          <div className="mx-auto flex flex-wrap justify-center">
            <img
              alt="ecommerce"
              className="lg:h-[36vh] xl:h-[45vh] 2xl:h-[55vh] h-full object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                LoneStore
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name} ({product.size}/
                {product.color[0].toUpperCase() + product.color.slice(1)})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-blue-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 flex-wrap">
                <div className="flex mr-6 mt-2">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "white",
                          Object.keys(variants["white"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["white"])[0]
                        );
                      }}
                      className={`border-2 bg-white my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "white"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("black") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "black",
                          Object.keys(variants["black"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["black"])[0]
                        );
                      }}
                      className={`border-2 bg-black my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "black"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("red") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "red",
                          Object.keys(variants["red"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["red"])[0]
                        );
                      }}
                      className={`border-2 bg-red-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "red"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("green") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "green",
                          Object.keys(variants["green"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["green"])[0]
                        );
                      }}
                      className={`border-2 bg-green-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "green"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("blue") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "blue",
                          Object.keys(variants["blue"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["blue"])[0]
                        );
                      }}
                      className={`border-2 bg-blue-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "blue"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("purple") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "purple",
                          Object.keys(variants["purple"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["purple"])[0]
                        );
                      }}
                      className={`border-2 bg-purple-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "purple"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("pink") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "pink",
                          Object.keys(variants["pink"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["pink"])[0]
                        );
                      }}
                      className={`border-2 bg-pink-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "pink"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("yellow") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "yellow",
                          Object.keys(variants["yellow"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["yellow"])[0]
                        );
                      }}
                      className={`border-2 bg-yellow-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "yellow"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                  {Object.keys(variants).includes("gray") && (
                    <button
                      onClick={() => {
                        refreshdata(
                          "gray",
                          Object.keys(variants["gray"]).includes(product.size)
                            ? product.size
                            : Object.keys(variants["gray"])[0]
                        );
                      }}
                      className={`border-2 bg-gray-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none ${
                        product.color === "gray"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    ></button>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={product.size}
                      onChange={(e) => {
                        refreshdata(product.color, e.target.value);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[product.color]).map((e, index) => {
                        return (
                          <option key={index} value={e}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  {product.availableqty > 0 ? (
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ₹{product.price}.00
                    </span>
                  ) : (
                    <span className="title-font font-medium text-2xl text-gray-900">
                      Out of Stock !!
                    </span>
                  )}

                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex space-x-2 flex-wrap border-b-2 border-gray-100 mb-5 pb-5">
                  <button
                    disabled={product.availableqty <= 0}
                    onClick={() =>
                      additem(
                        product.slug,
                        1,
                        product.price,
                        product.size,
                        product.color[0].toUpperCase() + product.color.slice(1),
                        `${product.name} (${product.size}/${
                          product.color[0].toUpperCase() +
                          product.color.slice(1)
                        })`
                      )
                    }
                    className="text-white bg-blue-500 border-0 my-2 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
                  >
                    Add to cart
                  </button>
                  <button
                    disabled={product.availableqty <= 0}
                    onClick={() =>
                      buynow(
                        product.slug,
                        1,
                        product.price,
                        product.size,
                        product.color[0].toUpperCase() + product.color.slice(1),
                        `${product.name} (${product.size}/${
                          product.color[0].toUpperCase() +
                          product.color.slice(1)
                        })`
                      )
                    }
                    className="text-white bg-blue-500 border-0 my-2 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 flex-wrap mt-2">
                <input
                  onChange={(e) => setpincode(e.target.value)}
                  type="text"
                  id="pincode"
                  placeholder="Enter Pincode"
                  name="pincode"
                  className="my-2 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-lg outline-none text-gray-700 px-3 py-2 transition-colors duration-200 ease-in-out"
                />
                <button
                  onClick={checkavail}
                  className="my-2 text-white bg-blue-500 border-0 m-2 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.mongouri);
  }
  const product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    return { props: { error: true } };
  }
  const variant = await Product.find({
    name: product.name,
    category: product.category,
  });
  let colorsizeslug = {};
  for (let item of variant) {
    if (item.color in colorsizeslug) {
      colorsizeslug[item.color][item.size] = { slug: item.slug };
    } else {
      colorsizeslug[item.color] = {};
      colorsizeslug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorsizeslug)),
    },
  };
}

export default Slug;
