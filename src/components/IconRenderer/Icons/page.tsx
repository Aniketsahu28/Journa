import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import { MdVerifiedUser, MdAccessAlarms } from "react-icons/md";
import {
  IoIosArrowDown,
  IoMdOptions,
  IoIosStarOutline,
  IoMdCheckmark,
} from "react-icons/io";
import { BsLayoutSidebarInset } from "react-icons/bs";
import {
  IoMapOutline,
  IoMailUnreadOutline,
  IoSearchOutline,
  IoCalendarClearOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoBugOutline,
  IoShieldCheckmarkOutline,
  IoDuplicateOutline,
  IoMove,
  IoMailOutline,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { GoHome, GoQuestion, GoTrash } from "react-icons/go";
import { FiPlus, FiEdit3 } from "react-icons/fi";
import { BiDotsHorizontalRounded, BiSupport } from "react-icons/bi";

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
  ContactMail: IoMailOutline,
  Home: GoHome,
  Map: IoMapOutline,
  Check: IoCheckmarkCircleOutline,
  Plus: FiPlus,
  MoreInfo: BiDotsHorizontalRounded,
  Question: GoQuestion,
  Filter: IoMdOptions,
  Clock: MdAccessAlarms,
  Settings: IoSettingsOutline,
  Logout: IoLogOutOutline,
  Bug: IoBugOutline,
  Star: IoIosStarOutline,
  Protect: IoShieldCheckmarkOutline,
  Support: BiSupport,
  Delete: GoTrash,
  Edit: FiEdit3,
  Tick: IoMdCheckmark,
  Duplicate: IoDuplicateOutline,
  Move: IoMove,
  Instagram: IoLogoInstagram,
  Linkedin: IoLogoLinkedin,
};

export type IconName = keyof typeof Icons;
