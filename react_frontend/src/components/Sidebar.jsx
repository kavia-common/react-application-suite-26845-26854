import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation for the app with links to Import Media, Analysis, and Dashboard.
 * Responsive behavior:
 * - On mobile, collapses into a top header toggle.
 * - On larger screens, persists as a left sidebar.
 */
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const baseLink =
    "nav-link";
  const activeLink =
    "nav-link nav-link-active";

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden w-full bg-white/90 border-b border-purple-200 backdrop-blur px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Menu</span>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-medium"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Open'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar w-full md:w-64 md:min-h-screen p-4 md:p-6 ${open ? 'block' : 'hidden'} md:block`}>
        <div className="mb-6">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-md" />
          <h1 className="mt-3 text-lg font-semibold text-gray-800">Media Analyzer</h1>
          <p className="text-xs text-gray-500">Elegant • Royal Purple</p>
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink to="/import" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
            <span role="img" aria-label="upload">📥</span>
            Import Media
          </NavLink>
          <NavLink to="/analysis" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
            <span role="img" aria-label="analysis">🔍</span>
            Analysis
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : baseLink)}>
            <span role="img" aria-label="dashboard">📊</span>
            Dashboard
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
