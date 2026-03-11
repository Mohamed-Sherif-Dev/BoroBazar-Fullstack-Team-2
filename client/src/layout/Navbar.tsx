import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import CategoryDropdown from "../components/search/CategoryDropdown";
import logo from "../assets/images/Logo.png";
import heart from "../assets/Icons/navbar/Heart.png";
import cart from "../assets/Icons/navbar/Cart.png";

function Navbar() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <nav className="bg-white">
        <div className="border-b border-[#F2F2F2]">
          <div className="max-w-[1471px] min-h-[101px] mx-auto flex items-center justify-between px-8 py-4 border-b border-[#F2F2F2]">
            <Link to="/">
              <img
                className="w-[180px] md:w-[241px] md:h-[71px]"
                src={logo}
                alt="Logo"
              />
            </Link>

            <SearchBar />

            <div className="hidden md:flex items-center gap-5">
              <div className="flex gap-2 text-[15px]">
                <Link
                  to="#"
                  className="hover:text-green-900 transition duration-300"
                >
                  Login
                </Link>
                <span>|</span>
                <Link
                  to="#"
                  className="hover:text-green-900 transition duration-300"
                >
                  Register
                </Link>
              </div>

              <div className="flex items-center gap-5">
                <Link
                  to="#"
                  className="cursor-pointer hover:scale-105 transition duration-300"
                >
                  <img
                    src={heart}
                    alt="Wishlist"
                    className="w-[30px] h-[28px] object-contain"
                  />
                </Link>
                <Link
                  to="#"
                  className="cursor-pointer hover:scale-105 transition duration-300"
                >
                  <img
                    src={cart}
                    alt="Shopping cart"
                    className="w-[30px] h-[28px] object-contain"
                  />
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDropDown((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={dropDown}
              className="md:hidden relative flex h-5 w-8 flex-col justify-between"
            >
              <span className="h-[2px] w-full bg-black transition-all duration-300" />
              <span className="h-[2px] w-full bg-black transition-all duration-300" />
              <span className="h-[2px] w-full bg-black transition-all duration-300" />
            </button>
          </div>
        </div>

        {dropDown && (
          <div className="md:hidden border-t border-[#F2F2F2] bg-white">
            <div className="flex flex-col items-center gap-6 px-8 py-6">
              <SearchBar />

              <div className="flex flex-col items-center gap-3 text-[15px]">
                <Link
                  to="#"
                  className="text-left hover:text-green-900 transition"
                >
                  Login
                </Link>
                <Link
                  to="#"
                  className="text-left hover:text-green-900 transition"
                >
                  Register
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  to="#"
                  className="flex items-center gap-2 hover:scale-105 transition"
                >
                  <img
                    src={heart}
                    alt="Wishlist"
                    className="w-[30px] h-[28px] object-contain"
                  />
                  Wishlist
                </Link>

                <Link
                  to="#"
                  className="flex items-center gap-2 hover:scale-105 transition"
                >
                  <img
                    src={cart}
                    alt="Shopping cart"
                    className="w-[30px] h-[28px] object-contain"
                  />
                  Cart
                </Link>
              </div>
            </div>
          </div>
        )}

        <CategoryDropdown />
      </nav>
    </>
  );
}

export default Navbar;
