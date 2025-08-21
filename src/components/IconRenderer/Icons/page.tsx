import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BsLayoutSidebarInset } from "react-icons/bs";
import {
  IoMapOutline,
  IoCheckboxOutline,
  IoMailUnreadOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { GoHome, GoQuestion } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";

export const Icons = {
  google: FaGoogle,
  Eye: FaEye,
  EyeSlash: FaEyeSlash,
  Verified: MdVerifiedUser,
  Failed: FaExclamationCircle,
  Calender: FaRegCalendarAlt,
  Arrow: IoIosArrowDown,
  SideBar: BsLayoutSidebarInset,
  Search: IoSearchOutline,
  Mail: IoMailUnreadOutline,
  Home: GoHome,
  Map: IoMapOutline,
  Check: IoCheckboxOutline,
  Plus: FiPlus,
  MoreInfo: BiDotsHorizontalRounded,
  Question: GoQuestion,
};

export type IconName = keyof typeof Icons;
