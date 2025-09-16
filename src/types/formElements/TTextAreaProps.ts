import { ChangeEvent } from "react";

export type TTextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  defaultValue?: any;
  borderLess?: boolean;
  maxRows?: number;
  minRows?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};