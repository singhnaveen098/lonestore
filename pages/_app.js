import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [curradmin, setcurradmin] = useState(false);
  const router = useRouter();
  const [cart, setcart] = useState({});
  const [total, settotal] = useState(0);
  const [loggedin, setloggedin] = useState(false);
  const [showcart, setshowcart] = useState(false);

  const savecart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let tot = 0;
    let keys = Object.keys(mycart);
    for (let i = 0; i < keys.length; i++) {
      tot += mycart[keys[i]].price * mycart[keys[i]].qty;
    }
    settotal(tot);
    localStorage.setItem("total", JSON.stringify(tot));
  };

  useEffect(() => {
    try {
      setshowcart(false);
      router.events.on("routeChangeStart", () => {
        setProgress(30);
      });
      router.events.on("routeChangeComplete", () => {
        setProgress(100);
      });
      setcurradmin(router.pathname.slice(1,6)=="admin");
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
      }
      if (localStorage.getItem("total")) {
        settotal(JSON.parse(localStorage.getItem("total")));
      }
      if (localStorage.getItem("token")) {
        const getdata = async () => {
          let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/getuser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          });
          let data = await a.json();
          if (Object.keys(data).includes("error")) {
            localStorage.removeItem("token");
            setloggedin(false);
            toast.error("Session Expired!!! Login again", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            setloggedin(true);
          }
        };
        getdata();
      }
    } catch (error) {
      localStorage.clear();
    }
    // eslint-disable-next-line
  }, [router.query]);

  const additem = (itemcode, qty, price, size, color, name) => {
    let mycart = cart;
    if (itemcode in cart) {
      mycart[itemcode].qty = cart[itemcode].qty + qty;
    } else {
      mycart[itemcode] = { qty: 1, price, name, size, color };
    }
    setcart(mycart);
    savecart(mycart);
    toast.success("Item added to cart", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  const removeitem = (itemcode, qty) => {
    let mycart = cart;
    if (itemcode in cart) {
      mycart[itemcode].qty = cart[itemcode].qty - qty;
    }
    if (mycart[itemcode].qty <= 0) {
      delete mycart[itemcode];
    }
    setcart(mycart);
    savecart(mycart);
    if (Object.keys(mycart).length === 0) {
      toast.success("Cart cleared", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success("Item removed from cart", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const clearcart = () => {
    setcart({});
    savecart({});
    toast.success("Cart cleared", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const clearcartorder = ()=>{
    setcart({});
    savecart({});
  }

  const buynow = (itemcode, qty, price, size, color, name) => {
    let mycart = {};
    mycart[itemcode] = { qty: 1, price, name, size, color };
    setcart(mycart);
    savecart(mycart);
    router.push("/checkout");
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    setloggedin(false);
    toast.success("User Successfully Logged Out", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    router.push("/");
  };

  return (
    <>
      <LoadingBar
        color="#facc15"
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {!curradmin && <Navbar
        handlelogout={handlelogout}
        loggedin={loggedin}
        cart={cart}
        additem={additem}
        removeitem={removeitem}
        clearcart={clearcart}
        total={total}
        showcart={showcart}
        setshowcart={setshowcart}
      />}
      <Component
        loggedin={loggedin}
        setloggedin={setloggedin}
        cart={cart}
        additem={additem}
        removeitem={removeitem}
        clearcart={clearcart}
        clearcartorder={clearcartorder}
        buynow={buynow}
        total={total}
        {...pageProps}
      />
      {!curradmin && <Footer />}
    </>
  );
}

export default MyApp;
