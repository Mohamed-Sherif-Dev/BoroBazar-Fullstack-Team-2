import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockCategories } from "../../mock/mockCategories";
import type { Category } from "../../types/category";
import downIcon from "../../assets/Icons/navbar/downIcon.png";

function CategoryDropdown() {
  const [more, setMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const categories = mockCategories;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width >= 1280) {
        setVisibleCount(9);
      } else if (width >= 768) {
        setVisibleCount(6);
      } else {
        setVisibleCount(1);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function search(category: Category) {
    const params = new URLSearchParams(searchParams);

    params.set("category", category.id);

    navigate(`/products?${params.toString()}`);
  }

  return (
    <section>
      <ul className="mt-5 flex justify-evenly">
        {categories.slice(0, visibleCount).map((category) => (
          <li key={category.id}>
            <button
              className={`cursor-pointer duration-300 hover:text-zinc-800 ${
                selectedCategory === category.id
                  ? "font-semibold text-green-700"
                  : "text-zinc-700"
              }`}
              onClick={() => {
                setMore(false);
                search(category);
              }}
            >
              {category.name}
            </button>
          </li>
        ))}

        <li className="relative">
          <button
            type="button"
            className="flex cursor-pointer items-end gap-1"
            onClick={() => setMore((v) => !v)}
          >
            <span className="text-zinc-700 hover:text-zinc-800 duration-300">
              More
            </span>
            <img
              src={downIcon}
              alt="Drop Down"
              className={`h-4 w-4 duration-100 ${more ? "rotate-180" : ""}`}
            />
          </button>

          {more && (
            <ul
              className="absolute left-1/2 mt-2
            flex min-w-[120px] -translate-x-1/2 flex-col rounded-lg bg-white p-3 shadow-lg"
            >
              {categories.slice(visibleCount).map((category, index, arr) => (
                <li key={category.id}>
                  <button
                    className={`w-full cursor-pointer duration-300 hover:text-zinc-800 
                        text-center ${
                          selectedCategory === category.id
                            ? "font-semibold text-green-700"
                            : "text-zinc-700"
                        }`}
                    onClick={() => {
                      setMore(false);
                      search(category);
                    }}
                  >
                    {category.name}
                  </button>

                  {index !== arr.length - 1 && <hr className="my-3" />}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </section>
  );
}

export default CategoryDropdown;
