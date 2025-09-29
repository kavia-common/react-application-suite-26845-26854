import React from 'react';

/**
 * HeaderBar renders a simple top header for actions or breadcrumbs.
 * It uses a soft gradient matching the Royal Purple theme.
 */
const HeaderBar = () => {
  return (
    <header className="px-6 py-4 bg-gradient-to-r from-purple-100 to-purple-300 border-b border-purple-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-800">Welcome</h2>
          <p className="text-xs text-gray-600">Navigate using the sidebar to explore features.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden md:inline-flex px-3 py-1.5 rounded-md bg-white/70 text-gray-700 border border-purple-200 hover:bg-white transition">
            Help
          </button>
          <button className="px-3 py-1.5 rounded-md bg-primary text-white hover:opacity-90 transition">
            Action
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
