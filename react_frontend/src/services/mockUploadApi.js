 /**
  * PUBLIC_INTERFACE
  * mockUploadFile
  * Simulates uploading a file to a backend with progress updates.
  * Accepts an AbortSignal to support cancellation.
  * Returns a Promise resolving with { path, size, name, type }.
  */
export function mockUploadFile(file, { onProgress = () => {}, signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      const err = new DOMException('Aborted', 'AbortError');
      reject(err);
      return;
    }

    let progress = 0;
    const totalTime = Math.min(4000 + Math.random() * 3000, 9000); // 4-9s
    const intervalTime = 120;
    const steps = Math.ceil(totalTime / intervalTime);
    const increment = Math.max(100 / steps, 2);

    const onAbort = () => {
      clearInterval(timer);
      const err = new DOMException('Aborted', 'AbortError');
      reject(err);
    };
    if (signal) signal.addEventListener('abort', onAbort, { once: true });

    const timer = setInterval(() => {
      if (signal?.aborted) {
        clearInterval(timer);
        return;
      }

      progress = Math.min(100, progress + increment + Math.random() * 5);
      onProgress(Math.floor(progress));

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          if (signal?.aborted) return;
          resolve({
            path: `/uploads/${Date.now()}_${file.name}`,
            size: file.size,
            name: file.name,
            type: file.type,
          });
        }, 250);
      }
    }, intervalTime);
  });
}
