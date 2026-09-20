import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,box-shadow] duration-[var(--motion-quick,150ms)] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg hover:opacity-90 active:scale-[0.98] shadow-[var(--shadow-border)]",
        secondary:
          "bg-bg-subtle text-fg hover:bg-bg-hover shadow-[var(--shadow-border)]",
        ghost: "text-fg-muted hover:text-fg hover:bg-bg-subtle",
        outline:
          "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-bg-subtle",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm [&_svg]:size-4",
        md: "h-11 rounded-[var(--radius-sm)] px-4 text-sm [&_svg]:size-4",
        lg: "h-12 rounded-[var(--radius-md)] px-5 text-[0.9375rem] [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
