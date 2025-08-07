import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

export const Icons = {
    google: FaGoogle,
    Eye: FaEye,
    EyeSlash: FaEyeSlash
}

export type IconName = keyof typeof Icons;