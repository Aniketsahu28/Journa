import { TButtonProps } from "@/types/utils/TButton";

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
      className={`${className} cursor-pointer font-nunito rounded-md items-center`}
      style={style}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
