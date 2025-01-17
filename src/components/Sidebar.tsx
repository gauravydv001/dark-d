// dd/src/components/Sidebar.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaUser } from 'react-icons/fa';
import Image from 'next/image'; // Import Next.js Image component

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    { icon: <FaHome size={30} />, label: 'Home', path: '/' },
    { icon: <FaCompass size={30} />, label: 'Explore', path: '/explore' },
    { icon: <FaBell size={30} />, label: 'Notifications', path: '/notifications' },
    { icon: <FaEnvelope size={30} />, label: 'Messages', path: '/messages' },
    { icon: <FaBookmark size={30} />, label: 'Bookmarks', path: '/bookmarks' },
    { icon: <FaUser size={30} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="hidden xl:block w-64 p-12 bg-black text-white fixed h-screen">
      {/* Image at the top of the sidebar */}
      <div className="mb-6">
        <Image
          src="/images/logo.png" // Replace with your image path
          alt="Logo"
          width={150}
          height={50}
          className="rounded-lg"
        />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => router.push(item.path)}
                className="flex text-2xl items-center  space-x-2 hover:text-gray-400 transition-colors duration-200 mt-6"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        {session && (
          <div className="mt-80">
            <button
              onClick={() => router.push('/profile')}
              className="flex text-xl items-center space-x-2 focus:outline-none"
            >
              <img
                src={session.user?.image || '/default-avatar.png'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{session.user?.name}</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;