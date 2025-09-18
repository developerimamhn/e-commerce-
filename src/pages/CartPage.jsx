import React from "react";
import { useNavigate } from "react-router-dom";


const CartPage = ({ cart, increment, decrement }) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.selling * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.title}</td>
                <td className="p-2">€{item.selling}</td>
                <td className="p-2">
                  <button onClick={() => decrement(item.id)} className="px-2">-</button>
                  {item.quantity}
                  <button onClick={() => increment(item.id)} className="px-2">+</button>
                </td>
                <td className="p-2">€{item.selling * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 font-bold text-lg">Total: €{totalPrice}</div>
      {cart.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
