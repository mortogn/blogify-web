import cn from "@/utils/cn";
import { Nothing_You_Could_Do } from "next/font/google";
import React from "react";

// const font = Nothing_You_Could_Do({ subsets: ["latin"], weight: ["400"], display: "swap" });

const Logo = () => {
  return <h2 className={"text-3xl font-space-grotesk"}>Blogify</h2>;
};

Logo.displayName = "Logo";

export default Logo;
