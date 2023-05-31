import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adtoken")) {
      router.push("/admin");
    }
    // eslint-disable-next-line
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const admin = {
      email,
      password,
    };
    const response = await fetch("/api/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
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
      localStorage.setItem("adtoken", data.adtoken);
      setemail("");
      setpassword("");
      toast.success("Admin Successfully Logged In", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push("/admin");
    }
  };

  return (
    <section className="bg-[#F4F7FF] px-5 py-20 lg:py-[120px] min-h-screen">
      <Head>
        <title>Admin Sign In - LoneStore.com</title>
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
                Admin Sign In
              </div>
              <form>
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
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    onClick={handlesubmit}
                    className="w-full rounded-md border border-primary py-3 px-5 bg-blue-500 text-white cursor-pointer hover:bg-opacity-90 transition"
                  />
                </div>
              </form>
              <Link href={"/admin/forgot"}>
                <a className="text-base inline-block mb-2 text-blue-500 hover:underline hover:text-primary">
                  Forget Password?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
