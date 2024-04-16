import React from "react";
import Logo from "./logo";
import Link from "next/link";
import Button from "./common/button";
import NavItem from "./nav-item";
import MaxWidthWrapper from "./max-width-wrapper";
import MenuDrawer from "./disclosure/menu-drawer";

const NavItems: Array<{
  label: string;
  href: string;
}> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Authors",
    href: "/authors",
  },
  {
    label: "About",
    href: "/about",
  },
];

const Header = () => {
  return (
    <header className="h-[110px] flex justify-center">
      <MaxWidthWrapper className="flex w-full items-center justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-0">
            {NavItems.map((item) => (
              <NavItem key={item.label} {...item} />
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <MenuDrawer items={NavItems} />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
