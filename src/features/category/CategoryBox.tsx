import { NavLink } from "react-router-dom";

type props = {
  name: string;
  image: string | null;
};

export default function CategoryBox({ name, image }: props) {
  return (
    <li>
      <NavLink
        to={`/products?category=${name}`}
        className="group relative flex items-center justify-center h-[15rem] w-[30rem] bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay with opacity */}
        <div className="absolute inset-0 bg-[#201815] opacity-60 rounded-xl group-hover:opacity-80 transition-opacity duration-300"></div>

        {/* Text stays full opacity */}
        <div className="absloute z-10 text-[#F8F4EC] text-4xl font-bold">
          {name}
        </div>
      </NavLink>
    </li>
  );
}
