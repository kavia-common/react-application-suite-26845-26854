import React from 'react';

// Types
/**
 * box: { x, y, w, h, label, score }
 * imgSrc: string
 */
// PUBLIC_INTERFACE
export default function YoloMock({ imgSrc, boxes = [] }) {
  /** Displays an image with bounding boxes overlay (mock demo). */
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-black/5 bg-white/80">
      <img src={imgSrc} alt="analysis" className="w-full object-contain" />
      <div className="absolute inset-0 pointer-events-none">
        {boxes.map((b, i) => (
          <div
            key={i}
            className="absolute border-2 rounded-md"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              borderColor: b.color || '#10B981',
              boxShadow: '0 0 0 2px rgba(16,185,129,0.2)'
            }}
          >
            <span
              className="absolute -top-6 left-0 text-xs px-2 py-0.5 rounded-md text-white"
              style={{ background: b.color || '#10B981' }}
            >
              {b.label} {Math.round((b.score ?? 0.85) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
