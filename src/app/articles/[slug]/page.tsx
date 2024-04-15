export const revalidate = 0;

import { client, urlFor } from "@/lib/sanity";
import { formatDate } from "@/utils/format";
import { Metadata } from "next";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const ARTICLE_SEO = `
  *[_type == "article" && slug.current == $slug] {
    seoTitle,
    seoDescription
  }[0]
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch(ARTICLE_SEO, { slug: params.slug });

  return {
    title: data.seoTitle,
    description: data.seoDescription,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="h-max">
        <div className="relative w-full h-[550px] overflow-hidden">
          <Image src={urlFor(value)?.url() ?? ""} alt={value.alt} fill className="rounded-md w-full h-full object-cover" />
        </div>
        {value.caption && <p className="text-center font-normal text-sm text-zinc-600">{value.caption}</p>}
      </div>
    ),
  },
};

const ARTICLE_QUERY = `
*[_type=="article" && slug.current == $slug] {
    _id,
    _createdAt,
    banner,
    title,
    body,
    author->{
      name,
      bio,
      image,
      slug
    },
    categories[]->{
      _id,
      slug,
      title,
    }
  }[0]
`;

const getArticle = async (slug: string) => {
  const data = await client.fetch<SanityDocument>(ARTICLE_QUERY, { slug });

  return data;
};

export default async function ArticleDetails({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 -z-10">
        <div className="relative h-[450px]">
          <Image src={urlFor(article.banner.image)?.url() ?? ""} alt={article.banner.alt ?? ""} fill className="object-cover rounded-md" />
        </div>
      </div>

      <div className="mx-2 md:mx-10 z-10">
        <div className="h-[240px] bg-transparent"></div>
        {/* -translate-y-[240px] */}
        <div className="bg-white border shadow-sm max-w-[1160px] rounded-md px-6 lg:px-20 py-10 lg:py-20 md:px-10 lg:mx-auto">
          <div className="flex gap-2 flex-wrap items-center">
            {article.categories.map((category: any) => (
              <Link href={`/categories/${category.slug.current}`} key={category._id} className="px-6 py-1.5 bg-slate-100 w-max rounded-full">
                <h3 className="font-medium tracking-tight font-poppins text-sm">{category.title}</h3>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl mt-4 md:text-5xl lg:text-6xl font-poppins font-semibold leading-[1.2] tracking-tight">{article.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            <p>{formatDate(article._createdAt)}</p>
            <div className="size-2 bg-slate-800 rounded-full" />
            <Link href={`/authors/${article.author.slug.current}`} className="hover:underline">
              {article.author.name}
            </Link>
          </div>

          <div className="prose max-w-none prose-headings:font-poppins prose-headings:font-medium mt-10">
            <PortableText components={portableTextComponents} value={article.body} />
          </div>

          <Link href={`/authors/${article.author.slug.current}`} className="flex items-center border px-7 flex-col md:flex-row py-8 gap-6 rounded-md shadow-md mt-20">
            <Image src={urlFor(article.author.image)?.url() ?? ""} alt={article.author.name} width={250} height={250} className="size-[80px] md:size-[150px] rounded-full object-cover" />

            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-xl md:text-3xl font-medium">{article.author.name}</h3>
              <p className="text-zinc-700 text-sm md:text-base leading-7 tracking-wide">{article.author.bio}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
