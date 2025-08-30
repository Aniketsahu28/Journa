import { TButtonProps } from "@/types/TButton";

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disable,
  style,
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      style={style}
      className={`${className} bg-yellow_100 font-poppins font-medium rounded-md text-black p-2 custom_shadow_hover cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
