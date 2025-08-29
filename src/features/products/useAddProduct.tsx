import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "../../services/apiProducts";
import type { UseFormReset } from "react-hook-form";

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

type params = {
  dataObject: newObjectType;
  images: { file: File; url: string }[];
};

export default function CreateNewProduct(
  reset: UseFormReset<FormValues>,
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        file: File;
        url: string;
      }[]
    >
  >
) {
  const { mutate: uploadNewProduct, isPending: isUploading } = useMutation({
    mutationFn: (paramss: params) =>
      addProduct(paramss.dataObject, paramss.images),
    onSuccess: () => {
      toast.success("new product created");
      reset();
      setImages([]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { uploadNewProduct, isUploading };
}
