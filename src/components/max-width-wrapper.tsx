import cn from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, HTMLAttributes } from "react";

const maxWidthWrapperVariants = cva("px-4 mx-auto w-full", {
  variants: {
    size: {
      md: "max-w-[1450px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof maxWidthWrapperVariants>;

const MaxWidthWrapper: FC<Props> = ({ size, className, children, ...props }) => {
  return (
    <div {...props} className={cn(maxWidthWrapperVariants({ size }), className)}>
      {children}
    </div>
  );
};

MaxWidthWrapper.displayName = "MaxWidthWrapper";

export default MaxWidthWrapper;
