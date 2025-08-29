import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import Products from "./pages/Products";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <AppLayout />,
    path: "/",
    children: [
      {
        path: "/products",
        element: <Products />,
      },

      {
        path: "/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
]);

export default router;
