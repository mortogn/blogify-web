import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cx } from "class-variance-authority";
import { client } from "@/lib/sanity";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const SITE_SEO_QUERY = `
  *[_type=="siteSettings"] {
    seoTitle,
    seoDescription
  }[0]
`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(SITE_SEO_QUERY);

  return {
    title: {
      default: data.seoTitle,
      template: "%s - Blogify",
    },
    description: data.seoDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(space_grotesk.variable, poppins.variable)}>
        <Header />
        <MaxWidthWrapper className="mb-20">{children}</MaxWidthWrapper>
        <Footer />
      </body>
    </html>
  );
}
