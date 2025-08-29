import toast from "react-hot-toast";
import { supabase } from "./supabase";
import { makeUpperCaseTitle } from "../helpers/makeUpperCase";

type paramss = {
  productName: string;
  stock: number;
  description: string;
  productPrice: string;
  discount: string;
  category: string;
  // image1: string[];
};

type EditParams = {
  productName: string;
  stock: number;
  description: string;
  productPrice: string;
  discount: string;
};

type newObjectType = {
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

export async function addProduct(
  newProduct: paramss,
  images: { file: File; url: string }[]
) {
  const photoList = await addPhotos(newProduct?.productName, images);

  const imageObject = photoList.reduce((acc, img, i) => {
    acc[`image${i}`] = img;
    return acc;
  }, {} as Record<string, string>);

  const newProductObject: newObjectType = {
    ...newProduct,
    image1: { ...imageObject },
  };

  const { data, error } = await supabase
    .from("products")
    .insert([{ ...newProductObject }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("New product could not be created.");
  }
  return data;
}

export async function addPhotos(
  productName: string,
  images: { file: File; url: string }[]
): Promise<string[]> {
  const { error: bucketError } = await supabase.storage.createBucket(
    productName,
    {
      public: true,
    }
  );

  if (bucketError && bucketError.message !== "The resource already exists") {
    toast.error(bucketError.message);
    return [];
  }

  const photoList: string[] = [];

  for (const [index, img] of images.entries()) {
    const { file } = img;

    const { data, error } = await supabase.storage
      .from(productName)
      .upload(`public/${productName}-${index}.jpg`, file);

    if (error) {
      console.error("Upload error:", error.message);
      toast.error(error.message);
      continue;
    }

    if (data?.path) {
      const { data: publicData } = supabase.storage
        .from(productName)
        .getPublicUrl(data.path);
      photoList.push(publicData.publicUrl);
      console.log(photoList);
    }
  }

  return photoList;
}

export async function getProductsApi(
  pageNumber: number,
  pageSize: number,
  seeAll: boolean,
  category: string | null
) {
  if (category) category = makeUpperCaseTitle(category);

  if (category === "All" || !category) {
    if (seeAll) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        toast.error("products can not be fetched from database");
        toast.error(error.message);
        throw new Error(error.message);
      }

      return products;
    }
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);

    if (error) {
      toast.error("can not get paginated products");
      throw new Error(error.message);
    }

    return products;
  }
  if (category) {
    if (seeAll) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category);

      if (error) {
        toast.error("products can not be fetched from database");
        toast.error(error.message);
        throw new Error(error.message);
      }

      return products;
    } else {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .range((pageNumber - 1) * pageSize, pageNumber * pageSize - 1);

      if (error) {
        toast.error("can not get paginated products");
        throw new Error(error.message);
      }

      return products;
    }
  }
}

export async function getProductCount(category: string | null) {
  if (category) category = makeUpperCaseTitle(category);

  if (category === "All" || !category) {
    const { count: productsNumber, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (countError) {
      toast.error("can not count the number of products");
      throw new Error(countError.message);
    }

    return productsNumber;
  } else {
    const { count: productsNumber, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category", category);

    if (countError) {
      toast.error("can not count the number of products");
      throw new Error(countError.message);
    }

    return productsNumber;
  }
}

export async function deleteProductApi(id: number) {
  const res = window.confirm("Are you sure to delete this product?");
  if (!res) throw new Error("can not delete");
  await supabase.from("products").delete().eq("id", id);
}

export async function editProductsApi(
  id: number | undefined,
  editedObject: EditParams
) {
  const { error } = await supabase
    .from("products")
    .update(editedObject)
    .eq("id", id)
    .select();

  if (error) {
    toast.error(error.message);
  }
}

export async function assortedProductsApi(assortType: string, asc: string) {
  const ascend = asc === "true" ? true : false;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order(assortType, { ascending: ascend });
}
