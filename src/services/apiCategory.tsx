import toast from "react-hot-toast";
import { supabase } from "./supabase";

export async function getCategories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    toast.error("can not get categories");
    throw new Error("can not get categories");
  }

  return categories;
}

export async function addCategory(data: { categoryName: string; image: File }) {
  const categoryName = data.categoryName;
  const avatarFile = data.image;

  const { data: imagePath, error: uploadError } = await supabase.storage
    .from("category_backgrounds")
    .upload(`${data.categoryName}_bg.jpg`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    toast.error(uploadError.message);
    console.error(uploadError.message);
    throw new Error("can not upload category picture");
  }

  const { data: imagePublicPath } = supabase.storage
    .from("category_backgrounds")
    .getPublicUrl(`${imagePath.path}`);

  const { error } = await supabase
    .from("categories")
    .insert([{ categoryName, image: imagePublicPath.publicUrl }])
    .select();

  if (error) {
    console.error(error.message);
    toast.error("can not add categories");
    throw new Error("can not add categories");
  }
}
