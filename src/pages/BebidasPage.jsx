import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Ourallproduct from "../components/Ourallproduct";

const BebidasPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 14;

  // সব ক্যাটেগরি ফেচ করো
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

  // products ফেচ করো - selectedCategory বা currentPage change হলে
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
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  return (
    <div className="flex">
      <Sidebar
        categories={categories}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setCurrentPage(1); // নতুন ক্যাটেগরি ক্লিক করলে page reset
        }}
      />
      <div className="flex-1 p-6">
        {/* যদি category সিলেক্ট করা থাকে তাহলে back button দেখাও */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            ← Back to All Products
          </button>
        )}

        <Ourallproduct products={products} />

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BebidasPage;
