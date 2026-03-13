import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import search from "../../assets/Icons/navbar/Search.png";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    const params = new URLSearchParams(searchParams);

    params.set("q", query.trim());

    navigate(`/products?${params.toString()}`);

    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex-1 mx-4 md:mx-6 max-w-[704px]"
    >
      <input
        type="search"
        aria-label="Search products"
        placeholder="Search for products..."
        className="w-full max-w-[704px] h-[50px] bg-[#F6F6F6]
        border border-[#E6E6E6] rounded-md pl-4 pr-10
        focus:outline-none placeholder:text-zinc-600"
        onChange={(e) => setQuery(e.currentTarget.value)}
        value={query}
      />

      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <img src={search} alt="search" className="w-6" />
      </button>
    </form>
  );
}

export default SearchBar;
