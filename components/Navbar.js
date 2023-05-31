import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsCart4, BsBagCheck, BsCartX } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const Navbar = ({
  handlelogout,
  loggedin,
  cart,
  additem,
  removeitem,
  clearcart,
  total,
  showcart,
  setshowcart,
}) => {
  const ref = useRef(null);
  const [menu, setmenu] = useState(false);
  const [width, setwidth] = useState();
  const changecart = () => {
    setshowcart(!showcart);
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].style="overflow-x: hidden; height: 100vh";
    const widset = () => {
      setwidth(ref.current.offsetWidth);
    };
    window.addEventListener("resize", widset);
    widset();
    return () => window.removeEventListener("resize", widset);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sticky top-0 bg-white z-50">
      <header ref={ref} className="text-gray-600 body-font">
        <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center shadow-md">
          <Link href={"/"}>
            <a className="flex mr-auto md:mr-0 title-font font-medium items-center justify-start text-gray-900">
              <Image src="/logo2.png" alt="" width={160} height={32} />
            </a>
          </Link>
          <div className="absolute top-1 md:top-5 right-5 flex flex-row items-center mt-4 md:mt-0">
            {width > 400 ? (
              <button
                onClick={changecart}
                className="relative inline-flex items-center mr-4 bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              >
                <div
                  className={`${
                    Object.keys(cart).length === 0 ? "hidden" : "block"
                  }`}
                >
                  <span className="animate-ping absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  <span className="absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </div>
                Cart
                <BsCart4 className="mx-1" />
              </button>
            ) : (
              <button
                onClick={changecart}
                className="relative inline-flex items-center bg-gray-100 border-0 p-1 mr-2 focus:outline-none hover:bg-gray-200 rounded text-base"
              >
                <div
                  className={`${
                    Object.keys(cart).length === 0 ? "hidden" : "block"
                  }`}
                >
                  <span className="animate-ping absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  <span className="absolute -top-1 -right-1 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </div>
                <BsCart4 className="mx-1" />
              </button>
            )}
            {loggedin ? (
              <span>
                <MdAccountCircle
                  onMouseOver={() => setmenu(true)}
                  onMouseLeave={() => setmenu(false)}
                  className="text-3xl cursor-pointer"
                />
              </span>
            ) : (
              <Link href={"/login"}>
                <a>
                  <RiLoginBoxLine className="text-3xl cursor-pointer" />
                </a>
              </Link>
            )}
          </div>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center font-bold">
            <Link href={"/shirts"}>
              <a className="mr-5 hover:text-gray-900">Shirts</a>
            </Link>
            <Link href={"/trousers"}>
              <a className="mr-5 hover:text-gray-900">Trousers</a>
            </Link>
            <Link href={"/jackets"}>
              <a className="mr-5 hover:text-gray-900">Jackets</a>
            </Link>
            <Link href={"/shoes"}>
              <a className="mr-5 hover:text-gray-900">Shoes</a>
            </Link>
          </nav>
        </div>
        <div
          onMouseOver={() => setmenu(true)}
          onMouseLeave={() => setmenu(false)}
          className={`${
            menu ? "h-[167px]" : "h-0"
          } overflow-hidden drop-shadow-xl absolute right-3 top-[3.05rem] text-center transition-[height] ease-in-out delay-900`}
        >
          <div
            className={`w-0 h-0 ml-auto mr-2 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-yellow-400`}
          />
          <ul
            className={`rounded-md bg-yellow-400 list-none text-black font-semibold `}
          >
            <a onClick={handlelogout}>
              <li className="py-1 px-6 hover:text-yellow-100 cursor-pointer border-b-[1px] border-b-black">
                LogOut
              </li>
            </a>
            <Link href={"/account"}>
              <a>
                <li className="py-1 px-6 hover:text-yellow-100 cursor-pointer border-b-[1px] border-b-black">
                  My Account
                </li>
              </a>
            </Link>
            <Link href={"/orders"}>
              <a>
                <li className="py-1 px-6 hover:text-yellow-100 cursor-pointer">
                  Orders
                </li>
              </a>
            </Link>
            {/* <Link href={"/offers"}>
              <a>
                <li className="py-1 px-6 hover:text-yellow-100 cursor-pointer">
                  Offers
                </li>
              </a>
            </Link> */}
          </ul>
        </div>
      </header>
      <div
        className={`cartbar h-[100vh] overflow-y-scroll absolute top-0 right-0 pl-2 py-2 sm:py-10 sm:px-4 w-4/6 sm:w-1/2 md:w-3/8 lg:w-2/6 bg-yellow-300 transition-all ${
          showcart ? "translate-x-0" : "translate-x-full"
        } ease-in-out delay-600`}
      >
        <h1 className="font-bold text-md sm:text-lg">Your Cart : </h1>
        <CgCloseR
          onClick={changecart}
          className="absolute top-2 right-2 text-md sm:text-2xl cursor-pointer"
        />
        <ol className="list-decimal ml-6 sm:mx-4 font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="text-center my-4">Cart is empty!!!! Shop now</div>
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
        <div className="flex justify-around flex-wrap">
          <Link href={"/checkout"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
            >
              Checkout
              <BsBagCheck className="m-1 ml-2" />
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearcart}
            className="mt-2 lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
          >
            Clear Cart
            <BsCartX className="m-1 ml-2 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
