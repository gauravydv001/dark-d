// dd/src/components/Layout.tsx
import React from 'react';
import { FaHome, FaSearch, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen text-black bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>
      </div>

      {/* Fixed Bottom Navigation Bar (Visible only for screens ≤ 1100px) */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <nav className="flex justify-around p-2">
          <button
            onClick={() => router.push('/')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaHome size={24} />
          </button>
          <button
            onClick={() => router.push('/search')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaSearch size={24} />
          </button>
          <button
            onClick={() => router.push('/messages')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaEnvelope size={24} />
          </button>
          <button
            onClick={() => router.push('/notifications')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaBell size={24} />
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaUser size={24} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;