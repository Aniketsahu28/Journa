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
      onKeyDown,
      error,
      required,
      className = "",
      defaultValue,
      borderLess,
      autoFocus
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
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
          onKeyDown={onKeyDown}
          ref={ref}
          required={required}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          className={`font-nunito rounded-md transition ${borderLess ? "outline-none":"border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"} ${
            error && error?.length > 0 ? "border-red" : !borderLess && "border-black/25"
          } ${className}`}
        />
        {error && <p className="text-sm text-red font-poppins">{error}</p>}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

export default InputBox;
