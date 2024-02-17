import { FC, ReactElement } from "react";
import { TInputField } from "./type";
import clsx from "clsx";

export const TextField: FC<TInputField> = ({ ...props }): ReactElement => {
  const className = clsx(
    "bg-gray-50 py-2 px-3 border-2 border-gray-200 rounded outline-1 outline-gray-300 text-base"
  );
  return (
    <div className="flex flex-col w-full gap-y-1">
      <label htmlFor={props.name}>
        {props.label} <span className="text-red-500">*</span>
      </label>
      <input {...props} id={props.name} className={className} />
    </div>
  );
};
