import React from 'react';

/**
 * ImportMedia page shell.
 * Future: implement file upload and preview grid.
 */
// PUBLIC_INTERFACE
const ImportMedia = () => {
  return (
    <section className="page-wrapper">
      <h3 className="page-title">Import Media</h3>
      <p className="page-subtitle">Upload images or videos to prepare them for analysis.</p>

      <div className="rounded-xl border border-purple-200 bg-white/70 p-6">
        <div className="h-40 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50/50 flex items-center justify-center text-sm text-secondary">
          Drag & drop files here or click to browse
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="h-28 rounded-lg bg-purple-50/50 border border-purple-100 flex items-center justify-center text-xs text-secondary">
            Preview placeholder
          </div>
          <div className="h-28 rounded-lg bg-purple-50/50 border border-purple-100 flex items-center justify-center text-xs text-secondary">
            Preview placeholder
          </div>
          <div className="h-28 rounded-lg bg-purple-50/50 border border-purple-100 flex items-center justify-center text-xs text-secondary">
            Preview placeholder
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportMedia;
