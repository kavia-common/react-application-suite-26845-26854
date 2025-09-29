import React, { useEffect, useState } from 'react';
import Sidebar from '../shared/Sidebar.jsx';
import Topbar from '../shared/Topbar.jsx';

export default function Layout({ children }) {
  const [dark, setDark] = useState(false);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDark(saved === 'dark');
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div className="min-h-screen theme-transition flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar dark={dark} onToggleTheme={() => setDark((d) => !d)} />
        <main className="p-4 md:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
