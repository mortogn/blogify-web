export const revalidate = 60;

import React from "react";
import HeroSection from "./_comp/hero";
import { client } from "@/lib/sanity";
import CategoryCardWrapper from "@/components/category-card-wrapper";
import CategoryCard from "@/components/category-card";
import ArticleCardWrapper from "@/components/article-card-wrapper";
import ArticleCard from "@/components/article-card";
import SectionHeading from "@/components/section-heading";

const HOME_QUERY = `
*[_type=="homePage"] {
  _id,
  categories[]->{
    _id,
    title,
    thumbnail,
    slug
  },
  "sections": *[_type=="homeSection"] {
    _id,
    title,
    description,
    articles[]->{
      _id,
      title,
      shortDescription,
      thumbnail,
      slug,
    }
  }
}[0]
`;

const getHomeData = async () => {
  const data = await client.fetch(HOME_QUERY);
  return data;
};

export default async function Home() {
  const data = await getHomeData();

  return (
    <div>
      <HeroSection />

      <CategoryCardWrapper className="mt-4">
        {data.categories.map((category: any) => (
          <CategoryCard {...category} key={category._id} />
        ))}
      </CategoryCardWrapper>

      {data.sections.map((section: any) => (
        <div key={section._id} className="mt-14">
          <SectionHeading heading={section.title} description={section.description} />

          <ArticleCardWrapper className="mt-6">
            {section.articles.map((article: any) => (
              <ArticleCard {...article} key={article._id} />
            ))}
          </ArticleCardWrapper>
        </div>
      ))}
    </div>
  );
}
