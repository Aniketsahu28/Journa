"use client";

import { TInputBoxProps } from "@/types/formElements/TInputBoxProps";
import { forwardRef } from "react";

const InputBox = forwardRef<HTMLInputElement, TInputBoxProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      onChange,
      error,
      required,
      className = "",
      defaultValue,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={name} className="text-black font-nunito">
            {label}
          </label>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={ref}
          required={required}
          defaultValue={defaultValue}
          className={`font-nunito px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition ${
            error && error?.length > 0 ? "border-red" : "border-black/25"
          } ${className}`}
        />
        {error && <p className="text-sm text-red font-poppins">{error}</p>}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;
