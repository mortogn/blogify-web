export const revalidate = 60;

import { client, urlFor } from "@/lib/sanity";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import React from "react";

import Image from "next/image";
import SectionHeading from "@/components/section-heading";
import ArticleCardWrapper from "@/components/article-card-wrapper";
import ArticleCard from "@/components/article-card";

const AUTHOR_SEO_QUERY = `
*[_type=="author" && slug.current == $slug] {
    name,
    bio
}[0]
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch(AUTHOR_SEO_QUERY, { slug: params.slug });
  return {
    title: data.name,
    description: data.bio,
  };
}

const AUTHOR_QUERY = `
*[_type=="author" && slug.current == $slug] {
    name,
    bio,
    image,
    "articles": *[_type=="article" && references(^._id)] {
      _id,
      title,
      shortDescription,
      thumbnail,
      slug,
    }
  }[0]
`;

export default async function AuthorDetails({ params }: { params: { slug: string } }) {
  const author = await client.fetch<SanityDocument>(AUTHOR_QUERY, { slug: params.slug });

  return (
    <div className="mt-10">
      <div className="flex items-center px-7 py-8 gap-6 rounded-md flex-col md:flex-row">
        <Image src={urlFor(author.image)?.url() ?? ""} alt={author.name} width={250} height={250} className="h-[150px] w-[150px] rounded-full object-cover" />

        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-medium">{author.name}</h3>
          <p className="text-zinc-700 text-sm md:text-base leading-7 tracking-wide">{author.bio}</p>
        </div>
      </div>

      <section>
        <SectionHeading heading="Articles" description={`Articles written by - ${author.name}`} />

        <ArticleCardWrapper className="mt-6">
          {author.articles.map((article: any) => (
            <ArticleCard {...article} key={article._id} />
          ))}
        </ArticleCardWrapper>
      </section>
    </div>
  );
}
