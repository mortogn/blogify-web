import cn from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const buttonVariants = cva("font-medium rounded-md tracking-wide transition-colors duration-300 ease-in-out", {
  variants: {
    variant: {
      primary: "bg-slate-800 text-white hover:bg-slate-700",
      secondary: "",
      ghost: "hover:bg-slate-100",
    },
    size: {
      sm: "",
      md: "h-10 px-4",
      lg: "h-12 px-6",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button {...props} ref={ref} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </button>
  );
});

export default Button;
