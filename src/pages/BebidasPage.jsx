import { useEffect, useState } from "react";
import Ourallproduct from "../components/Ourallproduct";
import Sidebar from "../components/Sidebar";

const BebidasPage = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // মূল products copy
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortBy, setSortBy] = useState("default"); // sorting state
  const perPage = 30;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://shop.sprwforge.com/api/v1/products?all_categories=true&sidebar_data=true"
        );
        const data = await res.json();
        setCategories(data?.data?.all_categories ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
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
        setAllProducts(items);
        setTotalResults(data?.data?.result?.total ?? 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  // Sorting
  useEffect(() => {
    let sorted = [...allProducts];
    if (sortBy === "low") {
      sorted.sort((a, b) => a.selling - b.selling);
    } else if (sortBy === "high") {
      sorted.sort((a, b) => b.selling - a.selling);
    } else if (sortBy === "medium") {
      // medium price filter = মধ্যের 50% প্রাইস
      const prices = sorted.map((p) => p.selling);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const midMin = min + (max - min) * 0.25;
      const midMax = min + (max - min) * 0.75;
      sorted = sorted.filter((p) => p.selling >= midMin && p.selling <= midMax);
    }
    setProducts(sorted);
  }, [sortBy, allProducts]);

  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex container mx-auto">
      <Sidebar
        categories={categories}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setCurrentPage(1);
        }}
      />
      <div className="flex-1 p-6">
        {/* Top bar with pagination info + sort dropdown */}
        <div className="flex justify-between items-center mb-4 text-gray-600">
          <div>
            {products.length > 0 ? (
              <p>
                Showing {(currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, totalResults)} of{" "}
                {totalResults} results
              </p>
            ) : (
              <p>No products found</p>
            )}
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-1 rounded"
            >
              <option value="default">Default</option>
              <option value="low">Low Price</option>
              <option value="high">High Price</option>
              <option value="medium">Medium Price</option>
            </select>
          </div>
        </div>

        <Ourallproduct products={filteredProducts} />

        {/* Pagination buttons */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {Math.ceil(totalResults / perPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, Math.ceil(totalResults / perPage))
              )
            }
            disabled={currentPage === Math.ceil(totalResults / perPage)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BebidasPage;
