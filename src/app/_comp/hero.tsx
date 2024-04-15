import Button from "@/components/common/button";
import React from "react";

const HeroSection = () => {
  return (
    <section className="max-w-[960px] mx-auto h-[550px] flex items-center flex-col justify-center gap-6 text-center">
      <h1 className="text-6xl font-medium tracking-tighter">See the world through our eyes</h1>
      <p className="tracking-wide text-zinc-700">We are bunch of travels that travels everywhere to show you the beautiful world.</p>
      <div className="space-x-2">
        <Button size="lg">See articles</Button>
        <Button size="lg" variant="ghost">
          About Us
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
