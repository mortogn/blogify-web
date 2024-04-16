import { urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  title: string;
  thumbnail: SanityImageSource;
  slug: {
    current: string;
  };
};

const CategoryCard: FC<Props> = ({ slug, thumbnail, title }) => {
  return (
    <Link href={`/categories/${slug.current}`}>
      <div className="relative group h-[140px] rounded-md overflow-hidden flex items-center justify-center">
        <Image src={urlFor(thumbnail)?.width(950).url() ?? ""} alt={title} width={400} height={250} quality={70} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="relative z-10 bg-white/80 px-4 py-3 rounded-md group-hover:-translate-y-1 transition-transform duration-100 ease-out">
          <h2 className="font-medium  tracking-tight">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
