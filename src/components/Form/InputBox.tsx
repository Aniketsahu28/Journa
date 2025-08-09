"use client";

import { TInputBoxProps } from "@/types/TInputBoxProps";
import { forwardRef } from "react";

const InputBox = forwardRef<HTMLInputElement, TInputBoxProps>(
  (
    {
      name,
      label,
      type,
      placeholder,
      onChange,
      error,
      required,
      className = "",
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={name} className="text-black/70 font-poppins">
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
          className={`text-lg font-nunito px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition ${
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
