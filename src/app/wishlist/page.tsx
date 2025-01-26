"use client";
import React, { useState, useEffect } from "react";
import { getCartItems, addToCart } from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
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



const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist items from localStorage when the component mounts
  useEffect(() => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(savedWishlist);
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
    }
  }, []);

  const updateWishlistInLocalStorage = (updatedWishlist: Product[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleRemoveFromWishlist = (id: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    updateWishlistInLocalStorage(updatedWishlist);
  };

  const handleAddToCart = (product: Product) => {
    const existingCartItems = getCartItems();
    const productInCart = existingCartItems.find((item) => item.id === product.id);

    if (productInCart) {
      productInCart.stockLevel += product.quantity ?? 1;
      localStorage.setItem("cart", JSON.stringify(existingCartItems));
      Swal.fire({
        icon: "success",
        title: `${product.name} quantity increased in cart`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      addToCart(product, product.quantity);
      Swal.fire({
        icon: "success",
        title: `${product.name} added to cart`,
        timer: 1500,
        showConfirmButton: false,
      });
    }

    handleRemoveFromWishlist(product.id);
  };

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Your wishlist is empty!",
        text: "Add some products to your wishlist first.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Add all items to the cart?",
      text: "This will move all items from your wishlist to the cart.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add all!",
    }).then((result) => {
      if (result.isConfirmed) {
        wishlist.forEach((product) => handleAddToCart(product));
        setWishlist([]);
        localStorage.removeItem("wishlist");
        Swal.fire({
          icon: "success",
          title: "All items added to cart!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    const updatedWishlist = wishlist.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    updateWishlistInLocalStorage(updatedWishlist);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <>
            <button
              onClick={handleAddAllToCart}
              className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Add All to Cart
            </button>
            <div className="space-y-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md"
                        onClick={() => handleQuantityChange(product.id, (product.quantity ?? 1) - 1)}
                        disabled={(product.quantity ?? 1) <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center bg-gray-50 border-2 border-gray-300 rounded-md"
                        value={product.quantity ?? 1}
                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                        min={1}
                      />
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md"
                        onClick={() => handleQuantityChange(product.id, (product.quantity ?? 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
