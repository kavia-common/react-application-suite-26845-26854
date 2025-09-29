import React, { useCallback, useRef, useState } from 'react';

// Helper to check file type
const isImage = (file) => file && file.type.startsWith('image/');
const isVideo = (file) => file && file.type.startsWith('video/');

// PUBLIC_INTERFACE
export default function UploadDropzone({ onFiles }) {
  /** Drag-and-drop area and file selector that emits selected files and shows previews */
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  const handleFiles = useCallback((files) => {
    const selected = Array.from(files);
    setPreviews(selected.map((file) => ({ file, url: URL.createObjectURL(file) })));
    onFiles?.(selected);
  }, [onFiles]);

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const onBrowse = () => inputRef.current?.click();

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className="border-2 border-dashed border-brand-primary/30 rounded-2xl p-6 text-center bg-white/70 dark:bg-slate-900/40"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="space-y-3">
        <div className="text-4xl">⬆️</div>
        <div className="text-sm text-brand-text/70">
          Drag and drop images/videos here, or
          <button onClick={onBrowse} className="ml-1 text-brand-primary underline">browse</button>
        </div>
        <div className="text-xs text-brand-text/60">Supported: JPG, PNG, MP4, MOV</div>
      </div>

      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map(({ url, file }, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden border border-black/5 bg-white/80">
              {isImage(file) ? (
                <img src={url} alt={file.name} className="h-32 w-full object-cover" />
              ) : isVideo(file) ? (
                <video src={url} className="h-32 w-full object-cover" controls />
              ) : null}
              <div className="p-2 text-xs truncate">{file.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
