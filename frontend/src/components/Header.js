import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">My Blog</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-gray-900">Home</a></li>
            <li><a href="/" className="text-gray-600 hover:text-gray-900">Posts</a></li>
            <li><a href="/" className="text-gray-600 hover:text-gray-900">Profile</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;