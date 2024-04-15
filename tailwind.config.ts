import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins)",
        "space-grotesk": "var(--font-space-grotesk)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
