export const revalidate = 60;

import ArticleCard from "@/components/article-card";
import ArticleCardWrapper from "@/components/article-card-wrapper";
import SectionHeading from "@/components/section-heading";
import { client, urlFor } from "@/lib/sanity";
import { SkullIcon } from "lucide-react";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";

const CATEGORY_SEO = `
    *[_type == "category" && slug.current == $slug] {
        seoTitle,
        seoDescription,
    }[0]
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch(CATEGORY_SEO, { slug: params.slug });

  return {
    title: data.seoTitle,
    description: data.seoDescription,
  };
}

const CATEGORY_QUERY = `
    *[_type=="category" && slug.current == $slug] {
        title,
        description,
        thumbnail,
        "articles": *[_type=="article" && references(^._id)] {
        _id,
        title,
        shortDescription,
        slug,
        thumbnail
      }
    }[0]
`;

const getCategory = (slug: string) => {
  return client.fetch<SanityDocument>(CATEGORY_QUERY, { slug });
};

export default async function CategoryDetails({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-8 flex-col md:flex-row">
        <div className="relative h-[200px] md:h-[150px] w-[400px]">
          <Image src={urlFor(category.thumbnail)?.url() ?? ""} alt={category.title} height={200} width={400} className="object-cover rounded-md h-full w-full" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-medium">{category.title}</h1>
          <p className="text-zinc-700 leading-7">{category.description}</p>
        </div>
      </div>

      <section className="mt-14">
        <SectionHeading heading="Articles" description={`Articles from the category - ${category.title}`} />

        {category.articles.length === 0 ? (
          <div className="flex items-center flex-col justify-center gap-4 mt-14">
            <SkullIcon className="size-14" />
            <p className="font-medium text-xl">No article found.</p>
          </div>
        ) : (
          <ArticleCardWrapper className="mt-6">
            {category.articles.map((article: any) => (
              <ArticleCard {...article} key={article._id} />
            ))}
          </ArticleCardWrapper>
        )}
      </section>
    </div>
  );
}
