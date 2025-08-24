import { TButtonProps } from "@/types/TButton";

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disable,
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      className={`${className} bg-yellow_100 font-poppins text-lg rounded-lg text-black p-2 custom_shadow_hover cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
