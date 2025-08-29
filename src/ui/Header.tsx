import { BiSearchAlt2 } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <header className="px-7 pt-5 font-semibold p-3 h-14 flex items-center w-full justify-between text-[#F8F4EC]">
      <div className="w-[4rem] h-[2rem]">
        <Logo color="white" />
      </div>

      <MainNav />

      <div className="flex gap-5  items-center ">
        <BiSearchAlt2 size={22} />
        <IoIosNotificationsOutline size={22} />
        <img className="w-[1.4rem] h-[1.4rem] rounded-full" />
      </div>
    </header>
  );
}
