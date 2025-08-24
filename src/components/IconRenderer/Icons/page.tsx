import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdVerifiedUser, MdAccessAlarms } from "react-icons/md";
import { IoIosArrowDown, IoMdOptions } from "react-icons/io";
import { BsLayoutSidebarInset } from "react-icons/bs";
import {
  IoMapOutline,
  IoCheckboxOutline,
  IoMailUnreadOutline,
  IoSearchOutline,
  IoCalendarClearOutline,
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
  Calender: IoCalendarClearOutline,
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
  Filter: IoMdOptions,
  Clock: MdAccessAlarms,
};

export type IconName = keyof typeof Icons;
