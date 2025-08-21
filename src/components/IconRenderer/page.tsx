import { TIcon } from "@/types/TIcon";
import { Icons } from "./Icons/page";

const IconRenderer = ({ name, size = 22, className = "" }: TIcon) => {
  const IconComponent = Icons[name];

  return <IconComponent size={size} className={`${className}`} />;
};

export default IconRenderer;
