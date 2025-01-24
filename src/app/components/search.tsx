import { GetServerSideProps } from 'next';
import React from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}

interface ProductSearchPageProps {
  products: Product[];
}

const ProductSearchPage: React.FC<ProductSearchPageProps> = ({ products }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto mt-8">
        <form
          method="GET"
          action="/products/search"
          className="relative w-full"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="w-full py-3 px-6 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="16" y1="16" x2="22" y2="22"></line>
            </svg>
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={product.imagePath}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg font-bold">${product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  const searchQuery = query ? query.toString().toLowerCase() : '';

  // Sample products data, replace this with your actual product fetch from database or API
  const products = [
    { id: '1', name: 'Sofa', description: 'Comfortable and stylish sofa', price: 500, imagePath: '/images/sofa.jpg' },
    { id: '2', name: 'Table', description: 'Wooden dining table', price: 150, imagePath: '/images/table.jpg' },
    // Add more products here...
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery)
  );

  return {
    props: {
      products: filteredProducts,
    },
  };
};

export default ProductSearchPage;
