"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import ProductListing from "../components/ProductListing";
import Link from "next/link";
import Image from "next/image";
import Field from "../components/Field";
import { Product } from "../../../type";

// Pagination component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        Previous
      </button>
      <span className="mx-4 text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8; // Adjust this to change the number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = `*[_type == "product"]{
        category,
        "id": _id,
        price,
        description,
        stockLevel,
        imagePath,
        discountPercentage,
        isFeaturedProduct,
        name,
        "image": image.asset._ref
      }`;
      const fetchedProducts: Product[] = await client.fetch(query);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      const uniqueCategories: string[] = [
        ...new Set(fetchedProducts.map((product: Product) => product.category)),
      ];
      setCategories(uniqueCategories);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Handle category filter
  const handleFilter = (category: string) => {
    setFilteredProducts(
      category ? products.filter((product) => product.category === category) : products
    );
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  // Handle price filter
  const handlePriceFilter = () => {
    setFilteredProducts(
      products.filter((product) => product.price >= minPrice && product.price <= maxPrice)
    );
    setCurrentPage(1); // Reset to page 1 when filtering
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      {/* Shop Banner */}
      <div className="relative text-black">
        <Image
          src="/shop.jpeg"
          alt="Shop Banner"
          height={400}
          width={1600}
          className="w-full h-40 sm:h-56 md:h-auto object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl sm:text-3xl md:text-5xl font-semibold">
          Shop
        </h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
          <p className="text-gray-700 text-xs sm:text-base flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{'>'}</span>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 sm:p-6 md:flex md:justify-between md:items-center bg-gray-100 rounded-md mb-6">
        <div className="flex flex-col sm:flex-row sm:gap-4 md:items-center">
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 border rounded-md w-full sm:w-72"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded-md w-full sm:w-72 mt-4 sm:mt-0"
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4 md:items-center mt-4 sm:mt-0">
          <div className="flex items-center gap-2">
            <label htmlFor="minPrice" className="text-sm sm:text-base">
              Min Price:
            </label>
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="p-2 border rounded-md w-24 sm:w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="maxPrice" className="text-sm sm:text-base">
              Max Price:
            </label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="p-2 border rounded-md w-24 sm:w-32"
            />
          </div>
          <button
            onClick={handlePriceFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 sm:mt-0"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product: Product) => (
          <ProductListing product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

     
      <Field />
    </div>
  );
};

export default Shop;
