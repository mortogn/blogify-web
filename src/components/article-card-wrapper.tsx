import cn from "@/utils/cn";
import React, { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const ArticleCardWrapper: FC<Props> = ({ children, className, ...props }) => {
  return (
    <section {...props} className={cn("grid md:grid-cols-4 grid-cols-2 gap-3", className)}>
      {children}
    </section>
  );
};

ArticleCardWrapper.displayName = "ArticleCardWrapper";

export default ArticleCardWrapper;
