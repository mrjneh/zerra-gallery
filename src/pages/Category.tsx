import useCategory from "../features/category/useCategory";
import CategoryBox from "../features/category/CategoryBox";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";
import AddCategoryForm from "../features/category/AddCategoryForm";

export default function Category() {
  const { isPending, categories } = useCategory();

  return isPending ? (
    <Spinner />
  ) : (
    <ul className="grid grid-cols-[1fr_1fr_1fr] gap-3">
      {categories &&
        categories.map((cat) => (
          <CategoryBox name={cat.categoryName} image={cat.image} key={cat.id} />
        ))}
      <Modal>
        <Modal.Open opens="category-form">
          <button className="cursor-pointer flex items-center text-4xl font-bold text-[#201815] border-2 bg-[#20181514] hover:bg-[#20181546]  border-dashed border-[#201815ab]  justify-center h-[15rem] w-[30rem] bg-cover bg-center rounded-xl">
            +
          </button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <AddCategoryForm />
        </Modal.Window>
      </Modal>
    </ul>
  );
}
