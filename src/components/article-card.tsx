import { urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  title: string;
  thumbnail: {
    image: SanityImageSource;
    alt?: string;
  };
  shortDescription: string;
  slug: {
    current: string;
  };
};

const ArticleCard: FC<Props> = ({ shortDescription, slug, thumbnail, title }) => {
  return (
    <Link href={`/articles/${slug.current}`}>
      <div className="space-y-3 group">
        <div className="relative h-[180px]">
          <Image className="object-cover rounded-md h-full w-full" src={urlFor(thumbnail.image)?.width(1200)?.url() ?? ""} height={850} width={650} alt={thumbnail.alt ?? title} />
        </div>

        <div className="space-y-2 px-2 lg:px-3">
          <h2 className="font-medium group-hover:underline underline-offset-2 tracking-tight lg:text-xl line-clamp-2 text-lg">{title}</h2>
          <p className="line-clamp-3 text-sm text-zinc-600 tracking-wide leading-6">{shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
