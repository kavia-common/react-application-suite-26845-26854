import React from 'react';
import Upload from '../components/Upload';

/**
 * ImportMedia page with integrated Upload component.
 * Allows users to import images/videos, see progress, and preview before analysis.
 */
// PUBLIC_INTERFACE
const ImportMedia = () => {
  const handleComplete = (uploaded) => {
    // This is where we can route to analysis or store in state manager later.
    // For now, we log successful uploads for demonstration.
    // uploaded: [{ id, fileName, type, previewUrl, serverPath }]
    // eslint-disable-next-line no-console
    console.log('Uploads complete:', uploaded);
  };

  return (
    <section className="page-wrapper">
      <h3 className="page-title">Import Media</h3>
      <p className="page-subtitle">Upload images or videos to prepare them for analysis.</p>

      <div className="rounded-xl border border-purple-200 bg-white/70 p-6">
        <Upload
          acceptImages
          acceptVideos
          multiple
          onComplete={handleComplete}
          className="w-full"
          aria-label="Upload images and videos"
        />

        <div className="mt-6 flex items-center justify-end">
          <button
            className="px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            disabled
            aria-disabled="true"
            title="Will be enabled after selecting media and moving to Analysis"
          >
            Continue to Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImportMedia;
