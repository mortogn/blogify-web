import Button, { buttonVariants } from "@/components/common/button";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="max-w-[960px] mx-auto h-[550px] flex items-center flex-col justify-center gap-6 text-center">
      <h1 className="text-6xl font-medium tracking-tighter">See the world through our eyes</h1>
      <p className="tracking-wide text-zinc-700">We are bunch of travels that travels everywhere to show you the beautiful world.</p>
      <div className="space-x-2 flex">
        <Link className={buttonVariants({ size: "lg" })} href={"/articles"}>
          See articles
        </Link>
        <Link href={"/about"} className={buttonVariants({ size: "lg", variant: "ghost" })}>
          About us
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
