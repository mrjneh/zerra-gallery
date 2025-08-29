import { useQuery } from "@tanstack/react-query";
import { getProductCount } from "../../services/apiProducts";

export default function useGetProductCount(category: string | null) {
  const { data: productCount, isPending: isCounting } = useQuery({
    queryKey: ["productsCount", category],
    queryFn: () => getProductCount(category),
  });

  return { productCount, isCounting };
}
