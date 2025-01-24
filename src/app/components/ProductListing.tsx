"use client";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";

const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
  e.preventDefault();
  Swal.fire({
    position: "bottom-right",
    icon: "success",
    title: `${product.name} added to cart`,
    showConfirmButton: false,
    timer: 1000,
  });
  addToCart(product);
};

const ProductListing = ({ product }: { product: Product }) => {
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
          <div className="mt-8">
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
