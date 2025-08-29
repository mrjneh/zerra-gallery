import { Link, useSearchParams } from "react-router-dom";
// import useGetProducts from "../features/products/useGetProducts";
import useGetProductCount from "../features/products/useGetProductCount";
import Pagination from "../ui/Pagination";
import PageJump from "../ui/PageJump";
import Spinner from "../ui/Spinner";

import useGetProducts from "../features/products/useGetProducts";
import useCategory from "../features/category/useCategory";

import { HiChevronDown } from "react-icons/hi2";
import { useDeleteProduct } from "../features/products/useDeleteProduct";
import Modal from "../ui/Modal";
import AddProduct from "./AddProduct";
// import { supabase } from "../services/supabase";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageSize = 8;

  const params = Number(searchParams.get("page")) || 1;

  const seeAll = searchParams.get("seeAll") === "true";
  const currentCategory = searchParams.get("category");

  const { products, isFetchingProducts } = useGetProducts(
    // assortType,
    // asc,
    pageSize,
    params,
    seeAll,
    currentCategory
  );

  console.log(products);

  const { productCount } = useGetProductCount(currentCategory);
  const paginationLength = productCount && Math.ceil(productCount / pageSize);

  function handleSeeAll() {
    if (!seeAll) {
      searchParams.set("seeAll", "true");
    } else {
      searchParams.delete("seeAll");
    }
    setSearchParams(searchParams);
  }

  const { categories } = useCategory();

  function handleChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("category", e.target.value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  function handleSorting(assortType: string, asc: string) {
    searchParams.set("sortedBy", assortType);
    searchParams.set("asc", `${asc}`);
    setSearchParams(searchParams);
  }

  const { isDeleting, deleteProduct } = useDeleteProduct();
  return (
    <div className="relative rounded-sm border-2 border-[#201815] w-full h-full overflow-x-scroll">
      {/* Header above the table */}
      <header className="sticky z-50 top-0 flex items-center justify-between p-2 border-b-2 border-b-[#201815] bg-[#F8F4EC]">
        <h2 className="font-bold text-2xl">Products</h2>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => handleSeeAll()}
            className="cursor-pointer bg-[#201815] hover:bg-[#F8F4EC] duration-300 border-[#201815] border-2 hover:text-[#201815] text-[#F8F4EC] rounded-full p-2"
          >
            {seeAll ? "Paginate" : "See All"}
          </button>
          <Link
            to="/addProduct"
            className="hover:bg-[#F8F4EC] duration-300 border-[#201815] border-2 hover:text-[#201815] bg-[#201815] text-[#F8F4EC] rounded-full p-2"
          >
            Add New Product
          </Link>
          <select
            onChange={(e) => handleChangeCategory(e)}
            className="flex items-center justify-center cursor-pointer hover:bg-[#F8F4EC] duration-300 hover:text-[#201815] border-[#201815] border-2 bg-[#201815] text-[#F8F4EC] rounded-full p-2"
          >
            <option value="All">Select a Category </option>
            {categories?.map((cat) => (
              <option value={cat.categoryName} key={cat.id}>
                {cat.categoryName}
              </option>
            ))}
            <option value={"All"}>All</option>
          </select>
        </div>
      </header>
      {/* nhkhikjlok;pljmkiguyghbjkugyvgffvkjugy */}
      {/* SCROLLABLE TABLE WRAPPER */}
      <div
        className={`${
          isFetchingProducts && "flex-col h-full items-center justify-center"
        } max-h-[85%] overflow-y-auto`}
      >
        {isFetchingProducts ? (
          <Spinner />
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead className="bg-[#F8F4EC] text-[#201815] sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-center space-x-1">
                  <span>Stock</span>
                  <button
                    className="align-middle "
                    // onClick={() => handleSor}
                  >
                    <HiChevronDown />
                  </button>
                </th>
                <th className="px-4 py-2 text-center space-x-1">
                  <span>Price</span>
                  <button
                    // onClick={() => handleSortBy("price")}
                    className="align-middle "
                  >
                    <HiChevronDown />
                  </button>
                </th>
                <th className="px-4 py-2 text-center">Discount</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#ddd] hover:bg-[#f9f9f9]"
                  >
                    <td className="px-4 py-2 flex items-center gap-2">
                      <img
                        className="h-10 w-10 rounded object-cover"
                        src={product.image1.image0}
                        alt={product.productName}
                      />
                      {product.productName}
                    </td>
                    <td className="px-4 py-2 pl-6">{product.category}</td>
                    <td className="px-4 py-2 text-center">{product.stock}</td>
                    <td className="px-4 py-2 text-center">
                      ${product.productPrice}
                    </td>
                    <td className="px-4 py-2 text-center">
                      ${product.discount}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <Modal>
                        <Modal.Open opens="edit-form">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                        </Modal.Open>
                        <Modal.Window name="edit-form">
                          <AddProduct productToEdit={product} />
                        </Modal.Window>
                      </Modal>
                      <button
                        disabled={isDeleting}
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:underline disabled:text-gray-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}

      {paginationLength && !seeAll && (
        <div className="h-[7%] border-t-2 border-t-[#201815] bg-[#F8F4EC] absolute bottom-0 w-full flex items-center justify-between">
          <div className="w-13"></div>
          <Pagination totalPages={paginationLength} currentPage={params} />
          <div className="pr-2 flex gap-1.5">
            <PageJump totalPages={paginationLength} />
          </div>
        </div>
      )}
    </div>
  );
}
