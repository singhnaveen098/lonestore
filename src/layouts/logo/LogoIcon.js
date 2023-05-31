import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/admin">
      <a className="flex justify-center"><Image src="/logo2.png" alt="" width={160} height={32} /></a>
    </Link>
  );
};

export default LogoIcon;
