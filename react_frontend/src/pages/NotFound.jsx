import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto card card-muted p-8 text-center">
      <div className="text-7xl">🦌</div>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="text-brand-text/70 mt-2">The page you are looking for does not exist.</p>
      <Link className="inline-block mt-6 px-4 py-2 rounded-xl bg-brand-primary text-white" to="/dashboard">
        Back to Dashboard
      </Link>
    </div>
  );
}
