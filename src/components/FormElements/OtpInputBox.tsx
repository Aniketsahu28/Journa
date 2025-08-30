"use client";

import { TOtpInputBoxHandle } from "@/types/formElements/TOtpInputBoxHandle";
import { TOtpInputBoxProps } from "@/types/formElements/TOtpInputBoxProps";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

const OtpInputBox = forwardRef<TOtpInputBoxHandle, TOtpInputBoxProps>(
  (
    {
      name = "otp",
      label,
      length = 5,
      value,
      onChange,
      onComplete,
      error,
      required,
      disabled,
      className = "",
      inputClassName = "",
    },
    ref
  ) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const [internal, setInternal] = useState<string>("".padEnd(length, " "));
    const isControlled = typeof value === "string";
    const current = isControlled ? value ?? "" : internal;
    const digits = useMemo(
      () => (current + "".padEnd(length, " ")).slice(0, length).split(""),
      [current, length]
    );

    useImperativeHandle(ref, () => ({
      focus: (index = 0) => {
        inputsRef.current[index]?.focus();
        inputsRef.current[index]?.select?.();
      },
      clear: () => {
        updateValue("".padEnd(length, " "));
        inputsRef.current[0]?.focus();
      },
      getValue: () => current.replace(/\s/g, ""),
    }));

    useEffect(() => {
      // Ensure internal length is always correct for uncontrolled
      if (!isControlled && internal.length !== length) {
        setInternal("".padEnd(length, " "));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length]);

    const updateValue = (next: string) => {
      if (isControlled) {
        onChange?.(next.replace(/\s/g, ""));
      } else {
        setInternal(next);
        onChange?.(next.replace(/\s/g, ""));
      }
      const clean = next.replace(/\s/g, "");
      if (clean.length === length && !clean.includes(" ")) {
        onComplete?.(clean);
      }
    };

    const setAtIndex = (index: number, char: string) => {
      const nextArr = [...digits];
      nextArr[index] = char;
      updateValue(nextArr.join(""));
    };

    const handleChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Only digits; take last typed digit if multiple
        const match = raw.replace(/\D/g, "");
        if (!match) {
          setAtIndex(index, " ");
          return;
        }
        const last = match[match.length - 1];
        setAtIndex(index, last);

        // Move focus to next empty input
        const nextIdx = Math.min(index + 1, length - 1);
        inputsRef.current[nextIdx]?.focus();
        inputsRef.current[nextIdx]?.select?.();
      };

    const handleKeyDown =
      (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;

        if (key === "Backspace") {
          if (digits[index].trim() === "") {
            const prev = Math.max(0, index - 1);
            setAtIndex(prev, " ");
            inputsRef.current[prev]?.focus();
            inputsRef.current[prev]?.select?.();
          } else {
            setAtIndex(index, " ");
          }
          e.preventDefault();
        }

        if (key === "ArrowLeft") {
          const prev = Math.max(0, index - 1);
          inputsRef.current[prev]?.focus();
          inputsRef.current[prev]?.select?.();
          e.preventDefault();
        }

        if (key === "ArrowRight") {
          const next = Math.min(length - 1, index + 1);
          inputsRef.current[next]?.focus();
          inputsRef.current[next]?.select?.();
          e.preventDefault();
        }

        if (key === "Home") {
          inputsRef.current[0]?.focus();
          inputsRef.current[0]?.select?.();
          e.preventDefault();
        }

        if (key === "End") {
          inputsRef.current[length - 1]?.focus();
          inputsRef.current[length - 1]?.select?.();
          e.preventDefault();
        }
      };

    const handlePaste =
      (index: number) => async (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pasted) return;

        const nextArr = [...digits];
        let j = index;
        for (let i = 0; i < pasted.length && j < length; i++, j++) {
          nextArr[j] = pasted[i];
        }
        const next = nextArr.join("");
        updateValue(next);

        // Focus the last filled (or end)
        const lastFilled = Math.min(index + pasted.length, length - 1);
        inputsRef.current[lastFilled]?.focus();
        inputsRef.current[lastFilled]?.select?.();
      };

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label htmlFor={name} className="text-black/70 font-nunito">
            {label} {required ? "*" : null}
          </label>
        )}

        <div className="flex items-center gap-2">
          {Array.from({ length }).map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                if (el) inputsRef.current[i] = el;
              }}
              id={`${name}-${i}`}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digits[i].trim() ? digits[i] : ""}
              onChange={handleChange(i)}
              onKeyDown={handleKeyDown(i)}
              onPaste={handlePaste(i)}
              disabled={disabled}
              required={required && i === 0} // satisfy required without spamming
              className={`font-nunito px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition text-center w-12
                ${error && error.length > 0 ? "border-red" : "border-black/25"}
                ${inputClassName}`}
            />
          ))}
        </div>

        {error && <p className="text-sm text-red font-poppins">{error}</p>}
      </div>
    );
  }
);

OtpInputBox.displayName = "OtpInputBox";

export default OtpInputBox;
