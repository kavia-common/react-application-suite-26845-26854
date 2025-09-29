import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, actions, className = '', children }) {
  /** A versatile card with title and action area */
  return (
    <section className={`card card-muted p-4 md:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {title && <h3 className="text-base md:text-lg font-semibold text-brand-text">{title}</h3>}
          {subtitle && <p className="text-xs md:text-sm text-brand-text/70 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
