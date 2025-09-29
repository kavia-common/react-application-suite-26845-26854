import React from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

const navLinkClass = ({ isActive }) =>
  clsx(
    'flex items-center gap-3 px-4 py-2 rounded-xl transition-colors',
    isActive
      ? 'bg-purple-100 text-brand-text'
      : 'hover:bg-white/60 text-brand-text/80'
  );

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col p-4 gap-4 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border-r border-black/5">
      <div className="flex items-center gap-2 px-2 py-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-primary font-bold">VA</span>
        <div>
          <div className="text-lg font-semibold">VizAI</div>
          <div className="text-xs text-brand-text/60">Wildlife Visual AI</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
        <NavLink to="/upload" className={navLinkClass}>Upload & Import</NavLink>
        <NavLink to="/analysis" className={navLinkClass}>YOLO Analysis</NavLink>
      </nav>

      <div className="mt-auto text-xs text-brand-text/60 px-2 py-2">
        © {new Date().getFullYear()} VizAI
      </div>
    </aside>
  );
}
