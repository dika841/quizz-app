import { FC, ReactElement } from "react";
import { TButton } from "./type";
import { Link } from "react-router-dom";
import clsx from "clsx";

export const Button: FC<TButton> = (props): ReactElement => {
  const { isLoading = false, variant = "primary", size = "md" } = props;
  const className = clsx(
    "rounded-lg border hover:opacity-80",
    {
      "bg-indigo-800 text-white": variant === "primary",
      "bg-green-600 text-white": variant === "secondary",
      "bg-white text-gray-600 border-gray-600": variant === "cancel",
    },
    {
      "px-3 py-2 text-sm": size === "sm",
      "px-4 py-2 text-base": size === "md",
      "px-6 py-3 text-base": size === "lg",
      "px-6 py-3 text-base w-full": size === "full",
    }
  );
  return (
    <section>
      {props.href ? (
        <Link to={props.href}>
          <button className={className} {...props}>
            {isLoading ? "Loading..." : props.children}
          </button>
        </Link>
      ) : (
        <button className={className} {...props}>
          {isLoading ? "Loading..." : props.children}
        </button>
      )}
    </section>
  );
};
