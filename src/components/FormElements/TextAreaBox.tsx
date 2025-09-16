"use client";

import { TTextAreaProps } from "@/types/formElements/TTextAreaProps";
import { forwardRef, useRef, useEffect, ChangeEvent } from "react";

const TextAreaBox = forwardRef<HTMLTextAreaElement, TTextAreaProps>(
  (
    {
      name,
      label,
      placeholder,
      onChange,
      error,
      required,
      className = "",
      defaultValue,
      borderLess,
      maxRows = 5,
      minRows = 0, // ✅ added default
    },
    ref
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustHeight = (el: HTMLTextAreaElement) => {
      el.style.height = "auto"; // reset height
      const lineHeight = parseInt(
        window.getComputedStyle(el).lineHeight || "20",
        10
      );

      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;

      const newHeight = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);

      el.style.height = `${newHeight}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    };

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const el = e.target;
      adjustHeight(el);
      onChange?.(e);
    };

    useEffect(() => {
      if (textAreaRef.current) {
        adjustHeight(textAreaRef.current);
      }
    }, [defaultValue, maxRows, minRows]);

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={name} className="text-black font-nunito">
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          ref={(el) => {
            textAreaRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.RefObject<HTMLTextAreaElement | null>).current = el;
          }}
          placeholder={placeholder}
          onChange={handleInput}
          required={required}
          defaultValue={defaultValue}
          rows={minRows || 1} // ✅ respects minRows
          className={`resize-none font-nunito rounded-md transition ${
            borderLess
              ? "outline-none py-1"
              : "border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          } ${
            error && error?.length > 0
              ? "border-red"
              : !borderLess && "border-black/25"
          } ${className}`}
        />
        {error && <p className="text-sm text-red font-poppins">{error}</p>}
      </div>
    );
  }
);

TextAreaBox.displayName = "TextAreaBox";

export default TextAreaBox;
