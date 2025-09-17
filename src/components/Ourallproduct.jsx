import React from "react";

const Ourallproduct = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">
      <img src="https://i.pinimg.com/originals/66/17/f4/6617f447369d9c9491b67bb82766110e.gif" alt="loading..."/>
    </p>;
  }

  return (
    <ul className="grid grid-cols-5 gap-6">
      {products.map((product) => (
        <li
          key={product.id}  
          className="border p-3 rounded shadow-sm product-item hover:shadow-lg transition"
        >
          <img
            src={`https://shop.sprwforge.com/uploads/${product.image}`}
            alt={product.title}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h2 className="font-semibold text-sm mb-1">{product.title}</h2>
          <p className="text-blue-600 font-bold">€{product.selling}</p>
        </li>
      ))}
    </ul>
  );
};

export default Ourallproduct;
