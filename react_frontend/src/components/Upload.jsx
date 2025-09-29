import React, { useCallback, useEffect, useRef, useState } from 'react';
import { mockUploadFile } from '../services/mockUploadApi';

/**
 * PUBLIC_INTERFACE
 * Upload
 * A reusable, accessible, and responsive upload component for images/videos.
 * Features:
 * - Drag & drop area + click-to-browse
 * - Multiple file selection
 * - Progress indication per file
 * - Image/video preview after upload completes
 * - Cancel in-progress upload and remove items
 * - Emits onComplete when all uploads finish
 */
const ACCEPTED_MIME = {
  image: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
};

// PUBLIC_INTERFACE
export default function Upload({
  acceptImages = true,
  acceptVideos = true,
  multiple = true,
  onComplete = () => {},
  className = '',
  'aria-label': ariaLabel = 'Upload media',
}) {
  /** Internal item state */
  const [items, setItems] = useState([]); // { id, file, status, progress, url, type, error, controller }
  const inputRef = useRef(null);
  const dropRef = useRef(null);

  // Determine accepted mime list
  const accepted = [
    ...(acceptImages ? ACCEPTED_MIME.image : []),
    ...(acceptVideos ? ACCEPTED_MIME.video : []),
  ];

  const isAcceptedType = (file) => {
    if (!accepted.length) return true;
    return accepted.includes(file.type);
  };

  // Handle file selection
  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      const validFiles = files.filter((f) => isAcceptedType(f));
      const newItems = validFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        file,
        status: 'queued', // queued | uploading | done | error | canceled
        progress: 0,
        url: null,
        type: file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : 'other',
        error: null,
        controller: null,
      }));
      if (!newItems.length) return;

      setItems((prev) => [...newItems, ...prev]);

      // Start uploads
      newItems.forEach((item) => startUpload(item));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [acceptImages, acceptVideos]
  );

  // Start upload using mock API
  const startUpload = (item) => {
    const abortController = new AbortController();
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'uploading', controller: abortController } : i))
    );

    mockUploadFile(item.file, {
      signal: abortController.signal,
      onProgress: (p) => {
        setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, progress: p } : i)));
      },
    })
      .then((result) => {
        // Create local preview URL
        const objectUrl = URL.createObjectURL(item.file);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, status: 'done', progress: 100, url: objectUrl, serverPath: result.path } : i
          )
        );
      })
      .catch((err) => {
        const isAbort = err?.name === 'AbortError';
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: isAbort ? 'canceled' : 'error', error: isAbort ? null : (err?.message || 'Upload failed') }
              : i
          )
        );
      });
  };

  // Cancel upload
  const cancelUpload = (id) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.controller) {
        try {
          target.controller.abort();
        } catch {
          // ignore
        }
      }
      return prev.map((i) => (i.id === id ? { ...i, status: 'canceled' } : i));
    });
  };

  // Remove item
  const removeItem = (id) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      if (target?.controller && target.status === 'uploading') {
        try {
          target.controller.abort();
        } catch {
          // ignore
        }
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // Accessible drag & drop
  useEffect(() => {
    const el = dropRef.current;
    if (!el) return;

    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e) => {
      preventDefaults(e);
      const dt = e.dataTransfer;
      if (dt?.files?.length) handleFiles(dt.files);
      el.classList.remove('ring-2', 'ring-purple-400');
    };

    const handleDragEnter = (e) => {
      preventDefaults(e);
      el.classList.add('ring-2', 'ring-purple-400');
    };

    const handleDragOver = (e) => {
      preventDefaults(e);
    };

    const handleDragLeave = (e) => {
      preventDefaults(e);
      if (e.currentTarget === el) {
        el.classList.remove('ring-2', 'ring-purple-400');
      }
    };

    el.addEventListener('dragenter', handleDragEnter);
    el.addEventListener('dragover', handleDragOver);
    el.addEventListener('dragleave', handleDragLeave);
    el.addEventListener('drop', handleDrop);

    return () => {
      el.removeEventListener('dragenter', handleDragEnter);
      el.removeEventListener('dragover', handleDragOver);
      el.removeEventListener('dragleave', handleDragLeave);
      el.removeEventListener('drop', handleDrop);
    };
  }, [handleFiles]);

  // Fire onComplete when all are done or error/canceled (i.e., no uploading/queued)
  useEffect(() => {
    if (!items.length) return;
    const hasActive = items.some((i) => i.status === 'queued' || i.status === 'uploading');
    if (!hasActive) {
      const successful = items.filter((i) => i.status === 'done').map((i) => ({
        id: i.id,
        fileName: i.file.name,
        type: i.type,
        previewUrl: i.url,
        serverPath: i.serverPath,
      }));
      onComplete(successful);
    }
  }, [items, onComplete]);

  return (
    <div className={className} aria-label={ariaLabel}>
      {/* Dropzone */}
      <div
        ref={dropRef}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
        className="h-40 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50/50 flex items-center justify-center text-sm text-secondary cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-describedby="upload-hint"
      >
        <div className="text-center">
          <p className="font-medium text-gray-700">Drag & drop files here</p>
          <p id="upload-hint" className="text-xs text-gray-500 mt-1">
            or click to browse {multiple ? '(multiple supported)' : '(single file)'}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Accepted: {acceptImages ? 'images' : ''}{acceptImages && acceptVideos ? ' & ' : ''}{acceptVideos ? 'videos' : ''}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        multiple={multiple}
        accept={accepted.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Upload list and previews */}
      {items.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="rounded-lg border border-purple-200 bg-white/80 p-3 shadow-sm flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{it.file.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {(it.file.size / 1024 / 1024).toFixed(2)} MB • {it.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {it.status === 'uploading' && (
                    <button
                      onClick={() => cancelUpload(it.id)}
                      className="px-2 py-1 rounded-md text-xs bg-white border border-purple-200 text-gray-700 hover:bg-purple-50"
                      aria-label={`Cancel upload ${it.file.name}`}
                    >
                      Cancel
                    </button>
                  )}
                  {(it.status === 'done' || it.status === 'error' || it.status === 'canceled') && (
                    <button
                      onClick={() => removeItem(it.id)}
                      className="px-2 py-1 rounded-md text-xs bg-white border border-purple-200 text-gray-700 hover:bg-purple-50"
                      aria-label={`Remove ${it.file.name}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="mt-3">
                {it.status === 'uploading' && (
                  <div>
                    <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-primary transition-all"
                        style={{ width: `${Math.max(2, it.progress)}%` }}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={it.progress}
                        role="progressbar"
                        aria-label={`Uploading ${it.file.name}`}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-gray-500">{it.progress}%</p>
                  </div>
                )}

                {it.status === 'done' && (
                  <div className="flex items-center gap-2 text-[11px] text-success mt-1">
                    <span role="img" aria-label="success">✅</span> Uploaded
                  </div>
                )}

                {it.status === 'error' && (
                  <div className="flex items-center gap-2 text-[11px] text-error mt-1">
                    <span role="img" aria-label="error">⚠️</span> {it.error || 'Upload failed'}
                  </div>
                )}

                {it.status === 'canceled' && (
                  <div className="flex items-center gap-2 text-[11px] text-secondary mt-1">
                    <span role="img" aria-label="canceled">🛑</span> Canceled
                  </div>
                )}
              </div>

              {/* Preview */}
              {it.status === 'done' && it.url && (
                <div className="mt-3">
                  {it.type === 'image' ? (
                    <img
                      src={it.url}
                      alt={it.file.name}
                      className="w-full h-40 object-cover rounded-md border border-purple-100"
                    />
                  ) : it.type === 'video' ? (
                    <video
                      src={it.url}
                      controls
                      className="w-full h-40 object-cover rounded-md border border-purple-100"
                    />
                  ) : (
                    <div className="h-40 flex items-center justify-center text-xs text-gray-500 bg-purple-50/50 rounded-md border border-purple-100">
                      No preview available
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
