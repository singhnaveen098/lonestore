import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { BsCartX } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Checkout = ({ cart, additem, removeitem, clearcart, total, setloggedin }) => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [paydisable, setpaydisable] = useState(true);

  useEffect(() => {
    const fetchuser = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/getuser`, {
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
        setname(data.name);
        setemail(data.email);
        setphone(data.phone);
        setaddress(data.address);
        setpincode(data.pincode);
      }
    };
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      fetchuser();
    }
    // eslint-disable-next-line
  }, [router.query]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    const getpindata = async () => {
      if (pincode.length === 6) {
        let data = await fetch(`${process.env.NEXT_PUBLIC_host}/api/pinavail`);
        let parseddata = await data.json();
        if (parseddata[pincode]) {
          setpaydisable(false);
          setdistrict(parseddata[pincode][0]);
          setstate(parseddata[pincode][1]);
        } else {
          setpaydisable(true);
          toast.error("Sorry, Pincode not servicable !!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } else {
        setpaydisable(true);
        setdistrict("");
        setstate("");
      }
    };
    if (JSON.parse(localStorage.getItem("total")) === 0) {
      router.push("/");
    }
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setpaydisable(false);
    } else {
      setpaydisable(true);
    }
    getpindata();
    // eslint-disable-next-line
  }, [total, name, email, phone, district, address, pincode, state]);

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    }
  };

  const handlepayment = async () => {
    let ordid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      total,
      ordid,
      email,
      name,
      phone,
      address,
      pincode,
      district,
      state,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/initiatetxn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    if (txnRes.reload === true) {
      toast.error(txnRes.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (txnRes.reload === false) {
      toast.error(txnRes.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      let txntoken = txnRes.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: ordid /* update order id */,
          token: txntoken /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: total /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };

      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    }
  };

  return (
    <div className="container m-auto px-4 py-8 min-h-screen">
      <Head>
        <title>Checkout - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_paytm_host}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_paytm_MID}.js`}
      />
      <div>
        <div className="text-2xl font-bold underline underline-offset-4 mb-8">
          Billing Details :
        </div>
        <div className="grid">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  onChange={handlechange}
                  value={name}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  Email
                </label>
                <input
                  required
                  type="text"
                  id="email"
                  name="email"
                  onChange={handlechange}
                  value={email}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={handlechange}
                  value={phone}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  Pincode
                </label>
                <input
                  required
                  type="text"
                  id="pincode"
                  name="pincode"
                  onChange={handlechange}
                  value={pincode}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <div className="p-2 w-11/12 sm:w-3/4">
            <div className="mb-4">
              <label
                htmlFor="address"
                className="leading-7 text-md font-semibold text-gray-600"
              >
                Address
              </label>
              <textarea
                required
                id="address"
                name="address"
                onChange={handlechange}
                value={address}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="district"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  District
                </label>
                <input
                  required
                  type="text"
                  id="district"
                  name="district"
                  value={district}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  State
                </label>
                <input
                  required
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold underline underline-offset-4 mt-4 mb-8">
          Review Cart :
        </div>
        <ol className="list-decimal ml-6 sm:mx-4 font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4">Cart is empty!!!! Shop now</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="flex flex-row my-4">
                  <div className="w-1/2 sm:w-2/3 flex">{cart[k].name}</div>
                  <div className="w-1/2 sm:w-1/3 flex justify-center items-center">
                    <IoMdRemoveCircleOutline
                      onClick={() => removeitem(k, 1)}
                      className="text-lg mr-2 cursor-pointer"
                    />
                    {cart[k].qty}
                    <IoMdAddCircleOutline
                      onClick={() =>
                        additem(
                          k,
                          1,
                          cart[k].price,
                          cart[k].size,
                          cart[k].color,
                          cart[k].name
                        )
                      }
                      className="text-lg ml-2 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {Object.keys(cart).length > 0 && (
          <div className="m-4 font-bold text-xl">Total : ₹{total}.00</div>
        )}
        <div className="flex items-center flex-wrap">
          <button
            onClick={clearcart}
            disabled={Object.keys(cart).length === 0 ? true : false}
            className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
          >
            Clear Cart
            <BsCartX className="m-1 ml-2 text-lg" />
          </button>
          <button
            onClick={handlepayment}
            disabled={paydisable}
            className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
          >
            <MdPayment className="m-1 mr-2 text-lg" />
            Pay ₹{total}.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
