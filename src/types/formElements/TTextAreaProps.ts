import { ChangeEvent } from "react";

export type TTextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  borderLess?: boolean;
  maxRows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};