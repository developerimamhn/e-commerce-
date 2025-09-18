import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import BebidasPage from "./pages/BebidasPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<BebidasPage searchTerm={searchTerm} />} />
        <Route path="/category/:slug" element={<BebidasPage searchTerm={searchTerm} />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
