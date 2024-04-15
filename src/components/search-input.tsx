"use client";

import { SearchIcon } from "lucide-react";

import React, { FC, FormEvent, useState } from "react";

type Props = {
  onSubmit: (query: string) => void;
};

const SearchInput: FC<Props> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex border-2 rounded-md items-center py-3 focus-within:ring-2 ring-offset-1 ring-slate-700">
      <div className="px-4">
        <SearchIcon className="text-zinc-400" />
      </div>
      <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="pr-4 focus:outline-none w-full" />
    </form>
  );
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
