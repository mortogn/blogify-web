import React, { FC } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Logo from "./logo";
import { client } from "@/lib/sanity";
import Link from "next/link";

type Props = {
  site: any;
};

const Footer: FC<Props> = async ({ site }) => {
  return (
    <footer className="bg-gray-100 pt-12 text-gray-900 mt-auto">
      <MaxWidthWrapper className="px-10 pb-12">
        <div className="space-y-3">
          <Link href={"/"} className="w-max block">
            <Logo />
          </Link>
          <p className="tracking-wide text-sm text-zinc-700">Explore the world through our eyes. Blogify shares captivating travel vlogs, cultural insights, and stunning visuals to inspire your next trip.</p>
        </div>

        <div className="flex justify-between items-start flex-wrap gap-10 mt-10 md:mt-0">
          {site.footer.map((section: any) => (
            <div key={section._key} className="mt-8">
              <h3 className="text-sm font-medium font-space-grotesk">{section.title}</h3>
              <ul className="mt-4">
                {section.links.map((link: any) => (
                  <li key={link._key} className="mt-2 md:max-w-[250px]">
                    <Link href={link.url} className="hover:underline tracking-wide ">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
      <div className="border-t text-center flex items-center justify-center py-3 bg-gray-800 text-white tracking-wider">
        <p className="text-sm font-medium">Copyright &copy;2024 Blogify. All rights reserved.</p>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
