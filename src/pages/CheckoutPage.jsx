import { useState } from "react";

const CheckoutPage = ({ cart, addresses }) => {
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length > 0 ? addresses[0] : ""
  );
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.selling * item.quantity,
    0
  );

  const handleAddAddress = () => {
    if (newAddress.trim() === "") return;
    setSelectedAddress(newAddress);
    addresses.push(newAddress);
    setNewAddress("");
    setShowForm(false);
  };
  const successful = () => {
    alert("Your cart is empty!");
    return;
  };

  return (
    <div className="p-6 mt-[200px] container mx-auto text-center border">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Shipping Address</h2>

      {addresses.length === 0 && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Address
        </button>
      )}

      {showForm && (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            placeholder="Enter your address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Address
          </button>
        </div>
      )}

      {addresses.length === 1 && !showForm && (
        <div className="mt-2">
          <p className="font-medium">{addresses[0]}</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Change Address
          </button>
        </div>
      )}

      {addresses.length > 1 && !showForm && (
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="border px-3 py-2 rounded mt-2"
        >
          {addresses.map((addr, idx) => (
            <option key={idx} value={addr}>
              {addr}
            </option>
          ))}
        </select>
      )}

      <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
      <ul className="space-y-1">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-center border py-3"
          >
            <img
              src={`https://shop.sprwforge.com/uploads/${item.image}`}
              alt={item.title}
              className="w-40 h-auto object-contain rounded"
            />
            {item.title} x {item.quantity} = €{item.selling * item.quantity}
          </li>
        ))}
      </ul>

      <div className="mt-4 font-bold text-lg">Total: €{totalPrice}</div>

      <button
        onClick={successful}
        className="mt-4  hover:bg-blue-700 hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
