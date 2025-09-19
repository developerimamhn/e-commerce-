import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Hamburger icon

const Sidebar = ({ categories = [], onSelectCategory, onPriceFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false); // For small screens

  const handlePriceGo = () => {
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    onPriceFilter(min, max);
    setIsOpen(false); // collapse sidebar on small screens after filtering
  };

  return (
    <div className="container mx-auto top-[200px] sticky overflow-y-scroll">
      {/* Hamburger button for small screens */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 left-0 h-full bg-white border-r p-4 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <h2 className="font-bold mb-4 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[20px] 2xl:text-[24px]">Categories</h2>

        <button
          onClick={() => { onSelectCategory(null); setIsOpen(false); }}
          className="block mb-2 text-left w-full hover:Link-manu-bar hover:bg-gray-900  hover:py-[15px] hover:px-[30px] hover:text-white duration-200 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[20px]"
        >
          All Products
        </button>

        {categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat.id ?? cat.slug}
              onClick={() => { onSelectCategory(cat.slug ?? ""); setIsOpen(false); }}
              className="block mb-3 text-left hover:Link-manu-bar w-full hover:bg-gray-900  hover:py-[15px] hover:px-[30px] hover:text-white duration-200 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
            >
              {cat.title ?? "Untitled"}
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}

        {/* Price Filter */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border px-2 py-1 rounded w-20"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border px-2 py-1 rounded w-20"
            />
            <button
              onClick={handlePriceGo}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
