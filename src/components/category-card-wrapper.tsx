import cn from "@/utils/cn";
import React, { FC, HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const CategoryCardWrapper: FC<Props> = ({ children, className, ...props }) => {
  return (
    <section {...props} className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3", className)}>
      {children}
    </section>
  );
};

export default CategoryCardWrapper;
