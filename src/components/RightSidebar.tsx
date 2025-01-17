// src/components/RightSidebar.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const RightSidebar: React.FC = () => {
  return (
    <div className="hidden xl:block w-80 p-4 bg-black fixed right-0 h-screen">
      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle search logic here
        }}
        className="mb-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search Desire"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-400">
            <FaSearch size={20} />
          </button>
        </div>
      </form>

      {/* Trends for You */}
      <div className="mb-6 bg-gray-700 rounded-lg shadow">
        <h2 className="p-4 text-xl font-bold text-white">Trends Desire for you</h2>
        <div className="space-y-2">
          <div className="p-4 hover:bg-gray-600 transition-colors duration-200">
            <p className="text-sm text-gray-400">Trending in Turkey</p>
            <p className="font-bold text-white">#LOL</p>
            <p className="text-sm text-gray-400">2,066 Desire</p>
          </div>
          <div className="p-4 hover:bg-gray-600 transition-colors duration-200">
            <p className="text-sm text-gray-400">Trending in Turkey</p>
            <p className="font-bold text-white">#ASAP</p>
            <p className="text-sm text-gray-400">1,234 Desire</p>
          </div>
        </div>
      </div>

      {/* Terms and Privacy Policy */}
      <div className="text-sm text-gray-400">
        <a href="/terms" className="hover:underline">Terms of Service</a>
        <span className="mx-2">·</span>
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
      </div>
    </div>
  );
};

export default RightSidebar;