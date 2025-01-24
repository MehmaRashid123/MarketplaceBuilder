import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Learn more about our mission, values, and the team behind the brand.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-center">
          <div className="inline-block bg-yellow-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">Our Mission</h3>
          <p className="mt-2 text-gray-600">
            We aim to provide high-quality, affordable furniture that makes your home feel like a sanctuary.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block bg-yellow-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">Our Story</h3>
          <p className="mt-2 text-gray-600">
            From humble beginnings, we&apos;ve grown into a company that offers a wide range of carefully crafted products to suit every home.
          </p>
        </div>
        <div className="text-center">
          <div className="inline-block bg-yellow-500 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">Our Values</h3>
          <p className="mt-2 text-gray-600">
            We believe in craftsmanship, sustainability, and providing exceptional customer service to every person who shops with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
