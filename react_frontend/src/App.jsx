import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Upload from './pages/Upload.jsx';
import Analysis from './pages/Analysis.jsx';
import NotFound from './pages/NotFound.jsx';

// PUBLIC_INTERFACE
export default function App() {
  /** Main app routes wrapped in the base Layout */
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
