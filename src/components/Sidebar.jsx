import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Ourallproduct from "../components/Ourallproduct";

const BebidasPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  // সব ক্যাটেগরি লোড
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://shop.sprwforge.com/api/v1/products?all_categories=true&sidebar_data=true"
        );
        const data = await res.json();
        const cats = data?.data?.all_categories ?? [];
        setCategories(cats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // products লোড
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://shop.sprwforge.com/api/v1/all?category=${selectedCategory}&page=${currentPage}`
          : `https://shop.sprwforge.com/api/v1/products?page=${currentPage}`;

        const res = await fetch(url);
        const data = await res.json();
        const items = data?.data?.result?.data ?? [];
        setProducts(items);

        // স্ক্রল টপ করো
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  useEffect(() => {
  if (products.length > 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, [products]);

  return (
    <div className="flex">
      <Sidebar
        categories={categories}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setCurrentPage(1);
        }}
      />

      <div className="flex-1 p-6">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
            <h2 className="text-2xl font-semibold mb-2">No products found</h2>
            <p>Try selecting another category.</p>
          </div>
        ) : (
          <Ourallproduct products={products} />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-2">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BebidasPage;
