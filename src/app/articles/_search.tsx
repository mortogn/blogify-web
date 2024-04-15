"use client";

import SearchInput from "@/components/search-input";
import { useRouter } from "next/navigation";
import React from "react";

const Search = () => {
  const router = useRouter();

  const submitHandler = (q: string) => {
    router.push(`/articles?q=${q}`);
  };

  return (
    <div className="mt-4">
      <SearchInput onSubmit={submitHandler} />
    </div>
  );
};

export default Search;
