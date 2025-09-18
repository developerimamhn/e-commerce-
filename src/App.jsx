import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import BebidasPage from "./pages/BebidasPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import AddressPage from "./pages/AddressPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [addresses, setAddresses] = useState([]);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cart={cart} />
      <Routes>
        <Route
          path="/"
          element={<BebidasPage searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/category/:slug"
          element={<BebidasPage searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} increment={increment} decrement={decrement} />}
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/address"
          element={<AddressPage addresses={addresses} setAddresses={setAddresses} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} addresses={addresses} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
