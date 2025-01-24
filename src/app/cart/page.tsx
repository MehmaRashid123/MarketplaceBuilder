"use client";
import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items || []);
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure you want to remove this item?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Your item has been removed.", "success");
      }
    });
  };

  const handleRemoveAll = () => {
    Swal.fire({
      title: "Are you sure you want to remove all items?",
      text: "You will not be able to recover any of them!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove all!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Loop through all cart items and remove them
        cartItems.forEach((item) => removeFromCart(item.id));
        setCartItems(getCartItems());
        Swal.fire("Removed!", "All items have been removed from your cart.", "success");
      }
    });
  };

  const handleQuantity = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) handleQuantity(id, product.stockLevel + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item.id === id);
    if (product && product.stockLevel > 1) handleQuantity(id, product.stockLevel - 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Please enter your billing details to proceed.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              <div
                key={`${item._id}-${index}`}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                    width={500}
                    height={500}
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {item.stockLevel}
                  </span>
                  <button
                    className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-8 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Total: ${calculateTotal().toFixed(2)}
              </h2>
              <Link href="/checkout">
                <button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 transition"
                  onClick={handleProceed}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>

            {/* Remove All Button */}
            <div className="mt-4 text-center">
              <button
                className="text-red-500 hover:text-red-600"
                onClick={handleRemoveAll}
              >
                Remove All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
