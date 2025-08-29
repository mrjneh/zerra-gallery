import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageJump({ totalPages }: { totalPages: number }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const page = Math.min(totalPages, Math.max(1, Number(value)));
    if (page) navigate(`/products/${page}`);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        max={totalPages}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-16 border rounded px-2 py-1"
        placeholder="Page"
      />
      <button
        type="submit"
        className="px-3 py-1 border rounded hover:bg-gray-200"
      >
        Go
      </button>
    </form>
  );
}
