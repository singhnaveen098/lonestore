import React from "react";
import Link from "next/link";
const avsize = ["S", "M", "L", "XL", "XXL"];
import Head from "next/head";

const Jackets = ({ data }) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Buy Cool Jackets - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {Object.keys(data).length === 0 && (
            <p className="text-center font-bold">
              Jackets are currently out of stock!! New stock coming soon
            </p>
          )}
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
                        Jacket
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {data[item].name}
                      </h2>
                      <p className="mt-1">₹{data[item].price}</p>
                      <p className="mt-1">
                        Size:{" "}
                        {data[item].size.map((e, index) => {
                          if (avsize.includes(e)) {
                            return (
                              <span
                                className="px-1 mx-1 border border-gray-400"
                                key={index}
                              >
                                {e}
                              </span>
                            );
                          }
                        })}
                      </p>
                      <div className="mt-1 flex">
                        Color:
                        {data[item].color.includes("white") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-white my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("black") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-black my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("red") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-red-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("green") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-green-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("blue") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-blue-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("purple") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-purple-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("pink") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-pink-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                        {data[item].color.includes("yellow") && (
                          <button
                            className={
                              "border-2 border-gray-300 bg-yellow-700 my-auto ml-1 rounded-full w-6 h-6 focus:outline-none"
                            }
                          ></button>
                        )}
                      </div>
                      {/* <div className="mt-1 flex">Color: {data[item].color.map((e, index)=> {return(<button className={`border-2 border-gray-300 ${e.toLowerCase()==='black'||e.toLowerCase()==='white' ? `bg-${e.toLowerCase()}` : `bg-${e.toLowerCase()}-700`} my-auto ml-1 rounded-full w-6 h-6 focus:outline-none`} key={index}></button>)})}</div>  */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_host}/api/getproducts/Jacket`
  );
  const data = await res.json();
  return { props: { data: data.prodvariant } };
}

export default Jackets;
