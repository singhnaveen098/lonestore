import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";

const Signup = () => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cfmpassword, setcfmpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (password !== cfmpassword) {
      toast.error("Password does not match", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const user = {
      name,
      email,
      password,
    };
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      localStorage.setItem("token", data.token);
      setname("");
      setemail("");
      setpassword("");
      setcfmpassword("");
      toast.success("User Successfully Signed Up", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push("/");
    }
  };

  return (
    <section className="bg-[#F4F7FF] px-5 py-20 lg:py-[120px] min-h-screen">
      <Head>
        <title>Sign Up - LoneStore.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <div className="container m-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-[525px] shadow-2xl mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
              <div className="flex flex-col mb-10 md:mb-16 text-center font-bold text-4xl">
                <Link href={"/"}>
                  <a className="inline-block max-w-[240px] mx-auto mb-4">
                    <img src="/logo2.png" alt="logo" />
                  </a>
                </Link>
                Sign Up
              </div>
              <form>
                <div className="mb-6">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:b "
                  />
                </div>
                <div className="mb-6">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:b "
                  />
                </div>
                <div className="mb-6">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={cfmpassword}
                    onChange={(e) => setcfmpassword(e.target.value)}
                    className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary"
                  />
                </div>
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign Up"
                    onClick={handlesubmit}
                    className="w-full rounded-md border border-primary py-3 px-5 bg-blue-500 text-white cursor-pointer hover:bg-opacity-90 transition"
                  />
                </div>
              </form>
              <p className="text-base text-gray-400">
                Already a member?
                <Link href={"/login"}>
                  <a href="#" className="text-blue-500 hover:underline">
                    Sign In
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
