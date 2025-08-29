import { useForm, type FieldErrors, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import useAddCategory from "./useAddCategory";

export default function AddCategoryForm() {
  type FormValues = {
    categoryName: string;
    image: FileList;
  };

  const { register, reset, handleSubmit, watch } = useForm<FormValues>();

  const imageFileList = watch("image"); // watch keeps track of file input

  const { addNewCategory, isCreatingNewCategory } = useAddCategory();

  const previewUrl =
    imageFileList && imageFileList.length > 0
      ? URL.createObjectURL(imageFileList[0])
      : null;

  function onSubmit(data: { image: FileList; categoryName: string }) {
    // const {};
    const newCatwgoryObject = {
      categoryName: data.categoryName,
      image: imageFileList[0],
    };
    addNewCategory(newCatwgoryObject);
    reset();
  }

  function onError(errors: FieldErrors<FieldValues>) {
    if (errors === undefined) return;
    Object.values(errors).forEach(
      (err) => err?.message && toast.error(err?.message as string)
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-6 max-w-md  bg-[#F8F4EC] text-[#201815]"
    >
      {/* Preview Image */}
      <div className="w-64 h-42 rounded-xl border-2 border-dashed border-[#201815]/40 flex items-center justify-center bg-[#fcf8f1] overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} className="object-cover w-full h-full" />
        ) : (
          <p className="text-sm text-[#201815]/70">No image selected</p>
        )}
      </div>

      {/* Category Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="categoryName"
          className="text-sm font-semibold text-[#201815]"
        >
          Category Name
        </label>
        <input
          disabled={isCreatingNewCategory}
          id="categoryName"
          type="text"
          className="px-4 py-2 bg-[#fcf8f1] rounded-lg border border-[#201815]/30 focus:outline-none focus:ring-2 focus:ring-[#201815]"
          {...register("categoryName", {
            required: "Category name is required",
          })}
        />
      </div>

      {/* File Upload */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="image"
          className="cursor-pointer flex items-center justify-center gap-2 rounded-lg px-4 py-2 border border-[#201815] bg-[#201815] text-[#F8F4EC] hover:bg-[#F8F4EC] hover:text-[#201815] transition-colors"
        >
          + Upload Image
          <input
            disabled={isCreatingNewCategory}
            className="hidden disabled:cursor-progress"
            type="file"
            id="image"
            {...register("image", { required: "Image must be added" })}
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        disabled={isCreatingNewCategory}
        type="submit"
        className="disabled:cursor-progress mt-4 rounded-lg px-6 py-2 bg-[#201815] text-[#F8F4EC] font-semibold hover:bg-[#F8F4EC] hover:text-[#201815] border border-[#201815] transition-colors"
      >
        Save Category
      </button>
    </form>
  );
}
