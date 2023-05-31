import React, { useEffect, useState } from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Addadproduct = () => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [slug, setslug] = useState("");
  const [desc, setdesc] = useState("");
  const [img, setimg] = useState("");
  const [category, setcategory] = useState("");
  const [size, setsize] = useState("");
  const [color, setcolor] = useState("");
  const [price, setprice] = useState(0);
  const [availableqty, setavailableqty] = useState(0);

  useEffect(() => {
    const validate = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/tokenvalid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("adtoken"),
        },
      });
      let data = await a.json();
      if (Object.keys(data).includes("expired")) {
        localStorage.removeItem("adtoken");
        router.push("/admin/login");
      }
    };
    if (!localStorage.getItem("adtoken")) {
      router.push("/admin/login");
    } else {
      validate();
    }
    // eslint-disable-next-line
  }, []);

  const handlechange = (e) => {
    e.preventDefault();
    if (e.target.id == "name-basic") {
      setname(e.target.value);
    } else if (e.target.id == "slug-basic") {
      setslug(e.target.value);
    } else if (e.target.id == "desc-basic") {
      setdesc(e.target.value);
    } else if (e.target.id == "img-basic") {
      setimg(e.target.value);
    } else if (e.target.id == "category-basic") {
      setcategory(e.target.value);
    } else if (e.target.id == "size-basic") {
      setsize(e.target.value);
    } else if (e.target.id == "color-basic") {
      setcolor(e.target.value);
    } else if (e.target.id == "price-basic") {
      setprice(e.target.value);
    } else if (e.target.id == "availableqty-basic") {
      setavailableqty(e.target.value);
    }
  };

  const handleaddproduct = async () => {
    const val = {
      name,
      slug,
      desc,
      img,
      category,
      size,
      color,
      price,
      availableqty,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_host}/api/addproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("adtoken"),
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
      toast.success("Product added successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setname("");
      setslug("");
      setdesc("");
      setimg("");
      setcategory("");
      setsize("");
      setcolor("");
      setprice(0);
      setavailableqty(0);
    }
  };

  return (
    <>
      <Head>
        <title>Lonestore admin add product</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add Product">
                <Stack spacing={3}>
                  <TextField
                    id="name-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={handlechange}
                  />
                  <TextField
                    id="slug-basic"
                    label="Slug"
                    variant="outlined"
                    value={slug}
                    onChange={handlechange}
                  />
                  <TextField
                    id="desc-basic"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={desc}
                    onChange={handlechange}
                  />
                  <TextField
                    id="img-basic"
                    label="Image Url"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={img}
                    onChange={handlechange}
                  />
                  <TextField
                    id="category-basic"
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={handlechange}
                  />
                  <TextField
                    id="size-basic"
                    label="Size"
                    variant="outlined"
                    value={size}
                    onChange={handlechange}
                  />
                  <TextField
                    id="color-basic"
                    label="Color"
                    variant="outlined"
                    value={color}
                    onChange={handlechange}
                  />
                  <TextField
                    id="price-basic"
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={handlechange}
                    type="number"
                  />
                  <TextField
                    id="availableqty-basic"
                    label="Available Quantity"
                    variant="outlined"
                    value={availableqty}
                    onChange={handlechange}
                    type="number"
                  />
                </Stack>
                <div className="flex justify-end">
                  <Button
                    onClick={handleaddproduct}
                    className="mt-8 mr-4 flex-shrink-0 inline-flex text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:opacity-75"
                  >
                    Submit
                  </Button>
                </div>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Addadproduct;
