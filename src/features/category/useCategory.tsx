import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategory";

type categoryType = {
  id: number;
  image: string;
  categoryName: string;
};

export default function useCategory(): {
  isPending: boolean;
  categories: categoryType[] | undefined;
  error: Error | null;
} {
  const {
    isPending,
    data: categories,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return { isPending, categories, error };
}
