"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";
import { useEffect, useState } from "react";

export interface Product {
  category: string;
  id: string;
  price: number;
  description: string;
  stockLevel: number;
  imagePath: string;
  discountPercentage: number;
  isFeaturedProduct: number;
  name: string;
  image: any;
  _id: string;
  sizes:string[];
  quantity?: number;
  
}

import { useParams } from "next/navigation";

const ProductPage = () => {
  const params = useParams(); // Unwrap params here
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for selected quantity

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[ _type == "product" && _id == $id]{
        category,
        "id": _id,
        price,
        description,
        stockLevel,
        imagePath,
        discountPercentage,
        isFeaturedProduct,
        name,
        image,
        _id
      }[0]`;

      try {
        const fetchedProduct = await client.fetch(query, { id: params.id });
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-300">
        <h1 className="text-3xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 to-gray-300">
        <h1 className="text-3xl font-semibold text-gray-600">Product not found</h1>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    // Pass selected quantity along with the product to the cart
    addToCart({ ...product, quantity });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center items-center relative">
            {/* Featured Badge */}
            {product.isFeaturedProduct && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-white font-bold text-xs px-3 py-1 rounded-full z-10">
                Featured
              </div>
            )}
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {/* Original Price */}
              {product.discountPercentage > 0 && (
                <p className="text-2xl font-bold text-gray-900 line-through">
                  ${product.price}
                </p>
              )}
              {/* Discounted Price */}
              <p className="text-4xl font-bold text-red-600">
                ${discountedPrice.toFixed(2)}
              </p>
            </div>

            {/* Discount Percentage */}
            {product.discountPercentage > 0 && (
              <p className="text-xl font-semibold text-red-500">
                {product.discountPercentage}% off!
              </p>
            )}

            {/* Stock Level */}
            <p className="text-lg text-gray-600">
              {product.stockLevel > 0
                ? `In Stock: ${product.stockLevel}`
                : "Out of Stock"}
            </p>

            {/* Quantity Selector */}
            {product.stockLevel > 0 && (
              <div className="mt-6 flex items-center space-x-4">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
                  onClick={() => setQuantity(Math.min(product.stockLevel, quantity + 1))}
                >
                  +
                </button>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-lg rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:from-yellow-600 hover:to-yellow-700 focus:ring-4 focus:ring-blue-300 focus:outline-none active:scale-95"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
