"use client";

import { TInputBoxProps } from "@/types/formElements/TInputBoxProps";
import { forwardRef, useState } from "react";
import IconRenderer from "../IconRenderer/page";

const PasswordInputBox = forwardRef<HTMLInputElement, TInputBoxProps>(
  (
    { name, label, placeholder, onChange, error, required, className = "" },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleVisibility = () =>
      setShowPassword((showPassword) => !showPassword);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-black/70 font-poppins">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            required={required}
            className={`w-full text-lg font-nunito px-4 py-2 pr-11 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition ${
              error && error?.length > 0 ? "border-red" : "border-black/25"
            } ${className}`}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <IconRenderer name="EyeSlash" size={24} />
            ) : (
              <IconRenderer name="Eye" size={24} />
            )}
          </button>
        </div>
        {error && <p className="text-sm text-red font-poppins">{error}</p>}
      </div>
    );
  }
);

PasswordInputBox.displayName = "PasswordInputBox";

export default PasswordInputBox;
