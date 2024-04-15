export const revalidate = 60;

import PageHeading from "@/components/page-heading";
import React from "react";
import Search from "./_search";
import CategoryCardWrapper from "@/components/category-card-wrapper";
import { client } from "@/lib/sanity";
import CategoryCard from "@/components/category-card";

const ALL_CATEGORY_QUERY = `
*[_type == "category"] {
  _id,
  title,
  slug,
  thumbnail,
  description,
}[0...50]
`;

const CATEGORY_SEARCH_QUERY = `
*[_type=="category" && title match $q] {
  _id,
  title,
  slug,
  thumbnail,
  description,
}[0...50]
`;

export default async function Categories({ searchParams }: { searchParams: { q?: string | string[] } }) {
  let categories: any[] = [];

  if (searchParams.q) {
    if (Array.isArray(searchParams.q)) {
      searchParams.q = searchParams.q[0];
    }

    categories = await client.fetch<any[]>(CATEGORY_SEARCH_QUERY, { q: `*${searchParams.q}*` });
  } else {
    categories = await client.fetch<any[]>(ALL_CATEGORY_QUERY);
  }

  return (
    <div className="">
      <PageHeading heading="Categories" description="Browse all the categories of Blogify" />

      <Search />

      <CategoryCardWrapper className="mt-6">
        {categories.map((category: any) => (
          <CategoryCard {...category} key={category._id} />
        ))}
      </CategoryCardWrapper>
    </div>
  );
}
