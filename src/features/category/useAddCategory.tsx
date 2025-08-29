import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../services/apiCategory";
import toast from "react-hot-toast";

export default function useAddCategory() {
  const queryClient = useQueryClient();

  const { mutate: addNewCategory, isPending: isCreatingNewCategory } =
    useMutation({
      mutationFn: (data: { categoryName: string; image: File }) =>
        addCategory(data),
      onSuccess: () => {
        toast.success("New Category is added");
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { addNewCategory, isCreatingNewCategory };
}
