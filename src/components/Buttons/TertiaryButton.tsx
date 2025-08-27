import { TButtonProps } from "@/types/TButton";

const TertiaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  style,
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} cursor-pointer rounded-md items-center`}
      style={style}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
