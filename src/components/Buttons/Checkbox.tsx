import { TCheckboxProps } from "@/types/utils/TCheckbox";
import { useState } from "react";
import IconRenderer from "../IconRenderer/page";

const Checkbox = ({
  name = "",
  id = "",
  checked,
  onChange,
  className = "",
  disable,
  style,
}: TCheckboxProps) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClicked(true);
    onChange?.(e);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <label
      htmlFor={id}
      className={`relative inline-flex items-center justify-center min-w-5 min-h-5
                  rounded-full border-[1px] border-black/75 cursor-pointer
                  ${checked ? "bg-green" : ""}
                  ${disable ? "opacity-50 cursor-not-allowed" : ""}
                  ${className}`}
      style={style}
      onClick={(event) => event.stopPropagation()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Native checkbox hidden */}
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disable}
        className="hidden"
      />

      {/* Tick Icon */}
      <IconRenderer
        name="Tick"
        size={14}
        className={`
          transition-all duration-200 ease-out mt-[1px]
          ${checked ? "opacity-100 text-white" : "opacity-0 text-black"}
          ${!checked && hovered ? "opacity-100" : ""}
          ${clicked ? "scale-125" : ""}
        `}
      />
    </label>
  );
};

export default Checkbox;