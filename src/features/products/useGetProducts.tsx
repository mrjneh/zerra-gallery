import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../../services/apiProducts";

export default function useGetProducts(
  pageSize: number,
  pageNumber: number,
  seeAll: boolean,
  category: string | null
) {
  const { data: products, isPending: isFetchingProducts } = useQuery({
    queryKey: ["products", pageNumber, seeAll, category],
    queryFn: () => getProductsApi(pageNumber, pageSize, seeAll, category),
  });

  return { products, isFetchingProducts };
}
