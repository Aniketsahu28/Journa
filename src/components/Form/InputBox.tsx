"use client";

import { TInputBoxProps } from "@/types/TInputBoxProps";
import { forwardRef } from "react";

const InputBox = forwardRef<HTMLInputElement, TInputBoxProps>(
  ({ name, label, type, placeholder, onChange, error, required }, ref) => {
    return (
      <div className="flex flex-col gap-1">
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
          className={`text-lg font-nunito w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition ${
            error && error?.length > 0 ? "border-red" : "border-black/25"
          }`}
        />
        {error && error.length > 0 && (
          <p className="text-red-500 text-sm">{error[0]}</p>
        )}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;
