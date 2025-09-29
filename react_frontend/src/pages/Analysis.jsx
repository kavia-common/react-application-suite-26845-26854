import React from 'react';

/**
 * Analysis page shell.
 * Future: implement detection overlays and metadata panel.
 */
// PUBLIC_INTERFACE
const Analysis = () => {
  return (
    <section className="page-wrapper">
      <h3 className="page-title">Analysis</h3>
      <p className="page-subtitle">Review YOLO-based detections with overlays and details.</p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-xl border border-purple-200 bg-white/70 p-6 h-80 flex items-center justify-center">
          <div className="h-full w-full rounded-lg bg-purple-50/50 border border-purple-100 flex items-center justify-center text-secondary">
            Visual canvas placeholder
          </div>
        </div>
        <aside className="rounded-xl border border-purple-200 bg-white/70 p-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Detections</h4>
          <ul className="space-y-2 text-xs text-secondary">
            <li>• Placeholder entry</li>
            <li>• Placeholder entry</li>
            <li>• Placeholder entry</li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Analysis;
