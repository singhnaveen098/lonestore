import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";

const Orders = () => {
  const router = useRouter();
  const [orders, setorders] = useState([]);
  const [pageorders, setpageorders] = useState([]);
  const [page, setpage] = useState(1);
  const [pagesize, setpagesize] = useState(0);

  useEffect(({setloggedin}) => {
    const fetchorders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      let data = await a.json();
      if (Object.keys(data).includes("error")) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (Object.keys(data).includes("expired")) {
        localStorage.removeItem("token");
        setloggedin(false);
        router.push("/login");
      } else {
        setorders(data);
      }
    };
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchorders();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      setpagesize(Math.ceil(orders.length / 10));
    }
    // eslint-disable-next-line
  }, [orders]);

  useEffect(() => {
    setpageorders(orders.slice((page-1)*10, page*10));
    // eslint-disable-next-line
  }, [page, orders]);

  const handlenext = () => {
    setpage(page + 1);
  };

  const handleprev = () => {
    setpage(page - 1);
  };

  return (
    <div className="container m-auto px-4 py-8 min-h-screen">
      <Head>
        <title>Your Orders - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="text-2xl font-bold">Your Orders :</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="bg-gray-800 border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Order Id
                    </th>
                    {/* <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Product
                    </th> */}
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="text-md font-medium text-white px-6 py-4"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageorders.map((order, ind) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                        {(page-1)*10 + ind + 1 + "."}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        #{order.orderid}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        ₹{order.amount}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        <span className="bg-yellow-100 text-yellow-600 font-bold py-2 px-4 rounded-full">
                          {order.status}
                        </span>
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 w-3/12 whitespace-normal text-left">
                        {order.email}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 w-3/12 whitespace-normal text-left">
                        {`${order.address}, ${order.district}, ${order.state}-${order.pincode}`}
                      </td>
                      <td className="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        <Link href={`/order?id=${order._id}`}>
                          <a className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
                            Details
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Orders;
