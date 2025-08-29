import { NavLink } from "react-router-dom";

export default function MainNav() {
  const navList = {
    category: "Category",
    products: "Products",
    sales: "Sales",
    addProduct: "Add Product",
    customers: "Customers",
  };
  return (
    <ul className="flex gap-6 ">
      {Object.entries(navList).map(([addresss, namee]) => (
        <NavLink
          key={namee}
          style={({ isActive }) => ({
            color: isActive ? "#201815" : "#F8F4EC",
            backgroundColor: isActive ? "#F8F4EC" : "",
          })}
          className={`hover:bg-[#F8F4EC] duration-300 hover:!text-[#201815] font-semibold  rounded-full p-2`}
          to={`/${addresss}`}
        >
          <li>{namee}</li>
        </NavLink>
      ))}
    </ul>
  );
}
