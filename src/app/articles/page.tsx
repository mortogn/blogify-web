export const revalidate = 0;

import ArticleCard from "@/components/article-card";
import ArticleCardWrapper from "@/components/article-card-wrapper";
import PageHeading from "@/components/page-heading";
import SearchInput from "@/components/search-input";
import { client } from "@/lib/sanity";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import React from "react";
import Search from "./_search";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse Blogify's entire collection of articles",
};

const ALL_ARTICLES_QUERY = `
*[_type == "article"] {
  _id,
  title,
  slug,
  thumbnail,
  shortDescription,
  _createdAt,
}[0...50] | order(_createdAt desc)
`;

const ARTICLE_SEARCH_QUERY = `
*[_type=="article" && [title,shortDescription] match $q] {
  _id,
  title,
  slug,
  thumbnail,
  shortDescription,
  _createdAt,
}[0...50] | order(title asc)
`;

export default async function Articles({ searchParams }: { searchParams: { q?: string | string[] } }) {
  let articles: SanityDocument[] = [];

  if (searchParams.q) {
    if (Array.isArray(searchParams.q)) {
      searchParams.q = searchParams.q[0];
    }

    articles = await client.fetch<SanityDocument[]>(ARTICLE_SEARCH_QUERY, { q: `*${searchParams.q}*` });
  } else {
    articles = await client.fetch<SanityDocument[]>(ALL_ARTICLES_QUERY);
  }

  return (
    <div>
      <PageHeading heading="Articles" description="Browse our entire collection of articles" />

      <Search />

      <ArticleCardWrapper className="mt-6">
        {articles.map((article: any) => (
          <ArticleCard {...article} key={article._id} />
        ))}
      </ArticleCardWrapper>
    </div>
  );
}
