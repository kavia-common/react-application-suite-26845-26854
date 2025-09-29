import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import ImportMedia from './pages/ImportMedia';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';

// Components
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the root of the application. It wires up the app layout with a responsive
   * sidebar for navigation, a header bar, and page routing using React Router v6.
   * Tailwind CSS classes drive the elegant "Royal Purple" theme styling.
   */
  return (
    <Router>
      <div className="container-app">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <HeaderBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/import" replace />} />
              <Route path="/import" element={<ImportMedia />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/import" replace />} />
            </Routes>
          </main>
          <footer className="px-6 py-4 text-xs text-gray-500 border-t border-purple-200 bg-white/60">
            © {new Date().getFullYear()} Kavia — Elegant UI with Royal Purple theme
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
