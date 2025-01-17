// dd/src/components/Header.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaPlus, FaSearch } from 'react-icons/fa';

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="bg-gray-800 text-white">
      {/* Top Section (Logo, Search Bar, Login/Signup, Post Button) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          MyApp
        </h1>

        {/* Search Bar (Visible only for screens > 1100px) */}
        <form onSubmit={handleSearch} className="hidden xl:flex items-center space-x-4 flex-grow max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="text-gray-400 hover:text-white transition-colors duration-200">
            <FaSearch size={20} />
          </button>
        </form>

        {/* Login/Signup or Post Button */}
        {session ? (
          <button
            onClick={() => router.push('/create-post')}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <FaPlus />
            <span>Post</span>
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;