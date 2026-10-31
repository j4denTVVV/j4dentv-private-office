import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Shared button styling for public site and Private HQ.
export const luxButton = cva(
  "group inline-flex items-center justify-center gap-2.5 rounded-lg text-[12px] font-medium uppercase tracking-[0.18em] transition-[background,color,border-color,transform] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background hover:bg-champagne",
        ghost: "border border-line-strong text-foreground hover:border-champagne/60 hover:bg-elevated",
      },
      size: { md: "h-12 px-6", sm: "h-9 px-4" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type LuxButtonProps = VariantProps<typeof luxButton> & { className?: string };
export const lux = (p: LuxButtonProps) => cn(luxButton(p), p.className);
