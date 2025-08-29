import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductsApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

type Paramss = {
  id: number | undefined;
  newObject: {
    productName: string;
    stock: number;
    description: string;
    productPrice: string;
    discount: string;
  };
};

export default function useEditProducts() {
  const queryClient = useQueryClient();
  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newObject }: Paramss) => editProductsApi(id, newObject),
    onError: () => toast("can not edit item"),
    onSuccess: () => {
      toast.success("item edited");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { editProduct, isEditing };
}
