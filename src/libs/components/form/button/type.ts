import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "cancel" | "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  href?: string;
};
