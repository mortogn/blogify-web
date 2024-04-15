export const revalidate = 60;

import AuthorCard from "@/components/author-card";
import PageHeading from "@/components/page-heading";
import { client } from "@/lib/sanity";
import Link from "next/link";
import React from "react";

const AUTHORS_QUERY = `
 *[_type=="author"] {
  _id,
  name,
  bio,
  image,
  slug,
 }[0...50]
`;

const getAuthors = async () => {
  const authors = await client.fetch(AUTHORS_QUERY);
  return authors;
};

export default async function Authors() {
  const authors = await getAuthors();

  return (
    <div>
      <PageHeading heading="Authors" description="Meet the authors of Blogify" />

      <div className="mt-6">
        {authors.map((author: any) => (
          <Link key={author._id} href={`/authors/${author.slug.current}`}>
            <AuthorCard {...author} />
          </Link>
        ))}
      </div>
    </div>
  );
}
