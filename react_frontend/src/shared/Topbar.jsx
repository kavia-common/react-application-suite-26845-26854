import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Topbar({ dark, onToggleTheme }) {
  /** Top bar with page title, search, theme toggle, and profile stub */
  const { pathname } = useLocation();
  const title = {
    '/dashboard': 'Dashboard',
    '/upload': 'Upload & Import',
    '/analysis': 'YOLO Analysis'
  }[pathname] ?? 'VizAI';

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/50 dark:bg-slate-900/40 border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/70 border border-black/5">☰</button>
            <Link to="/" className="text-lg font-semibold">{title}</Link>
          </div>

          <div className="flex-1 hidden md:flex justify-center">
            <input
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-black/5 outline-none focus:ring-4 focus:ring-[var(--ring)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              aria-label="Analysis Type"
              className="px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-black/5 text-sm"
              defaultValue="yolo"
            >
              <option value="yolo">YOLOv5</option>
              <option value="yolov8">YOLOv8</option>
              <option value="rcnn">Faster R-CNN</option>
            </select>

            <button
              onClick={onToggleTheme}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-900/40 border border-black/5"
              title="Toggle theme"
            >
              <span className="text-sm">{dark ? 'Dark' : 'Light'}</span>
              <span>{dark ? '🌙' : '☀️'}</span>
            </button>

            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-300 to-blue-300 border border-black/10" title="Profile"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
