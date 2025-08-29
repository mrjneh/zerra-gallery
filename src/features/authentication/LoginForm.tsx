import Logo from "../../ui/Logo";

export default function LoginForm() {
  return (
    <div className="divide-yellow-950 divide-x-1 font-serif shadow-md text-stone-950 rounded-md flex items-center justify-around m-auto w-200 text-center h-100 z-20 bg-[rgba(160,130,87,0.19)]">
      <div className="w-[40%] pr-2 gap-2 centralizer flex-col opacity-70">
        <Logo />
      </div>

      <div className="items-center flex flex-col p-1.5 w-[60%]">
        <p className="text-lg">Login to your account</p>
        <form className="mt-7 flex items-center flex-col gap-3 w-[100%]">
          <div className="flex gap-1 flex-col w-[60%] items-start">
            <label className="text-sm" htmlFor="">
              Email :
            </label>
            <input
              type="email"
              className=" focus:outline-none focus:ring focus:ring-stone-900 px-2   border  w-[100%] rounded-sm bg-[rgba(159,139,112,0.16)]"
            />
          </div>

          <div className="flex gap-1 w-[60%] flex-col items-start">
            <label className="text-sm" htmlFor="">
              Password :
            </label>
            <input
              type="password"
              className="w-[100%] focus:outline-none focus:ring focus:ring-stone-900 px-2 border-1 rounded-sm  bg-[rgba(159,139,112,0.16)]"
            />
          </div>
          <button
            type="submit"
            className="active:bg-[rgba(159,139,112,0.77)] active:shadow-none transition-all duration-300 bg-[rgba(159,139,112,0.77)] hover:bg-[rgba(159,139,112,0.19)] mt-3 w-[50%] bg- cursor-pointer shadow-md  py-0.5 px-3 self-center rounded-2xl"
          >
            Login
          </button>
          <a
            className=" opacity-40 text-[0.8rem] hover:opacity-80 transition-all duration-300  mt-[-0.4rem] "
            href="#"
          >
            Forgotten your password?
          </a>
        </form>
      </div>
    </div>
  );
}
