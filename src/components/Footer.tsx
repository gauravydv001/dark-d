// dd/src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center border-t border-gray-700">
      <p>&copy; 2023 MyApp. All rights reserved.</p>
      <div className="mt-2">
        <a href="/about" className="mx-2 hover:text-gray-400">About</a>
        <a href="/privacy" className="mx-2 hover:text-gray-400">Privacy Policy</a>
        <a href="/terms" className="mx-2 hover:text-gray-400">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;