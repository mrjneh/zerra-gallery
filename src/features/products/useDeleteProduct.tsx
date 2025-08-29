import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductApi } from "../../services/apiProducts";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteProductApi(id),
    onSuccess: () => {
      toast.success("Product is delted.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => toast.error("the productt can not be deleted"),
  });

  return { isDeleting, deleteProduct };
}
