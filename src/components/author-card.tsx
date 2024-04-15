import { urlFor } from "@/lib/sanity";
import React, { FC } from "react";
import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

const AuthorCard: FC<Props> = ({ bio, image, name }) => {
  return (
    <div className="flex items-center px-7 py-8 gap-6 rounded-md flex-col md:flex-row">
      <Image src={urlFor(image)?.url() ?? ""} alt={name} width={250} height={250} className="h-[150px] w-[150px] rounded-full object-cover" />

      <div className="space-y-3 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-medium">{name}</h3>
        <p className="text-zinc-700 text-sm md:text-base leading-7 tracking-wide">{bio}</p>
      </div>
    </div>
  );
};

AuthorCard.displayName = "AuthorCard";

export default AuthorCard;
