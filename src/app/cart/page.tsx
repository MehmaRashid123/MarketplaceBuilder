"use client";
import React, { useState, useEffect } from "react";
import { getCartItems, removeFromCart, updateCartQuantity, clearCart } from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export interface Product {
  category: string;
  id: string;
  price: number;
  description: string;
  imagePath: string;
  discountPercentage: number;
  isFeaturedProduct: number;
  name: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  _id: string;
  sizes: string[];
  stockLevel: number;
  quantity?: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Include getCartItems as a dependency for useEffect
  useEffect(() => {
    setCartItems(getCartItems());
  }, [getCartItems]);  // <- Fix dependency warning

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
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove all!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        setCartItems(getCartItems());
        Swal.fire("Cleared!", "All items have been removed.", "success");
      }
    });
  };

  const handleQuantity = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      handleQuantity(id, product.stockLevel + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item.id === id);
    if (product && product.stockLevel > 1) {
      handleQuantity(id, product.stockLevel - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 sm:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">
              Your cart is empty. Add some products to get started!
            </p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 shadow-md rounded-lg p-4 hover:shadow-lg transition">
                  <div className="flex items-center space-x-6">
                    <Image
                      src={item.image ? urlFor(item.image).url() : "/placeholder.png"}
                      alt="A description of the image"
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      width={500}
                      height={500}
                    />

                    <div>
                      <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
                      <p className="text-sm text-gray-500">Price: ${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                      className="w-12 h-12 flex items-center justify-center bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 hover:text-gray-900 transition-all duration-200 ease-in-out transform active:scale-95"
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.stockLevel <= 1}
                    >
                      <span className="text-2xl">−</span>
                    </button>
                    <span className="text-xl font-semibold text-gray-800 px-4">{item.stockLevel}</span>
                    <button
                      className="w-12 h-12 flex items-center justify-center bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-200 ease-in-out transform active:scale-95"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <span className="text-2xl">+</span>
                    </button>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 mt-4 md:mt-0"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-8 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">Total: ${calculateTotal().toFixed(2)}</p>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600"
                onClick={handleRemoveAll}
              >
                Remove All
              </button>
              <Link href="/checkout">
                <button className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-xl hover:bg-yellow-600">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
