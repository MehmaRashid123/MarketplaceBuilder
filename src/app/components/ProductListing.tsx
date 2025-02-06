"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";
import { IoHeartCircle } from "react-icons/io5";


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



const ProductListing = ({ product }: { product: Product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if the product is in the wishlist

  // Check if product is already in wishlist
  const checkIfInWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.some((item: Product) => item.id === product.id);
  };

  // Handle adding/removing from wishlist
  const handleWishlistToggle = (product: Product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (!isInWishlist) {
      wishlist.push(product); // Add to wishlist
      Swal.fire("Added to Wishlist", "", "success");
    } else {
      wishlist = wishlist.filter((item: Product) => item.id !== product.id); // Remove from wishlist
      Swal.fire("Removed from Wishlist", "", "warning");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsInWishlist(!isInWishlist); // Toggle the state
  };

  // Initialize wishlist state on component mount
  React.useEffect(() => {
    setIsInWishlist(checkIfInWishlist());
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
        <Link href={`Product/${product.id}`}>
          <Image
            src={urlFor(product.image).url()}
            alt={product.name}
            height={300}
            width={300}
            className="h-[250px] w-full object-cover"
          />
        </Link>
        <div className="p-4 text-center">
          <p className="text-lg font-medium text-gray-800">{product.name}</p>
          <h3 className="text-xl font-semibold text-gray-900 mt-2">${product.price}</h3>
          <div className="flex justify-between items-center mt-8">
            {/* Wishlist Icon */}
            <button
              onClick={() => handleWishlistToggle(product)}
              className={`text-2xl ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
            >
              <IoHeartCircle className="w-6 h-6" />
            </button>
            {/* Add to Cart Button */}
            <button
              className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:from-yellow-600 hover:to-yellow-700 focus:ring-4 focus:ring-blue-300 focus:outline-none active:scale-95"
              onClick={(e) => handleAddToCart(e, product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
