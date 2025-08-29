import { useForm, type FieldErrors } from "react-hook-form";
import UploadImg from "../features/addProduct/UploadImg";
import toast from "react-hot-toast";
import { useState } from "react";
import useCategory from "../features/category/useCategory";
import Modal from "../ui/Modal";
import AddCategoryForm from "../features/category/AddCategoryForm";
import useAddProduct from "../features/products/useAddProduct";
import useEditProducts from "../features/products/useEditProducts";

type props = {
  productToEdit?: {
    id: number;
    productName: string;
    stock: number;
    description: string;
    productPrice: string;
    discount: string;
    category: string;
    image1: {
      [x: string]: string;
    };
  };
};

export default function AddProduct({ productToEdit }: props) {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [mainImage, setMainImage] = useState<
    { file: File; url: string } | undefined
  >(undefined);
  type FormValues = {
    productName: string;
    stock: number;
    description: string;
    productPrice: string;
    discount: string;
    category: string;
    image1: {
      [x: string]: string;
    };
  };

  type newObjectType = {
    productName: string;
    stock: number;
    description: string;
    productPrice: string;
    discount: string;
    category: string;
    // image1: {
    //   [x: string]: string;
    // };
  };
  const editId = productToEdit?.id;
  const editSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues } = useForm<FormValues>({
    defaultValues: editSession ? { ...productToEdit } : {},
  });
  let editImages;

  const { uploadNewProduct, isUploading } = useAddProduct(reset, setImages);
  console.log(productToEdit);
  if (productToEdit?.image1) editImages = Object.values(productToEdit?.image1);
  console.log(editImages);

  const { editProduct, isEditing } = useEditProducts();

  async function onSubmit(data: FormValues) {
    const newProductObject: newObjectType = {
      ...data,
    };

    const paramss = { dataObject: newProductObject, images };

    const { productName, stock, description, productPrice, discount } = data;

    if (editSession) {
      editProduct({
        id: editId,
        newObject: { productName, stock, description, productPrice, discount },
      });
    } else {
      uploadNewProduct(paramss);
    }
  }

  const { categories } = useCategory();

  function onError(errors: FieldErrors<FormValues>) {
    Object.values(errors).forEach((err) => {
      if (err?.message) toast.error(err.message as string);
    });
  }
  const isLoading = isEditing || isUploading;
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-3 text-[#201815]">
          <h1>{editSession ? "Edit Product" : "Add Product"}</h1>
          <p>Fill this form bellow and add new product.</p>
        </div>
        <div className="flex gap-1">
          <button
            disabled={isLoading}
            type="submit"
            className="p-2 flex items-center justify-center rounded-full disabled:cursor-progress h-[2rem] w-[4rem] bg-[#201815] text-[#F8F4EC]"
          >
            {editSession ? "Edit" : "Save"}
          </button>

          <button
            type="reset"
            disabled={isLoading}
            className="p-2 flex items-center justify-center  rounded-full border-1 h-[2rem] w-[4rem] border-[#201815]"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[1.75fr_1fr] mt-5 gap-5">
        <div
          className={`border-1 divide-y-1 border-[#201815] p-3 rounded-3xl ${
            editSession ? "" : "h-[90%]"
          }`}
        >
          <h2 className="mb-2 pb-2 font-semibold">General</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="productName">Product Name</label>
              <input
                disabled={isLoading}
                type="text"
                id="productName"
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="border-1 border-[#201815] p-1 rounded-md bg-[#fcf8f1]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="stock">Stock</label>
              <input
                disabled={isLoading}
                id="stock"
                type="number"
                {...register("stock", {
                  required: "Stock number is required",
                  min: {
                    value: 1,
                    message: "At least 1 product is required",
                  },
                })}
                className="border-1 border-[#201815] p-1 rounded-md bg-[#fcf8f1]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                disabled={isLoading}
                id="description"
                {...register("description", {
                  required: "description is required",
                })}
                className="h-[7rem] p-1 rounded-md border-1 border-[#201815] bg-[#fcf8f1]"
              />
            </div>
          </div>
        </div>

        {editSession ? null : (
          <div className="border-1 divide-y-1 border-[#201815] p-3 rounded-3xl ">
            <h2 className="mb-2 pb-2 font-semibold">Upload Img</h2>
            <div className=" flex flex-col items-center h-full gap-5 shrink ">
              <UploadImg
                images={images}
                setImages={setImages}
                mainImage={mainImage}
                setMainImage={setMainImage}
              >
                <input
                  id="images"
                  type="file"
                  multiple
                  className="hidden"
                  disabled={isLoading}
                />
              </UploadImg>
            </div>
          </div>
        )}

        <div
          className={`border-1 divide-y-1 border-[#201815] p-3 rounded-3xl ${
            editSession ? "" : "translate-y-[-20%]"
          }`}
        >
          <h2 className="mb-2 pb-2 font-semibold">Pricing</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="productPrice">Price</label>
              <input
                disabled={isLoading}
                id="productPrice"
                {...register("productPrice", {
                  required: "Product price is required.",
                })}
                type="text"
                className="border-1 border-[#201815] p-1 rounded-md bg-[#fcf8f1]"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="discount">Discount</label>
              <input
                disabled={isLoading}
                id="discount"
                type="text"
                className="border-1 border-[#201815] p-1 rounded-md bg-[#fcf8f1]"
                {...register("discount", {
                  required: "Discount is required",
                  validate: (value) =>
                    Number(value) <= Number(getValues("productPrice")) ||
                    "Discount should be less than regular price",
                })}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            editSession ? "" : "h-[80%]"
          } border-1 divide-y-1 border-[#201815] p-3 rounded-3xl`}
        >
          <h2 className="mb-2 pb-2 font-semibold">Category</h2>
          <div className="flex flex-col gap-4">
            <div className={`flex flex-col gap-2`}>
              <label htmlFor="category">Product Category</label>
              <div className="flex gap-3 justify-between">
                <select
                  disabled={isLoading}
                  id="category"
                  {...register("category", {
                    required: "category is required.",
                  })}
                  className="border-1 border-[#201815] p-1 rounded-md bg-[#fcf8f1] w-[60%]"
                >
                  {categories?.map((cat) => (
                    <option key={cat.id}>{cat.categoryName}</option>
                  ))}
                </select>
                {editSession ? null : (
                  <Modal>
                    <Modal.Open opens="category-form">
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        disabled={isLoading}
                        className="p-2 flex items-center justify-center rounded-full w-[40%] bg-[#201815] text-[#F8F4EC]"
                      >
                        Add Category
                      </button>
                    </Modal.Open>
                    <Modal.Window name="category-form">
                      <AddCategoryForm />
                    </Modal.Window>
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
