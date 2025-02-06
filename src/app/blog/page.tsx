"use client";
import React, { useState } from "react";
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

interface BlogProps {
  posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  interface HandlePageChange {
    (page: number): void;
  }

  const handlePageChange: HandlePageChange = (page) => {
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
            </ul>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {/* Pagination Logic */}
      </div>

      {/* Field Component */}
      <div className="justify-center mx-auto text-center">
        <Field />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const posts = [
    { image: "/p4.jpeg", title: "Going all-in", category: "Crafts", date: "01 Jan 2023" },
    { image: "/p3.jpeg", title: "Exploring new ways", category: "Design", date: "15 Mar 2023" },
  ];
  return { props: { posts } };
}

export default Blog;
