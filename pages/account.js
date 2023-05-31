import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import { trusted } from "mongoose";
import { toast } from "react-toastify";
import Head from "next/head";

const Account = ({ setloggedin }) => {
  const router = useRouter();
  const [billedit, setbilledit] = useState(false);
  const [secuedit, setsecuedit] = useState(false);
  const [savedisable, setsavedisable] = useState(trusted);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [password, setpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [cnewpassword, setcnewpassword] = useState("");

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
          toast.success("Pincode is servicable.", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setsavedisable(false);
        } else {
          setsavedisable(true);
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
        setsavedisable(true);
      }
    };
    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setsavedisable(false);
    } else {
      setsavedisable(true);
    }
    getpindata();
    // eslint-disable-next-line
  }, [name, email, phone, address, pincode]);

  const handlecancel = () => {
    setbilledit(false);
    setsecuedit(false);
    setname("");
    setphone("");
    setaddress("");
    setpincode("");
    setpassword("");
    setnewpassword("");
    setcnewpassword("");
    router.push("/account");
  };

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    } else if (e.target.name == "address") {
      setaddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setpincode(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setnewpassword(e.target.value);
    } else if (e.target.name == "cnewpassword") {
      setcnewpassword(e.target.value);
    }
  };

  const handlesave = async () => {
    const val = {
      billedit,
      secuedit,
      name,
      email,
      phone,
      address,
      pincode,
      password,
      newpassword,
    };
    if (secuedit) {
      if (newpassword !== cnewpassword) {
        toast.error("New Password does not match", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(val),
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
    } else {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setbilledit(false);
      setsecuedit(false);
      setname("");
      setphone("");
      setaddress("");
      setpincode("");
      setpassword("");
      setnewpassword("");
      setcnewpassword("");
      router.push("/account");
    }
  };

  return (
    <div className="container m-auto px-4 py-8 min-h-screen">
      <Head>
        <title>My Account - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="text-center font-bold text-3xl">My Account</h1>
      <div>
        <div className="flex justify-between">
          <div className="text-2xl font-bold underline underline-offset-4 mb-8">
            Billing Details :
          </div>
          <div
            className="flex text-lg font-semibold mb-8 items-center cursor-pointer"
            onClick={() => setbilledit(true)}
          >
            Edit <AiOutlineEdit />
          </div>
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
                  disabled={!billedit}
                  className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  disabled={true}
                  className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  disabled={!billedit}
                  className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  disabled={!billedit}
                  className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                disabled={!billedit}
                className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="text-2xl font-bold underline underline-offset-4 mb-8">
            Security Details :
          </div>
          <div
            className="flex text-lg font-semibold mb-8 items-center cursor-pointer"
            onClick={() => setsecuedit(true)}
          >
            Edit <AiOutlineEdit />
          </div>
        </div>
        <div className="grid">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2 w-11/12 sm:w-3/4">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-md font-semibold text-gray-600"
                >
                  Current Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  onChange={handlechange}
                  value={secuedit ? password : "********"}
                  disabled={!secuedit}
                  className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          {secuedit && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-2 w-11/12 sm:w-3/4">
                <div className="mb-4">
                  <label
                    htmlFor="newpassword"
                    className="leading-7 text-md font-semibold text-gray-600"
                  >
                    New Password
                  </label>
                  <input
                    required
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={handlechange}
                    value={newpassword}
                    className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-11/12 sm:w-3/4">
                <div className="mb-4">
                  <label
                    htmlFor="cnewpassword"
                    className="leading-7 text-md font-semibold text-gray-600"
                  >
                    Confirm New Password
                  </label>
                  <input
                    required
                    type="password"
                    id="cnewpassword"
                    name="cnewpassword"
                    onChange={handlechange}
                    value={cnewpassword}
                    className="w-full bg-gray-100 bg-opacity-0 disabled:bg-opacity-100 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center flex-wrap mt-8">
        <button
          onClick={handlecancel}
          className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded"
        >
          Cancel
          <TiCancel className="m-1 ml-2 text-lg" />
        </button>
        <button
          onClick={handlesave}
          disabled={savedisable}
          className="ml-4 mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
        >
          Save
          <AiOutlineSave className="m-1 ml-2 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Account;
