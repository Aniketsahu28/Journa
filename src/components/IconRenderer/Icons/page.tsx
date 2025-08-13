import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

export const Icons = {
  google: FaGoogle,
  Eye: FaEye,
  EyeSlash: FaEyeSlash,
  Verified: MdVerifiedUser,
  Failed: FaExclamationCircle,
};

export type IconName = keyof typeof Icons;
