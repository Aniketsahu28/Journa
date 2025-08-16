import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

export const Icons = {
  google: FaGoogle,
  Eye: FaEye,
  EyeSlash: FaEyeSlash,
  Verified: MdVerifiedUser,
  Failed: FaExclamationCircle,
  Calender: FaRegCalendarAlt,
  Arrow: IoIosArrowDown,
};

export type IconName = keyof typeof Icons;
