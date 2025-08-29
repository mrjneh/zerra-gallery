import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className=" w-screen h-screen flex flex-col bg-gradient-to-b from-[#201815] via-[#4A3628] to-[#A8936D]">
      <Header />

      <main className="relative rounded-3xl overflow-y-scroll flex-1 bg-[#F8F4EC] m-2 p-6">
        <Outlet />
      </main>
    </div>
  );
}
