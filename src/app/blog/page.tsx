"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaCalendar, FaUserLarge } from "react-icons/fa6";
import { GiWoodenChair } from "react-icons/gi";

// Dynamically load Field to avoid hydration mismatch
const Field = dynamic(() => import("../components/Field"), { ssr: false });

interface Post {
  image: string;
  title: string;
  category: string;
  date: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    // Simulate fetching posts from an API
    const fetchedPosts: Post[] = [
      { image: "/p4.jpeg", title: "Going all-in", category: "Crafts", date: "01 Jan 2023" },
      { image: "/p3.jpeg", title: "Exploring new ways", category: "Design", date: "15 Mar 2023" },
      { image: "/p1.jpeg", title: "Sustainable Living", category: "Lifestyle", date: "10 Oct 2022" },
      { image: "/p2.jpeg", title: "Building a Modern Home", category: "Architecture", date: "25 Dec 2022" },
    ];
    setPosts(fetchedPosts);
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-2xl mx-auto pb-8 px-4">
      <div className="relative text-black">
        <Image
          src="/shop.jpeg"
          alt="Shop Banner"
          height={400}
          width={600}
          className="w-full h-[200px] md:h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-5xl font-semibold">Blog</h1>
          <div className="mt-4 text-gray-700 text-xs md:text-xl flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{'>'}</span>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="mt-8 w-full lg:w-3/4 gap-6">
          {currentPosts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-lg transition-shadow">
              <Image
                src={post.image}
                height={300}
                width={500}
                alt={`Image for ${post.title}`}
                className="rounded-t-lg"
              />
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaUserLarge />
                  <p>Admin</p>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendar />
                  <p>{post.date}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <GiWoodenChair />
                  <p>{post.category}</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
              <Link href={`/blog/post-id-${index + 1}`} className="mt-4 block text-primary underline underline-offset-4">
                Read More
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 w-full lg:w-1/4 p-6 gap-6">
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-8 text-gray-500">
              {/* Category List */}
              <li>
                <Link href="/blog/category/crafts" className="hover:underline">
                  Crafts
                </Link>
              </li>
              <li>
                <Link href="/blog/category/design" className="hover:underline">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/blog/category/lifestyle" className="hover:underline">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/blog/category/architecture" className="hover:underline">
                  Architecture
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center justify-center text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Field Component */}
      <div className="justify-center mx-auto text-center mt-10">
        <Field />
      </div>
    </div>
  );
};

export default Blog;
