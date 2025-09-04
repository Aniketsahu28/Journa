import { TButtonProps } from "@/types/utils/TButton";

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: TButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} bg-white rounded-md text-black p-2 border-1 border-black/25 custom_shadow_hover cursor-pointer font-medium font-nunito`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
