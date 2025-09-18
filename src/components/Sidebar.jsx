import React from "react";

const Sidebar = ({ categories = [], onSelectCategory }) => {
  return (
    <div className="w-64 border-r p-4">
      <h2 className="font-bold mb-4">Categories</h2>

      <button
        onClick={() => onSelectCategory(null)}
        className="block mb-2 text-left w-full hover:underline"
      >
        All Products
      </button>

      {categories.length > 0 ? (
        categories.map(cat => (
          <button
            key={cat.id ?? cat.slug}
            onClick={() => onSelectCategory(cat.slug ?? "")}
            className="block mb-2 text-left w-full hover:underline"
          >
            {cat.title ?? "Untitled"}
          </button>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default Sidebar;
