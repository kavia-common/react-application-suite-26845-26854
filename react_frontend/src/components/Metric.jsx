import React from 'react';

// PUBLIC_INTERFACE
export default function Metric({ label, value, tone = 'default' }) {
  /** Compact metric display with optional tone coloring */
  const colors = {
    default: 'bg-white/70',
    success: 'bg-green-100 text-green-700',
    warn: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-700'
  }[tone] || 'bg-white/70';

  return (
    <div className={`rounded-xl px-3 py-2 text-sm border border-black/5 ${colors}`}>
      <div className="text-xs opacity-70">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
