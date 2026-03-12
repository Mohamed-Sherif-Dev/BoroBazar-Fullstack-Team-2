import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
// import CartPage from "../features/cart/pages/CartPage";

const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/products" element={<div>Products Page</div>} />

      </Routes>
  );
};

export default AppRouter;